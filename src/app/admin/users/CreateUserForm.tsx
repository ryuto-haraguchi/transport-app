"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreateUserFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
});

export const CreateUserForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: { name: "", email: "", phone_number: "" },
  });

  const createUser = async (data: z.infer<typeof CreateUserFormSchema>) => {
    setFormError(null);
    form.clearErrors("email");
    form.clearErrors("phone_number");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "ユーザー作成に失敗しました。";
        setFormError(errorMessage);

        if (errorMessage.includes("メールアドレス")) {
          form.setError("email", { type: "server", message: errorMessage });
        } else if (errorMessage.includes("電話番号")) {
          form.setError("phone_number", {
            type: "server",
            message: errorMessage,
          });
        }
        return;
      }

      const successData = await response.json();
      console.log("User created successfully!", successData);
      form.reset();
      alert("ユーザーが正常に作成されました。");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setFormError("予期せぬエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createUser)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError &&
          !form.getFieldState("email").error &&
          !form.getFieldState("phone_number").error && (
            <p
              className={`text-sm font-medium ${
                formError.includes("成功")
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {formError}
            </p>
          )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "作成中..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
