import ChatHeader from "@/components/chat-header";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const page = async () => {
  const supaBase = createClient();
  const {data} = await supaBase.auth.getSession();
  console.log(data.session?.user);
  return (
    <div className="max-w-4xl mx-auto md:py-10  h-screen">
      <div className="h-full border rounded-md ">
       <ChatHeader user={data.session?.user}></ChatHeader>
      </div>
    </div>
  );
};

export default  page;
