"use client";

import dynamic from "next/dynamic";
import AcceptInOutTimeButton from "../_components/attendScreenCm/AcceptInOutTimeButton";


const UserLocation = dynamic(() => import("../_components/UserLoc"), {
  ssr: false,
});

export default function AttendPage() {
  return (
    <div className="w-full h-[600px]">
      <UserLocation />
      <AcceptInOutTimeButton />
    </div>
  );
}
