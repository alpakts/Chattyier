"use client";
import { IMessage, useMessage } from "@/lib/store/messages";
import React, { useEffect } from "react";
import Message from "./message";
import { DeleteDialog, EditDialog } from "./message-action";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";

const ListMessages = () => {
  const { messages, addMessage, ids, deleteMessage, editMessage } = useMessage(
    (state) => state
  );
  const supabase = supabaseBrowser();
  const [notification, setNotification] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);
  const arrowRef=React.useRef<HTMLDivElement>(null);
  const chatBody = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            await listenInsert(payload.new as IMessage);
          } else if (payload.eventType === "DELETE") {
            deleteMessage(payload.old as IMessage);
          } else if (payload.eventType === "UPDATE") {
            editMessage(payload.new as IMessage);
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);
  useEffect(() => {
    if (chatBody.current && scrolled === false) {
      chatBody.current?.scrollTo({behavior:'instant',top:chatBody.current.scrollHeight} );
    }
  }, [messages]);
  const handleScroll=()=>{
    const chatContainer=chatBody.current;
    if (chatContainer) {
      if(chatContainer?.scrollTop+chatContainer.clientHeight<chatContainer.scrollHeight-10){
        arrowRef.current?.classList.remove('hidden');
        setScrolled(true);
      }else{
        arrowRef.current?.classList.add('hidden');
      }
    }
   
  }
  const listenInsert = async (message: IMessage) => {
    if (ids.includes(message.id) === false && message.send_by !== "system") {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", message.send_by)
        .single();
      if (error) {
        toast.error(error.message);
        return;
      }
      const newMessage = {
        ...message,
        users: data,
      };
      addMessage(newMessage as IMessage);
      scrolled===true?setNotification(notification+1):setNotification(0);
    }
  };
  const scrollDown = () => {
    chatBody.current?.scrollTo(0, chatBody.current.scrollHeight);
    setNotification(0);
  }
  return (
    <div
      ref={chatBody}
      onScroll={handleScroll}
      className="flex-1 chat-bg flex flex-col p-5 h-full overflow-x-hidden  overflow-y-auto scroll-smooth "
    >
      <div className="flex-1"></div>
      <div className="space-y-7">
        {messages.map((item, index) => (
          <Message message={item} key={index} />
        ))}
      </div>
      <div  ref={arrowRef} className=" transition-all hidden left-0 absolute w-full overflow-x-hidden bottom-20  ">
        {notification > 0 ? (
          <div onClick={scrollDown} className="bg-green-500 w-fit mx-auto text-white text-center cursor-pointer p-2 rounded-md">
            {notification} new messages
          </div>
          ):(scrolled && <div  className=" h-10 w-10  mx-auto bg-green-500 flex justify-center items-center rounded-full cursor-pointer" onClick={scrollDown}>
          <ArrowDown className="hover:animate-bounce"></ArrowDown>
        </div>)}
      
      </div>
      <DeleteDialog></DeleteDialog>
      <EditDialog></EditDialog>
    </div>
  );
};

export default ListMessages;
