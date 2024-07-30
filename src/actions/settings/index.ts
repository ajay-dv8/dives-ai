'use server'
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs"

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return // return if it not current user

  try {
    const subscription = await client.user.findUnique({
      // compare user id and select domains and subscription plan  
      // to control or restrict user plan
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true
          },
        },
      },
    })

    // check if domain exist
    const domainExist = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    })

    if (!domainExist) {
      if (
        // TODO: Change standard to free
        // check if user is creating domain under active plan
        // and sets the number of domains allowed for that plan 
        (subscription?.subscription?.plan == 'STANDARD' &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == 'PRO' &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == 'ULTIMATE' &&
          subscription._count.domains < 10)
      ) {
        // create a new domain 
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            // create domain
            domains: {
              create: {
                name: domain,
                icon,
                // create a new chat bot
                chatBot: {
                  create: {
                    welcomeMessage:"Hey there, have a question? let's chat here",
                  },
                },
              },
            },
          },
        })

        // if new domain has been created
        if (newDomain) {
          return { status: 200, message: 'Domain successfully added' }
        }
      }
      // if user is creating more domain than number allowed by active plan active plan
      return {
        status: 400,
        message:
          "You've reached the maximum number of domains, upgrade your plan",
      }
    }
    // if domain already exist
    return {
      status: 400,
      message: 'Domain already exists',
    }
  } catch (error) {
    
  }
}

export const onGetSubscriptionPlan = async () => {
  try{
    const user = await currentUser();
    if (!user) return // return if it not current user

    // if it current user find user in te db with te same id from clerk
    // fetch user subscription plan from db
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          }
        }
      }
    })

    // if user as a plan return the plan information 
    //else return null or throw error if not found
    if (plan) {
      return plan.subscription?.plan
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch subscription plan')
    
  }
}

// fetch all account domains from db
export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
    if (!user) return // return if it not current user

  try {
    const domains = await client.user.findUnique({
      // compare clerk id wit id in db
      where: {
        clerkId: user.id,
      },
      // get users domains and domain information
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    // return the domains and domain info
    return { ...domains }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await currentUser()

    if (!user) return null
    const update = await clerkClient.users.updateUser(user.id, { password })
    if (update) {
      return { status: 200, message: 'Password updated' }
    }
  } catch (error) {
    console.log(error)
  }
}