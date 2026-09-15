"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button 
      variant="outline" 
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="hidden sm:flex border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Log Out
    </Button>
  );
}
