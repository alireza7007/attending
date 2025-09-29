"use client";

export default function TimeDisplay() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2 mt-3">
      <div className="flex-1 text-center bg-green-500 text-white px-2 py-1 rounded-xl shadow-md font-bold text-sm">
        ورود : 12:00
      </div>
      <div className="flex-1 text-center bg-red-500 text-white px-2 py-1 rounded-xl shadow-md font-bold text-sm">
        خروج : 18:30
      </div>
    </div>
  );
}