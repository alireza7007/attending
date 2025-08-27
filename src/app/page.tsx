"use client";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400">
      <div className="flex flex-col items-center text-center">
        {/* لوگو یا آیکون */}
        <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-xl mb-6">
          <span className="text-4xl font-black bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            اقلیم
          </span>
        </div>

        {/* متن خوشامد */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
          خوش آمدید 👋
        </h1>
        <p className="text-white/90 mt-2 text-sm md:text-base">
          به برنامه حضور و غیاب اقلیم
        </p>

        {/* دکمه شروع */}
       
      </div>
    </div>
  );
}
