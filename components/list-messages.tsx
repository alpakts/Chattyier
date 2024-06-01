'use client'
import { useMessage } from '@/lib/store/messages'
import React from 'react'
import Message from './message';


const ListMessages = () => {
    const messages = useMessage((state)=>state.messages);
  return (
    <div className="flex-1 chat-bg  flex flex-col p-5 h-full  overflow-y-auto">
    <div className="flex-1"></div>
    <div className="space-y-7"  >
      {messages.map((item,index)=>(
        <Message  message={item} key={index}/>
      ))}
     

    </div>
  </div>
  )
}

export default ListMessages