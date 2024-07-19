
export const BreadCrumps = () => {
  // set up realtime bot notification or label
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-5 items-center">Title</h2>
      </div>

      <p className="text-gray-500 text-sm">
        {
          // page == 'settings'
          // ? 'Manage your account settings, preferences and integrations'
          // : page == 'dashboard'
          // ? 'A detailed overview of your metrics, usage, customers and more'
          // : page == 'appointment'
          // ? 'View and edit all your appointments'
          // : page == 'email-marketing'
          // ? 'Send bulk emails to your customers'
          // : page == 'integration'
          // ? 'Connect third-party applications into Dives-AI'
          // : 'Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.'
        }

          Manage your account settings, preferences and integrations
      </p>
    </div>
  )
}
