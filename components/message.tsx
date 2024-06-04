import { IMessage, useMessage } from '@/lib/store/messages'
import Image from 'next/image'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { MoreHorizontal } from 'lucide-react';
import { useUser } from '@/lib/store/user';
const Message = ({message}:{message:IMessage}) => {
  const user = useUser((state)=>state.user);
  return (
    <div  className="flex  gap-2 ">
        <div className="h-10 w-10 bg-green-500 rounded-full relative ring-1 ring-white">
            <Image className='rounded-full' src={message.users?.avatar_url||''} alt={message.users?.name?.toString()??''} fill={true}></Image>
        </div>
        <div className="flex-1" >
          <div className="flex items-center justify-between">
           <div className='flex gap-1 items-center'>
           <h1 className="font-bold text-white">{message.users?.name}</h1>
            <h1 className="text-sm text-gray-300 gap-1 flex">{message.is_edit&&<span className='font-light text-sm '>Edited</span>}{new Date(message.created_at).toLocaleTimeString()}</h1>
           </div>
           {message.users?.id === user?.id && <MessageDropdown message={message}/>}
          </div>
          <p className="text-gray bg-green-600 w-fit p-2 rounded-md break-all">{message.text}</p>
         
        </div>
      </div>
  )
}

export default Message;

const MessageDropdown = ({message}:{message:IMessage}) => {
  const setActionMessage = useMessage((state)=>state.setActionMessage);
    return (
     
        <DropdownMenu >
        <DropdownMenuTrigger><MoreHorizontal/></DropdownMenuTrigger>
        <DropdownMenuContent  color='dark'>
          <DropdownMenuItem onClick={()=>{
            document.getElementById('trigger-edit')?.click();
            setActionMessage(message);
          }} >edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{
            document.getElementById('trigger-delete')?.click();
            setActionMessage(message);
          }}>delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      
    )
  }