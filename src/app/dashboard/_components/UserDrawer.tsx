"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import UserDrawerProps from "@/types/userDrawer";
import React, { useState } from "react";
import EditUserForm from "./EditUserForm";

export default function UserDrawer({
  trigger,
  title,
  description,
  user,
  onUserUpdated,
}: UserDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    if (onUserUpdated) {
      onUserUpdated();
    }
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="bg-gray-600 text-white w-full h-full cursor-pointer">
          {trigger || "Open Drawer"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:w-1/2 mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">{title}</DrawerTitle>
          <DrawerDescription className="">{description}</DrawerDescription>
        </DrawerHeader>
        {user && (
          <EditUserForm user={user} onSubmitSuccess={handleFormSubmitSuccess} />
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="bg-gray-600 text-white w-full" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
