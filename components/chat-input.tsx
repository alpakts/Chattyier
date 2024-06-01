'use client'
import { Input } from "@/components/ui/input";
import { IMessage, useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const ChatInput = ({user}:{user:any}) => {
  const inputRef = useRef<HTMLInputElement>(null);
    const addMessage = useMessage((state)=>state.addMessage);
    const supaBase = supabaseBrowser();
    const handleSendMessage = async (text:string) => { 
      const newMessage = {text,send_by:user?.id,created_at:new Date().toISOString(),is_edit:false,users:{
        id:user?.id,
        name:user?.user_metadata.name,
        email:user?.user_metadata.email,
        avatar_url:user?.user_metadata.avatar_url,
        created_at:user?.created_at
      }};
      addMessage(newMessage as IMessage);
      const {error} =await supaBase.from('messages').insert({text,send_by:user?.id});
      if(error){
        toast.error(error.message);
      }
    }
  return (
    <div className="p-5 relative">
    <Input ref={inputRef} className="text-black" placeholder="type your message" onKeyDown={(e)=>{
    if (e.key === 'Enter') {
      if (e.currentTarget.value === '') {
        toast.error('Please type a message');
        return;
      }
        handleSendMessage(e.currentTarget.value);
        e.currentTarget.value = '';
    }
    }} /><ChevronRight onClick={()=>{
      
        if (inputRef.current?.value === '') {
          toast.error('Please type a message');
          return;
        }
          handleSendMessage(inputRef.current?.value as string);
          inputRef.current!.value = '';
    
      }} className="text-black cursor-pointer font-bold text-lg h-4 w-4 absolute right-10 top-[40%]" />
  </div>
  )
}

export default ChatInput

