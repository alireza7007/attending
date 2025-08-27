'use client'

import dynamic from "next/dynamic";
import React from "react";

// کامپوننت رو داینامیک ایمپورت می‌کنیم و SSR خاموش میشه
const PolygonDrawMap = dynamic(() => import('../../_components/Polygon'), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <PolygonDrawMap />
    </div>
  );
}
