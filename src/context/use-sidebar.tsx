'use client'
import { useToast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation' 
import { useEffect, useState } from 'react'
import { useChatContext } from './user-chat-context'
import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation'
import { useClerk } from '@clerk/nextjs'

/**
 * A custom React hook that provides state and functionality related to the sidebar in the application.
 */
const useSideBar = () => {

  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // get te stored state values for chat created in context 
  const { chatRoom } = useChatContext()

  // function to activate real time chat
  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == 'true' ? false : true
      )
      if (realtime) {
        setRealtime(realtime.chatRoom.live)
        toast({
          title: 'Success',
          description: realtime.message,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get current state of the chatroom, if its realtime or not,
  const onGetCurrentMode = async () => {
    setLoading(true)
    const mode = await onGetConversationMode(chatRoom!)
    if (mode) {
      setRealtime(mode.live)
      setLoading(false)
    }
  }

  // render onGetCurrentMode when chatRoom changes to load realtime mode state
  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode()
    }
  }, [chatRoom])

  // get the pathname, split the string into an array and remove te last item of the array 
  const page = pathname.split('/').pop()
  const { signOut } = useClerk()

  // function to sign out user and redirect to home page
  const onSignOut = () => signOut(() => router.push('/'))

  // function to toggle sidebar expand state
  const onExpand = () => setExpand((prev) => !prev)

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading,
  }
}

export default useSideBar
