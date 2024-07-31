import { onGetCurrentDomainInfo } from "@/actions/settings"
import SettingsForm from "@/components/forms/settings/form";
import { InfoBar } from "@/components/infobar";
import { redirect } from "next/navigation"; 

interface DomainSettingsProps {
  params : {
    domain: string
  }
}

const DomainSettingsPage = async ({ params }: DomainSettingsProps) => {
  // get info about the current domain of the user
  const domain = await onGetCurrentDomainInfo(params.domain);

  if (!domain) redirect('/dashboard')
  return (
    <div>
      <InfoBar />

      <div className="flex-1 h-0 overflow-y-auto w-full chat-window">
        <SettingsForm
          id={domain.domains[0].id}
          name={domain.domains[0].name}
          // TODO: fix issues wid plan frm comp/settings/form
          // plan={domain.subscription?.plan} 
          chatBot={domain.domains[0].chatBot}
        /> 
      </div>
    </div>
  )
}

export default DomainSettingsPage