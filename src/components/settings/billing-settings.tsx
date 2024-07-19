import { getSubscriptionPlan } from '@/actions/settings' 
import { SectionLabel } from '../section-label'

export const BillingSettings = async () => {
  // first fetch user subscription type render data based on plan wit getSubscriptionPlan() from actions
  const plan = await getSubscriptionPlan()

  return (
    <div className='gri grid-cols-1 la;grid-cols-5 gap-10'>
      <div className="lg:col-span-1">
        <SectionLabel
          label='label'
          message='message'
        />
      </div>
    </div>
  )
}
