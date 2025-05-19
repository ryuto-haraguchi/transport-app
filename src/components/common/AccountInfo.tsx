import { User } from "next-auth";
import Image from "next/image";

interface AccountInfoProps {
  user?: User;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={user?.image || "/default-avatar.png"}
          alt={user?.name || "ユーザー"}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user?.name || "ゲスト"}</span>
        <span className="text-xs text-muted-foreground">
          {user?.email || ""}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
