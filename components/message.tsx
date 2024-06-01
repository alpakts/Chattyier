import { IMessage } from '@/lib/store/messages'
import Image from 'next/image'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { MoreHorizontal } from 'lucide-react';
const Message = ({message}:{message:IMessage}) => {
  return (
    <div  className="flex  gap-2 ">
        <div className="h-10 w-10 bg-green-500 rounded-full relative ring-1 ring-white">
            <Image className='rounded-full' src={message.users?.avatar_url||''} alt={message.users?.name?.toString()??''} fill={true}></Image>
        </div>
        <div className="flex-1" >
          <div className="flex items-center gap-1">
            <h1 className="font-bold text-white">{message.users?.name}</h1>
            <h1 className="text-sm text-gray-300">{new Date(message.created_at).toLocaleTimeString()}</h1>
            <MessageDropdown/>
          </div>
          <p className="text-gray bg-green-600 w-fit p-2 rounded-md break-all">{message.text}</p>
        </div>
      </div>
  )
}

export default Message;

const MessageDropdown = () => {
    return (
     
        <DropdownMenu >
        <DropdownMenuTrigger><MoreHorizontal/></DropdownMenuTrigger>
        <DropdownMenuContent className='bg-slate-800'>
          <DropdownMenuItem>edit</DropdownMenuItem>
          <DropdownMenuItem>delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      
    )
  }