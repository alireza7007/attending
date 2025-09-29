"use client";

import React from "react";
import { useCompanyStore } from "@/app/_store/companyStore";
import Tobbar from "@/app/_components/Tobbar";

export default function CompanyInfoPage() {
  const {  polygonCoords, reports, entryTime, exitTime } = useCompanyStore();

  return (
    <>
      <Tobbar />
      <div className="min-h-screen w-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center px-4 pt-4 pb-[10vh]">
        {/* زمان ورود و خروج */}
        <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 transition-all duration-200 hover:shadow-3xl">
          <h2 className="text-lg font-extrabold text-white drop-shadow-lg mb-4 text-right">
            زمان کاری
          </h2>
          <div className="flex justify-between text-right">
            <div>
              <p className="text-sm text-white/80 drop-shadow-md">ورود</p>
              <p className="text-lg font-bold text-white drop-shadow-lg">
                {entryTime.hour && entryTime.minute
                  ? `${entryTime.hour.padStart(2, "0")}:${entryTime.minute.padStart(2, "0")}`
                  : "تنظیم نشده"}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/80 drop-shadow-md">خروج</p>
              <p className="text-lg font-bold text-white drop-shadow-lg">
                {exitTime.hour && exitTime.minute
                  ? `${exitTime.hour.padStart(2, "0")}:${exitTime.minute.padStart(2, "0")}`
                  : "تنظیم نشده"}
              </p>
            </div>
          </div>
        </div>

        {/* مختصات پلی‌گان */}
        <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 transition-all duration-200 hover:shadow-3xl">
          <h2 className="text-lg font-extrabold text-white drop-shadow-lg mb-4 text-right">
            مختصات پلی‌گان
          </h2>
          {polygonCoords.length > 0 ? (
            <ul className="space-y-3">
              {polygonCoords.map((point, index) => (
                <li
                  key={index}
                  className="text-white text-sm bg-white/10 p-3 rounded-lg text-right transition-colors duration-200 hover:bg-white/20"
                >
                  نقطه {index + 1}: {point.latitude.toFixed(4)},{" "}
                  {point.longitude.toFixed(4)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/80 text-sm text-right drop-shadow-md">بدون مختصات</p>
          )}
        </div>

        {/* گزارش‌ها */}
        <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 transition-all duration-200 hover:shadow-3xl">
          <h2 className="text-lg font-extrabold text-white drop-shadow-lg mb-4 text-right">
            گزارش‌ها
          </h2>
          {Object.keys(reports).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(reports).map(([date, text]) => (
                <div
                  key={date}
                  className="bg-white/10 p-4 rounded-lg transition-colors duration-200 hover:bg-white/20"
                >
                  <p className="text-sm text-white/80 text-right drop-shadow-md">{date}</p>
                  <p className="text-white text-right drop-shadow-lg">{text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/80 text-sm text-right drop-shadow-md">بدون گزارش</p>
          )}
        </div>
      </div>
    </>
  );
}