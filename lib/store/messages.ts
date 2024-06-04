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
    actionMessage?: IMessage; 
    ids:string[];
    //eslint-disable-next-line
    addMessage: (message:IMessage) => void;
    //eslint-disable-next-line
    setActionMessage: (message:IMessage) => void;
    //eslint-disable-next-line
    deleteMessage: (message:IMessage) => void;
    //eslint-disable-next-line
    editMessage: (message:IMessage) => void;
    //eslint-disable-next-line
    setIds:(ids:string)=>void;
}
export const useMessage = create<MessageState>((set) => ({
    messages: [],
    actionMessage: undefined,
    ids:[],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setActionMessage: (message) => set(() => ({ actionMessage: message })),
    deleteMessage: (message) => set((state) => ({ messages: state.messages.filter((item) => item.id !== message.id) })),
    editMessage: (message) => set((state) => ({ ...state, messages: state.messages.map((item) => (item.id === message.id ? {...item,text:message.text} : item)) })),
    setIds: (id:string) => set((state) => ({ ids: [...state.ids,id] })),
}));
