import { InfoBar } from '@/components/infobar'
import { BillingSettings } from '@/components/settings/billing-settings'
import React from 'react'

const page = () => {
  return (
    <div>
      <InfoBar />

      <div className="w-full overflow-y-auto chat-window h-0 flex flex-1 flex-col gap-10">
        <BillingSettings />
      </div>
    </div>
  )
}

export default page