import React from 'react'
import { ImUserTie } from "react-icons/im"; 
import { TbReport } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import Link from 'next/link';

export default function BottunBar() {
  return (
    <div className="w-full fixed bottom-0 left-0 z-50 flex items-center">
      <div className="
        flex flex-row justify-between w-full px-6 py-3
        bg-white rounded-t-2xl shadow-[0_-4px_15px_rgba(0,0,0,0.15)]
        backdrop-blur-md
      ">
        
        {/* ثبت حضور */}
        

        {/* مدیریت */}
        <div className="flex justify-center flex-col items-center gap-1 cursor-pointer">
          <Link href="/maneger">
            <FaUserTie size={28} className='text-blue-500 hover:text-blue-700 transition-all duration-300' />
          </Link>
          <span className='text-gray-800 font-semibold text-sm'>مدیریت</span>
        </div>

        {/* موقعیت */}
        <div className="flex justify-center flex-col items-center gap-1 cursor-pointer">
          <Link href="/location">
            <FaMapLocationDot size={28} className='text-blue-500 hover:text-blue-700 transition-all duration-300' />
          </Link>
          <span className='text-gray-800 font-semibold text-sm'>موقعیت</span>
        </div>

        {/* اطلاعات */}
        <div className="flex justify-center flex-col items-center gap-1 cursor-pointer">
          <Link href="/information">
            <FaBusinessTime size={28} className='text-blue-500 hover:text-blue-700 transition-all duration-300' />
          </Link>
          <span className='text-gray-800 font-semibold text-sm'>اطلاعات</span>
        </div>

      {/* گزارش */}
        <div className="flex justify-center flex-col items-center gap-1 cursor-pointer">
          <Link href="/report">
            <TbReport size={28} className='text-orange-500 hover:text-amber-600 transition-all duration-300' />
          </Link>
          <span className='text-gray-800 font-semibold text-sm'>گزارش</span>
        </div>
    {/* ثبت حضور */}
        <div className="flex justify-center flex-col items-center gap-1 cursor-pointer">
          <Link href="/attend">
            <ImUserTie size={28} className='text-orange-500 hover:text-amber-600 transition-all duration-300' />
          </Link>
          <span className='text-gray-800 font-semibold text-sm'>ثبت حضور</span>
        </div>

        

      </div>
    </div>
  )
}
