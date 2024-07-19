import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs"

export const getSubscriptionPlan = async () => {
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