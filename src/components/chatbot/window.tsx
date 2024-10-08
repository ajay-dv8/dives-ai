import { ChatBotMessageProps } from '@/schemas/conversation.schema'
import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form' 
import RealTimeMode from './real-time' 
import { BOT_TABS_MENU } from '@/constants/menu' 
import { TabsContent } from '../ui/tabs'
import { Separator } from '../ui/separator'
import Bubble from './bubble'
import { Responding } from './responding'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Paperclip, Send, SendHorizonal } from 'lucide-react'
import { Label } from '../ui/label'
import { CardDescription, CardTitle } from '../ui/card' 
import UploadButton from '../upload-button'
import { TabsMenu } from '../tabs'
import { Accordion } from '../accordion'
import Link from 'next/link'
import { BotIcon } from '@/icons/bot-icon'
import Image from 'next/image' 

type Props = {
  errors: any
  register: UseFormRegister<ChatBotMessageProps>
  chats: { role: 'assistant' | 'user'; content: string; link?: string }[]
  onChat(): void
  onResponding: boolean
  domainName: string
  theme?: string | null
  textColor?: string | null
  help?: boolean
  realtimeMode:
    | {
        chatroom: string
        mode: boolean
      }
    | undefined

    chatBot?: {
      id: string
      icon: string | null
      welcomeMessage: string | null
    } | null

  helpdesk: {
    id: string
    question: string
    answer: string
    domainId: string | null
  }[]
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
}

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode, 
      setChat,
      textColor,
      chatBot,
      theme,
      help,
    },
    ref
  ) => {
    console.log(errors)
    return (
      <div className="h-[39.3rem] w-[24rem] flex flex-col bg-gray-300 rounded-xl mr-[1rem] border-green/70 border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          
          <div className="flex gap-2">
            
            {chatBot?.icon ? (
              <div className="rounded-full overflow-hidden">
                <Image
                  src={`https://ucarecdn.com/${chatBot.icon}/`}
                  alt="bot"
                  width={80}
                  height={80}
                />
              </div>
            ) : (
              <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-green/70">
                <BotIcon />
              </div>
            )}

            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                Sales Rep - {domainName.split('.com')[0]}
              </h3>
              <p className="text-sm ">Dives AI</p>

              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>

        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className="bg-transparent border-[1px] border-green/70 m-2 p-0"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                style={{
                  background: theme || '',
                  color: textColor || '',
                }}
                className="px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble
                    key={key}
                    message={chat}
                  />
                ))}
                {onResponding && <Responding />}
              </div>

              <form
                onSubmit={onChat}
                className="flex px-3 py-1 flex-col flex-1"
              >
                <div className="flex items-center gap-x-3 justify-between">
                <Label htmlFor="bot-image" className='rounded-full p-2 hover:bg-green/20'>
                  <Paperclip className='text-muted-foreground hover:scale-105 transition-all duration-300 ease-in-out'/>
                  <Input
                    {...register('image')}
                    type="file"
                    id="bot-image"
                    className="hidden"
                  />
                </Label>

                  <Input
                    {...register('content')}
                    placeholder="Type your message..."
                    autoComplete='off'
                    className="text-gray-700 focus-visible:ring-0 flex-1 px-3 focus-visible:ring-offset-0 bg-green/20 rounded-2xl outline-none border-none"
                  />

                  <Button 
                    type="submit"
                    className="p-2 rounded-full bg-green/40 flex hover:bg-green/80 transition-all duration-300"
                  >
                    <SendHorizonal className=""/>
                  </Button>
                </div>

                
              </form>
            </div>
          </TabsContent>

          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal"/>

              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <Link href='' className="flex justify-center ">
          <p className="text-gray-400 text-xs">Powered By Dives AI</p>
        </Link>
      </div>
    )
  }
)

BotWindow.displayName = 'BotWindow'
