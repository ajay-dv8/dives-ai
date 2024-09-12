import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe'

// dummy data to setup stripe for test
// init stripe
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-06-20',
  // TODO: set apiVersion to 2024-04-10 if current version does not work 
});

export async function GET() {
  try {
    // check for user
    const user = await currentUser()
    if (!user) return new NextResponse('User not authenticated');

    // NOTE: create a fake account to bypass stripe onboarding for test
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'custom',
      business_type: 'company',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      external_account: 'btok_us',
      tos_acceptance: {
        date: 1547923073,
        ip: '172.18.80.19',
      },
    });

    // if account exist or account is successfully created insert the text data below
    if (account) {
      const approve = await stripe.accounts.update(account.id, {
        business_profile: {
          mcc: '5045',
          url: 'https://bestcookieco.com',
        },
        company: {
          address: {
            city: 'Fairfax',
            line1: '123 State St',
            postal_code: '22031',
            state: 'VA',
          },
          tax_id: '000000000',
          name: 'The Best Cookie Co',
          phone: '8888675309',
        },
      });

      // if approval was successful create an account for the fake user 
      if (approve) {
        const person = await stripe.accounts.createPerson(account.id, {
          first_name: 'Ajay',
          last_name: 'Dives',
          relationship: {
            representative: true,
            title: 'CEO',
          },
        });

        // if the persons account was successfully created
        if (person) {
          const approvePerson = await stripe.accounts.updatePerson(
            account.id,
            person.id,
            {
              address: {
                city: 'victoria ',
                line1: '123 State St',
                postal_code: 'V8P 1A1',
                state: 'BC',
              },
              dob: {
                day: 10,
                month: 11,
                year: 1999,
              },
              ssn_last_4: '0000',
              phone: '8888675309',
              email: 'ajay@dives.com',
              relationship: {
                executive: true,
              },
            }
          )
          // if the person was approved fill in details for the owner
          if (approvePerson) {
            const owner = await stripe.accounts.createPerson(account.id, {
              first_name: 'Ajay',
              last_name: 'Dives',
              email: 'ajay@dives.com',
              address: {
                city: 'victoria ',
                line1: '123 State St',
                postal_code: 'V8P 1A1',
                state: 'BC',
              },
              dob: {
                day: 10,
                month: 11,
                year: 1999,
              },
              phone: '8888675309',
              relationship: {
                owner: true,
                percent_ownership: 80,
              },
            });
            // if owner was successfully created fill in details for the representative
            if (owner) {
              const complete = await stripe.accounts.update(account.id, {
                company: {
                  owners_provided: true,
                },
              });
              // if the final account process was successfully completed create user in db
              // account id comes from when we first created the account (const approve)
              if (complete) {
                const saveAccountId = await client.user.update({
                  where: {
                    clerkId: user.id,
                  },
                  data: {
                    stripeId: account.id,
                  },
                });

                // if the account id was saved successfully
                // use link to take user to integrations page
                // TODO: change localhost to site address
                if (saveAccountId) {
                  const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                      'http://localhost:3000/callback/stripe/refresh',
                    return_url: 'http://localhost:3000/callback/stripe/success',
                    type: 'account_onboarding',
                    collection_options: {
                      fields: 'currently_due',
                    },
                  })

                  return NextResponse.json({
                    url: accountLink.url,
                  })
                }
              }  
            }  
          }  
        }  
      }  
    }
    
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account:',
      error
    )
  }
}