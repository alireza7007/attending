import Link from 'next/link'
import React from 'react'

export default function AccessManeger() {
  return (
     <div className="flex-1 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 w-[90%] max-w-lg text-center text-white">
          <h1 className="text-3xl font-extrabold drop-shadow-lg mb-6">
            مدیریت سیستم
          </h1>

          <div className="flex flex-col gap-4">
             <Link
              href="/maneger/companyInfo"
              className="px-6 py-3 rounded-2xl font-bold bg-white/90 text-purple-700 shadow-md hover:scale-105 hover:bg-white transition-transform"
            >
              🌮 اطلاعات شرکت 
            </Link>


            <Link
              href="/maneger/users"
              className="px-6 py-3 rounded-2xl font-bold bg-white/90 text-purple-700 shadow-md hover:scale-105 hover:bg-white transition-transform"
            >
              👥 کاربران
            </Link>

            <Link
              href="/maneger/editUsers"
              className="px-6 py-3 rounded-2xl font-bold bg-white/90 text-pink-700 shadow-md hover:scale-105 hover:bg-white transition-transform"
            >
              ✏️ ویرایش کاربر
            </Link>

            <Link
              href="/maneger/insertUsers"
              className="px-6 py-3 rounded-2xl font-bold bg-white/90 text-orange-700 shadow-md hover:scale-105 hover:bg-white transition-transform"
            >
              ➕ درج دستی
            </Link>
          </div>
        </div>
      </div>
  )
}
