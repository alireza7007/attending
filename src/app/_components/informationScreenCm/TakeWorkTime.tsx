"use client";

import Tobbar from "@/app/_components/Tobbar";
import React, { useState, useRef, useEffect } from "react";
import { useCompanyStore } from "@/app/_store/companyStore"; 
import ClientOnly from "@/app/_components/ClentOnly"; // برای جلوگیری از mismatch

const TakeWorkTime = () => {
  const { entryTime, exitTime, setEntryTime, setExitTime } = useCompanyStore();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hourOpenRef = useRef<HTMLInputElement>(null);
  const minOpenRef = useRef<HTMLInputElement>(null);
  const hourCloseRef = useRef<HTMLInputElement>(null);
  const minCloseRef = useRef<HTMLInputElement>(null);

  // ✅ مطمئن میشیم فقط سمت کلاینت رندر شه
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ تشخیص باز/بسته شدن کیبورد
  useEffect(() => {
    if (!mounted) return;
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const diff: number = initialHeight - window.innerHeight;
      setIsKeyboardOpen(diff > 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  // ✅ اعتبارسنجی زمان
  const handeltimeValid = (
    startHours: string,
    endHours: string,
    startMinutes: string,
    endMinutes: string
  ) => {
    const start = parseInt(startHours || "0") * 60 + parseInt(startMinutes || "0");
    const end = parseInt(endHours || "0") * 60 + parseInt(endMinutes || "0");

    if (end > start) {
      alert("موفقیت! عملیات با موفقیت انجام شد ✅");
    } else {
      alert("ناموفق! عملیات انجام نشد ❌");
    }
  };

  // ✅ کنترل ورودی‌ها
  const handleInputChange = (
    text: string,
    nextRef: React.RefObject<HTMLInputElement | null> | null,
    setValue: (value: string) => void,
    type: "hour" | "minute"
  ) => {
    if (text && !/^\d*$/.test(text)) return;

    const num = parseInt(text) || 0;

    if (type === "hour" && num > 23) {
      setValue("23");
      return;
    } else if (type === "minute" && num > 59) {
      setValue("59");
      return;
    }

    setValue(text);

    if (text.length >= 2 && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  // 🚨 جلوگیری از SSR mismatch
  if (!mounted) return null;

  return (
    <ClientOnly>
      {/* ✅ نمایش Tobbar فقط وقتی کیبورد بسته است */}
      {!isKeyboardOpen && <Tobbar />}

      <div className="flex flex-col justify-between h-screen bg-white dir-rtl w-screen">
        <div className="flex justify-center items-center flex-col px-4 mt-10 sm:px-8 md:px-12">
          {/* زمان ورود */}
          <div className="w-full bg-white rounded-xl p-5 my-4 shadow-md">
            <p className="text-xl sm:text-2xl font-semibold text-[#1a3c34] mb-2 text-right">
              زمان ورود :
            </p>
            <div className="flex flex-row-reverse justify-center items-center w-full">
              <input
                ref={hourOpenRef}
                placeholder="ساعت"
                className="w-1/4 bg-gray-100 rounded-lg p-2 sm:p-3 text-2xl sm:text-3xl 
                           text-[#1f2937] border border-gray-300 mx-2 sm:mx-4 text-center font-bold"
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    minOpenRef,
                    (value) => setEntryTime(value, entryTime.minute),
                    "hour"
                  )
                }
                value={entryTime.hour}
                type="text"
                inputMode="numeric"
                maxLength={2}
              />
              <p className="text-2xl sm:text-3xl text-[#1a3c34] font-bold">:</p>
              <input
                ref={minOpenRef}
                placeholder="دقیقه"
                className="w-1/4 bg-gray-100 rounded-lg p-2 sm:p-3 text-2xl sm:text-3xl 
                           text-[#1f2937] border border-gray-300 mx-2 sm:mx-4 text-center font-bold"
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    hourCloseRef,
                    (value) => setEntryTime(entryTime.hour, value),
                    "minute"
                  )
                }
                value={entryTime.minute}
                type="text"
                inputMode="numeric"
                maxLength={2}
              />
            </div>
          </div>

          {/* زمان خروج */}
          <div className="w-full bg-white rounded-xl p-5 my-4 shadow-md">
            <p className="text-xl sm:text-2xl font-semibold text-[#1a3c34] mb-2 text-right">
              زمان خروج :
            </p>
            <div className="flex flex-row-reverse justify-center items-center w-full">
              <input
                ref={hourCloseRef}
                placeholder="ساعت"
                className="w-1/4 bg-gray-100 rounded-lg p-2 sm:p-3 text-2xl sm:text-3xl 
                           text-[#1f2937] border border-gray-300 mx-2 sm:mx-4 text-center font-bold"
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    minCloseRef,
                    (value) => setExitTime(value, exitTime.minute),
                    "hour"
                  )
                }
                value={exitTime.hour}
                type="text"
                inputMode="numeric"
                maxLength={2}
              />
              <p className="text-2xl sm:text-3xl text-[#1a3c34] font-bold">:</p>
              <input
                ref={minCloseRef}
                placeholder="دقیقه"
                className="w-1/4 bg-gray-100 rounded-lg p-2 sm:p-3 text-2xl sm:text-3xl 
                           text-[#1f2937] border border-gray-300 mx-2 sm:mx-4 text-center font-bold"
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    null,
                    (value) => setExitTime(exitTime.hour, value),
                    "minute"
                  )
                }
                value={exitTime.minute}
                type="text"
                inputMode="numeric"
                maxLength={2}
              />
            </div>
          </div>

          {/* دکمه ثبت */}
          <button
            className="bg-[#f05526] py-3 sm:py-4 px-6 sm:px-8 rounded-2xl text-white 
                       text-xl sm:text-2xl font-medium w-1/2 sm:w-1/3 md:w-1/4 self-center"
            onClick={() =>
              handeltimeValid(
                entryTime.hour,
                exitTime.hour,
                entryTime.minute,
                exitTime.minute
              )
            }
          >
            ثبت زمان کاری
          </button>
        </div>
      </div>
    </ClientOnly>
  );
};

export default TakeWorkTime;
