"use client";

import { useState, useEffect, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // تا زمانی که فقط روی سرور باشه هیچی رندر نمی‌کنه
  }

  return <>{children}</>;
}
