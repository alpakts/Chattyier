import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
const DeleteDialog = () => {
  const message = useMessage((state) => state.actionMessage);
  const deleteMessageFromStore = useMessage((state) => state.deleteMessage);
  const deleteMessage = async () => {
    const supabase = supabaseBrowser();
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", message!.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted");
      deleteMessageFromStore(message!);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const EditDialog = () => {
  const message = useMessage((state) => state.actionMessage);
  const editMessageFromStore = useMessage((state) => state.editMessage);
  const inputRef = useRef<HTMLInputElement>(null);
  const editMessage = async () => {
    const supabase = supabaseBrowser();
    const text = inputRef.current?.value.trim();
    if (text != "") {
      const {error } = await supabase
        .from("messages")
        .update({ text: inputRef.current?.value.trim(), is_edit: true })
        .eq("id", message!.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Message edited");
        editMessageFromStore({ ...message!, text: text??'', is_edit: true });
      }
      document.getElementById("trigger-edit")?.click();
    }else{
      document.getElementById("trigger-edit")?.click();
      document.getElementById("trigger-delete")?.click();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit message</DialogTitle>
        </DialogHeader>
        <div className=" py-4">
          <div className=" w-full items-center gap-4">
            <Input
              ref={inputRef}
              defaultValue={message?.text}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={editMessage} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteDialog, EditDialog };
