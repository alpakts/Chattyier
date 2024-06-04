"use client";
import { Input } from "@/components/ui/input";
import { IMessage, useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
const ChatInput = ({ user }: { user: any }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {addMessage,setIds} = useMessage((state) => state);
  const supaBase = supabaseBrowser();
  const handleSendMessage = async (text: string) => {
    if (user === null||user === undefined) {
      return;
    }
    const newMessage = {
      text,
      id: uuidv4(),
      send_by: user?.id,
      created_at: new Date().toISOString(),
      is_edit: false,
      users: {
        id: user?.id,
        name: user?.user_metadata.name,
        email: user?.user_metadata.email,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: user?.created_at,
      },
    };
    addMessage(newMessage as IMessage);
    setIds(newMessage.id);
    const { error } = await supaBase
      .from("messages")
      .insert({ text, send_by: user?.id, id: newMessage.id });
    if (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-5 relative">
      <Input
        disabled={user === null||user === undefined}
        ref={inputRef}
        className="text-white"
        color="dark"
        placeholder={user === null||user === undefined ? "Please login to send message" : "Type a message"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.currentTarget.value === "") {
              toast.error("Please type a message");
              return;
            }
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <ChevronRight
        onClick={() => {
          if (inputRef.current?.value === "") {
            toast.error("Please type a message");
            return;
          }
          handleSendMessage(inputRef.current?.value as string);
          inputRef.current!.value = "";
        }}
        className="text-black cursor-pointer font-bold text-lg h-4 w-4 absolute right-10 top-[40%]"
      />
    </div>
  );
};

export default ChatInput;
