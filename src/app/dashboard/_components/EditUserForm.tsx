"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import User from "@/types/user";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EditUserFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

const USER_EDIT_API_URL = "/api/users";

interface EditUserFormProps {
  user: User;
  onSubmitSuccess?: () => void;
}

const EditUserForm = ({ user, onSubmitSuccess }: EditUserFormProps) => {
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof EditUserFormSchema>>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
    },
  });

  const editUser = async (data: z.infer<typeof EditUserFormSchema>) => {
    setFormError(null);
    try {
      const response = await fetch(`${USER_EDIT_API_URL}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "ユーザーの更新に失敗しました。";
        setFormError(errorMessage);
        return;
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setFormError("予期せぬエラーが発生しました。");
    }
  };

  return (
    <Form {...form}>
      {formError && (
        <p className="text-red-500 text-sm mb-4 px-4">{formError}</p>
      )}
      <form onSubmit={form.handleSubmit(editUser)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名を入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレスを入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話番号</FormLabel>
              <FormControl>
                <Input placeholder="電話番号を入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-gray-600 mt-4 text-white w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUserForm;
