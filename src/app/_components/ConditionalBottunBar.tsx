"use client";

import { usePathname } from "next/navigation";
import BottunBar from "./BottunBar";

export default function ConditionalBottunBar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <BottunBar />;
}