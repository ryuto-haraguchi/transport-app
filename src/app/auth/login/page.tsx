"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const errorMessages: { [key: string]: string } = {
  UserNotRegistered:
    "このメールアドレスは登録されていません。お手数ですがサインアップをお願いします。",
  EmailNotFound:
    "認証情報からメールアドレスを取得できませんでした。再度お試しください。",
  DatabaseError:
    "データベース処理中にエラーが発生しました。しばらくしてから再度お試しください。",
  Default: "エラーが発生しました。",
  Configuration: "サーバーの設定に問題があります。設定を確認してください。",
  AccessDenied: "アクセスが拒否されました。必要な権限がありません。",
  Verification: "メール認証トークンが無効であるか、有効期限が切れています。",
  CredentialsSignin: "メールアドレスまたはパスワードが正しくありません。",
  // 他の一般的なNextAuthエラーキーもここに追加（必要に応じて）
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const errorType = searchParams.get("error");
    if (errorType) {
      setErrorMessage(errorMessages[errorType] || errorMessages.Default);
      setIsDialogOpen(true);
      // URLからエラーステータスをクリアする（任意、ユーザー体験による）
      // const basePath = window.location.pathname;
      // router.replace(basePath, { scroll: false });
    }
  }, [searchParams]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // ダイアログを閉じたときにURLからエラーパラメータを削除
    const basePath = window.location.pathname;
    router.replace(basePath, { scroll: false });
    // setErrorMessage(null); // isDialogOpenがfalseになれば表示されないので、必ずしもnullにする必要はない
  };

  return (
    <>
      <AuthForm />

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>エラー</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
