import { onGetAllAccountDomains } from "@/actions/settings"


const ConversationPage = async () => {

  const domain = onGetAllAccountDomains
  return (
    <div className="w-full h-full flex">Conversation</div>
  )
}

export default ConversationPage