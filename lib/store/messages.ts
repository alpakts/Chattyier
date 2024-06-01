import { create } from "zustand";

export type IMessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string | null;
        created_at: string | null;
        email: string | null;
        id: string;
        name: string | null;
    } | null;
}
interface MessageState{
    messages: IMessage [];
    // eslint-disable-next-line
    addMessage: (message:IMessage) => void;
}
export const useMessage = create<MessageState>((set) => ({
    messages: [],
    addMessage: (message)=> set((state) => ({messages:[...state.messages,message]}))
   
    }));