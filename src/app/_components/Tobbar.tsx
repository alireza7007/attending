'use client';
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useCompanyStore } from "@/app/_store/companyStore";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const companyName = useCompanyStore((state) => state.companyName);
  const logoUri = useCompanyStore((state) => state.logoUri);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOption = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };
  const handleMain = () => {
    router.push("/main");
  }

  return (
    <div className="flex flex-row-reverse justify-between items-center p-4 bg-white shadow-md rounded-xl">
      {/* دکمه منو سمت راست */}
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={handleOption}
        >
          <HiOutlineDotsVertical className="text-gray-500 w-5 h-5" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 right-[-50]  bg-white shadow-lg rounded-lg w-32 py-2 z-10">
            <h3
              className="w-full text-right py-2 px-4 text-gray-700 hover:bg-gray-100 transition"
              onClick={handleMain}
            >
              صفحه اصلی 
            </h3>
             <h3
              className="w-full text-right py-2 px-4 text-gray-700 hover:bg-gray-100 transition"
              onClick={handleLogout}
            >
خروج      
        </h3>
          </div>
        )}
      </div>

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