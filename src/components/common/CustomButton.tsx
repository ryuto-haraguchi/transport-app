import Link from "next/link";
import { Button } from "@/components/ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button> & {
  href: string;
  children: React.ReactNode;
};

export const CustomButton = ({
  href,
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <Button {...props} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
