'use client';
import Image from "next/image";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useCompanyStore } from "@/app/_store/companyStore";

export default function Tobbar() {
  const companyName = useCompanyStore((state) => state.companyName);
  const logoUri = useCompanyStore((state) => state.logoUri);

  return (
    <div className="flex flex-row-reverse justify-between items-center p-4 bg-white shadow-md rounded-xl">
      {/* دکمه منو سمت راست */}
      <button className="p-2 rounded-full hover:bg-gray-100 transition">
        <HiOutlineDotsVertical className="text-gray-500 w-5 h-5" />
      </button>

      {/* لوگو و نام شرکت */}
      <div className="flex items-center gap-3 flex-row">
        <Image
          src={logoUri || "/images/images/default/avatar.webp"}
          width={140}
          height={140}
          alt="Company logo"
          className="w-10 h-10 rounded-full object-contain shadow-sm"
        />
        <span className="text-gray-800 font-semibold text-base">
          {companyName || "نام شرکت"}
        </span>
      </div>
    </div>
  );
}
