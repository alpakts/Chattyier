'use client';
import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";

const ChatHeader = ({user}:{user:User|undefined}) => {
  const handleGoogleLogin = () => {
    supabaseBrowser().auth.signInWithOAuth({ provider: "google",options:{redirectTo:window.location.origin+ "/auth/callback"} });
  };
  return (
    <div className="h20">
      <div className="p-5 border-b flex justify-between">
        <div>
          <h1 className="text-xl font-bold ">Chat</h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="texsm text-gray-400">2 online</h1>
          </div>
        </div>
        <Button onClick={handleGoogleLogin}>{user?'Logout':'Login'}</Button>
      </div>
    </div>
  );
};

export default ChatHeader;
