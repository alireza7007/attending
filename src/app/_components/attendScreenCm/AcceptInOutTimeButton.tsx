import React from 'react';

export default function AcceptInOutTimeButton() {
  return (
    <div className="flex justify-center gap-4 p-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-lg shadow-md">
      <button className="px-6 py-2 bg-gradient-to-r from-[#405DE6] via-[#833AB4] to-[#FD1D1D] text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-200">
        ثبت ورود
      </button>
      <button className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-full border-2 border-transparent bg-clip-padding bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] hover:from-[#FD1D1D] hover:to-[#833AB4] transition-all duration-200">
        ثبت خروج
      </button>
    </div>
  );
}