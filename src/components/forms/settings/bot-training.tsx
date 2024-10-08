
import { HELP_DESK_TABS_MENU } from '@/constants/menu' 
import HelpDesk from './help-desk'
import FilterQuestions from './filter-questions'
import { TabsMenu } from '@/components/tabs'
import { TabsContent } from '@/components/ui/tabs'

type BotTrainingFormProps = {
  id: string
}

const BotTrainingForm = ({ id }: BotTrainingFormProps) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Bot Training</h2>
        <p className="text-sm font-light"> 
          Set FAQ questions and create questions for capturing relevant information and
          train your bot to act the way you want it to.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent
          value="help desk"
          className="w-full"
        >
          {/* TODO: fix issues wid id --FIXED */}
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="questions">
          {/* TODO: fix issues wid id --FIXED */}
          {/* ask users specific questions */}
          <FilterQuestions id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default BotTrainingForm
