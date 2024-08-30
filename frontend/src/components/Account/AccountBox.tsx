import { ReactNode } from "react";

function AccountBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-[90%] lg:w-[60%] mt-4 mb-4 mx-auto flex flex-col items-center">
      {children}
    </div>
  );
}

export default AccountBox;
