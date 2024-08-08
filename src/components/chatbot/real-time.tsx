
import { Card } from '../ui/card'
// TODO: uncomment after realtime fix
// import { useRealTime } from '@/hooks/chatbot/use-chatbot'


type Props = {
  chatRoomId: string
  setChats: React.Dispatch<
  React.SetStateAction<
  {
    role: 'user' | 'assistant'
    content: string
    link?: string | undefined
  }[]
  >
  >
}

const RealTimeMode = ({ chatRoomId, setChats }: Props) => {
  // TODO: uncomment after realtime fix
//  useRealTime(chatRoomId, setChats)

  return (
    <Card className="px-3 rounded-full py-1 bg-orange font-bold text-white text-sm">
      Real Time
    </Card>
  )
}

export default RealTimeMode
