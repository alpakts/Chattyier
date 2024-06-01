import React, { Suspense } from 'react'
import ListMessages from './list-messages'
import { supabaseBrowser } from '@/lib/supabase/browser'
import InitMessages from '@/lib/store/init-messages';

const ChatMessages =  async () => {
  const supabase = supabaseBrowser();
  const {data} = await supabase.from('messages').select('*,users(*)');
  return (
    <Suspense fallback={"Loading..."}>
      <InitMessages messages={data || []}></InitMessages>
      <ListMessages/>
    </Suspense>
  )
}

export default ChatMessages