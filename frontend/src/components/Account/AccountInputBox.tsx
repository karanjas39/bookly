import { ReactNode } from "react";

function AccountInputBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 w-[80%] lg:w-[50%] mx-auto flex flex-col gap-4">
      {children}
    </div>
  );
}

export default AccountInputBox;
