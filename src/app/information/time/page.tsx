"use client";

import Tobbar from "@/app/_components/Tobbar";
import React, { useState, useRef, useEffect } from "react";

const Page = () => {
  const [hourOpen, setHourOpen] = useState("");
  const [minOpen, setMinOpen] = useState("");
  const [hourClose, setHourClose] = useState("");
  const [minClose, setMinClose] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // const [toastMessage, setToastMessage] = useState<string | null>(null);
  // const [toastType, setToastType] = useState<"success" | "error">("success");

  const hourOpenRef = useRef<HTMLInputElement>(null);
  const minOpenRef = useRef<HTMLInputElement>(null);
  const hourCloseRef = useRef<HTMLInputElement>(null);
  const minCloseRef = useRef<HTMLInputElement>(null);

  // ✅ تشخیص باز/بسته شدن کیبورد (در موبایل)
  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const diff:number = initialHeight - window.innerHeight;
      if (diff > 150) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ نمایش Toast
  // const showToast = (msg: string, type: "success" | "error") => {
  //   setToastMessage(msg);
  //   setToastType(type);
  //   setTimeout(() => {
  //     setToastMessage(null);
  //   }, 3000);
  // };

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
    setValue: React.Dispatch<React.SetStateAction<string>>,
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

  return (
    <>
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
                  handleInputChange(e.target.value, minOpenRef, setHourOpen, "hour")
                }
                value={hourOpen}
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
                  handleInputChange(e.target.value, hourCloseRef, setMinOpen, "minute")
                }
                value={minOpen}
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
                  handleInputChange(e.target.value, minCloseRef, setHourClose, "hour")
                }
                value={hourClose}
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
                  handleInputChange(e.target.value, null, setMinClose, "minute")
                }
                value={minClose}
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
            onClick={() => handeltimeValid(hourOpen, hourClose, minOpen, minClose)}
          >
            ثبت زمان کاری
          </button>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {/* {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white transition-all duration-300
          ${toastType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toastMessage}
        </div>
      )} */}
    </>
  );
};

export default Page;
