"use client";

import { useIsOpenStore } from "@/hooks/use-isopen-store";
import Link from "next/link";

const Logo = () => {
  const { isOpen, setIsOpen } = useIsOpenStore();
  return (
    <div>
      <Link
        className="text-md bg-slate-900 rounded-md p-1 font-semibold flex items-center justify-center w-fit"
        href="/"
        onClick={() => {
          if (isOpen) setIsOpen();
        }}
      >
        <span className="text-white mx-2">Laclass</span>
        <span className="bg-white rounded w-14 h-8 items-center flex justify-center text-gray-950">
          .Learn
        </span>
      </Link>
    </div>
  );
};

export default Logo;
