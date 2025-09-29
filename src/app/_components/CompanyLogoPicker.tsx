"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useCompanyStore } from "@/app/_store/companyStore";
import { useRouter } from "next/navigation";

const CompanyLogoPicker = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const companyName = useCompanyStore((state) => state.companyName);
  const logoUri = useCompanyStore((state) => state.logoUri);
  const setCompanyName = useCompanyStore((state) => state.setCompanyName);
  const setLogoUri = useCompanyStore((state) => state.setLogoUri);

  const router = useRouter();

  const pickImage = () => {
    if (!companyName.trim()) {
      alert("لطفاً نام شرکت را وارد کنید");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUri(reader.result as string); // Base64
    };
    reader.readAsDataURL(file);
  }
};


  const handleConfirm = () => {
    if (!companyName.trim() || !logoUri) {
      alert("لطفاً نام شرکت و لوگو را وارد کنید");
      return;
    } else {
      router.push("/information/polygon");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center">
        {/* عنوان */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6 text-center">
          ثبت شرکت
        </h1>

        {/* ورودی نام شرکت */}
        <input
          type="text"
          placeholder="نام شرکت"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 mb-6 text-sm sm:text-base shadow-sm"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        {/* انتخاب لوگو */}
        <button
          onClick={pickImage}
          className="w-[85%] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-md"
        >
          انتخاب لوگو 📁
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* نمایش لوگو (دایره اینستاگرامی) */}
        {logoUri && (
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="p-[4px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-white shadow-inner">
                <Image
                  src={logoUri}
                  alt="Company Logo"
                  width={144}
                  height={144}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
            <span className="text-gray-700 font-semibold text-base sm:text-lg">
              {companyName}
            </span>
          </div>
        )}

        {/* دکمه تأیید */}
        <button
          onClick={handleConfirm}
          className="w-[85%] mt-8 bg-[#0095f6] text-white font-bold py-3 rounded-xl hover:bg-[#0078cc] transition-all shadow-md"
        >
          تأیید و ادامه ✅
        </button>

        {/* لوگوی کوچک پایین */}
        <Image
          src={"/images/images/logos/splash.png"}
          width={40}
          height={40}
          alt="Company logo"
          className="w-12 h-12 rounded-full object-cover shadow-md mt-10"
        />
      </div>
    </div>
  );
};

export default CompanyLogoPicker;
