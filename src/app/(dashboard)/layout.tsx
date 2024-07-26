import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

// this layout component acts like a provider 
// it will data about the chat loading state and other states such as if the chat is on real time or standard


const AdminLayout = async ({ children }: LayoutProps) => {
  const authenticated = await onLoginUser() //get authenticated user
  if (!authenticated) return; //return null if user is not authenticated


  return (
    <ChatProvider>  
      <div className="flex w-full h-screen">
        <SideBar domains={authenticated.domain}/>
      </div>
    </ChatProvider>
  )
}

export default AdminLayout