import { ReactNode } from "react";
import User from "./user";

export default interface UserDrawerProps {
  trigger: ReactNode;
  title: string;
  description: string;
  user?: User;
  onUserUpdated?: () => void;
}
