import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import InitUser from "@/lib/store/init-user";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const page = async () => {
  const supaBase = createClient();
  const { data } = await supaBase.auth.getSession();
  return (
    <>
      <InitUser user={data.session?.user}></InitUser>
      <div className="max-w-4xl mx-auto md:py-10  h-screen">
        <div className="h-full border rounded-md flex flex-col relative  ">
          <ChatHeader user={data.session?.user}></ChatHeader>
          <ChatMessages/>
          <ChatInput user={data.session?.user}></ChatInput>
         
        </div>
      </div>
    </>
  );
};

export default page;
