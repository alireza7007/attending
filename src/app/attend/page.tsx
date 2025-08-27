"use client";

import dynamic from "next/dynamic";
import UserLoc from "../_components/UserLoc";

const PolygonPreviewMap = dynamic(() => import("../_components/UserLoc"), {
  ssr: false,
});

export default function AttendPage() {
  return (
    <div className="w-full h-[600px]">
      <PolygonPreviewMap />
    </div>
  );
}
