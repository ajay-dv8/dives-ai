'use client'
import { onGetChatMessages, onGetDomainChatRooms, onViewUnReadMessages } from "@/actions/conversation"
import { getMonthName } from "@/constants/timeslots"
import { useChatContext } from "@/context/user-chat-context"
import { ConversationSearchSchema } from "@/schemas/conversation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export const useConversation = () => {
  const { register, watch } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode:'onChange',
  })

  const { setLoading: loadMessages, setChats, setChatRoom } = useChatContext()

  const [chatRooms, setChatRooms] = useState<{
    chatRoom: {
      id: string
      createdAt: Date
      message: {
        message: string
        seen: boolean
        createdAt: Date
      }[]
    }[]
    email: string | null
  }[] 
  >([])

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const search = watch(async (value) => {
      setLoading(true)

      try {
        const rooms = await onGetDomainChatRooms(value.domain)
        if (rooms) {
          setChatRooms(rooms.customer)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
      // unsubscribe from watch 
      return () => search.unsubscribe()
    }, [watch])
  })

  const onGetActiveChatMessages = async (id: string) => {

    try {
      loadMessages(true)
      
      const messages = await onGetChatMessages(id)
      if (messages) {
        setChatRoom(id)
        loadMessages(false)
        setChats(messages[0].message)
      }
    
    } catch (error) {
      console.log(error)
    }
  } 
  return{
    register,
    chatRooms,
    onGetActiveChatMessages,
    loading,
  }
}


export const useChatTime = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext()
  const [messageSentAt, setMessageSentAt] = useState<string>()
  // urgent is for messages the chatbot cant handle
  // and pass to business owner to reply
  const [urgent, setUrgent] = useState<boolean>(false)

  const onSetMessageRecievedDate = () => {
    const dt = new Date(createdAt)
    const current = new Date()
    const currentDate = current.getDate()
    const hr = dt.getHours()
    const min = dt.getMinutes()
    const date = dt.getDate()
    const month = dt.getMonth()
    const difference = currentDate - date

    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? 'PM' : 'AM'}`)
      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true)
      }
    } else {
      setMessageSentAt(`${date} ${ getMonthName(month) }`)
    }
  }

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      await onViewUnReadMessages(roomId)
      setUrgent(false)
    }
  }

  useEffect(() => {
    onSeenChat()
  }, [chatRoom])

  useEffect(() => {
    onSetMessageRecievedDate()
  }, [])

  return { messageSentAt, urgent, onSeenChat }
}


// export const useChatWindow = () => {
//   const { chats, loading, setChats, chatRoom } = useChatContext()
//   const messageWindowRef = useRef<HTMLDivElement | null>(null)
//   const { register, handleSubmit, reset } = useForm({
//     resolver: zodResolver(ChatBotMessageSchema),
//     mode: 'onChange',
//   })
//   const onScrollToBottom = () => {
//     messageWindowRef.current?.scroll({
//       top: messageWindowRef.current.scrollHeight,
//       left: 0,
//       behavior: 'smooth',
//     })
//   }

//   useEffect(() => {
//     onScrollToBottom()
//   }, [chats, messageWindowRef])

//   useEffect(() => {
//     if (chatRoom) {
//       pusherClient.subscribe(chatRoom)
//       pusherClient.bind('realtime-mode', (data: any) => {
//         setChats((prev) => [...prev, data.chat])
//       })

//       return () => {
//         pusherClient.unbind('realtime-mode')
//         pusherClient.unsubscribe(chatRoom)
//       }
//     }
//   }, [chatRoom])

//   const onHandleSentMessage = handleSubmit(async (values) => {
//     try {
//       reset()
//       const message = await onOwnerSendMessage(
//         chatRoom!,
//         values.content,
//         'assistant'
//       )
//       //WIP: Remove this line
//       if (message) {
//         //remove this
//         // setChats((prev) => [...prev, message.message[0]])

//         await onRealTimeChat(
//           chatRoom!,
//           message.message[0].message,
//           message.message[0].id,
//           'assistant'
//         )
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   })

//   return {
//     messageWindowRef,
//     register,
//     onHandleSentMessage,
//     chats,
//     loading,
//     chatRoom,
//   }
// }
