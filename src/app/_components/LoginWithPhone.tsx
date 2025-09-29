"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"username" | "phone">("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // مدیریت Toast (خودکار بعد از 3 ثانیه غیبش می‌زنه)
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // چک کردن وضعیت لاگین در زمان لود صفحه
  useEffect(() => {
    console.log("Checking login status...");
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.isLoggedIn) {
          console.log("Navigating to /main from useEffect");
          router.push("/main");
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, [router]);

  // لاگین با یوزرنیم و پسورد (موقتاً غیرفعال برای دیباگ)
  const handleUsernameLogin = async () => {
    try {
      console.log("Attempting username login with:", { username });
      setToast({ message: "لاگین با نام کاربری موقتاً غیرفعال است (برای تست) ✅", type: "success" });
      setTimeout(() => {
        console.log("Navigating to /main after username login");
        router.push("/main");
      }, 2000);
    } catch (error) {
      console.error("Username login error:", error);
      setToast({ message: "مشکلی در ارتباط با سرور پیش آمده است ❌", type: "error" });
    }
  };

  // ارسال کد تأیید
  const handleSendOtp = async () => {
    console.log("Sending OTP for phone:", phoneNumber);
    if (!phoneNumber) {
      setToast({ message: "لطفاً شماره موبایل را وارد کنید ❌", type: "error" });
      return;
    }
    try {
      const response = await axios.post(
        `https://api.eghlym.com/api/UserController/SendVerificationCode?PhoneNumber=${phoneNumber}`
      );
      if (response.data.code === "200" && response.data.data === "OK") {
        setOtpSent(true);
        setToast({ message: "کد تأیید ارسال شد 📱", type: "success" });
      } else {
        setToast({ message: "مشکلی در ارسال کد پیش آمد ❌", type: "error" });
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      setToast({ message: "خطا در ارتباط با سرور ❌", type: "error" });
    }
  };

  // تأیید کد
  const handleVerifyOtp = async () => {
    console.log("Verifying OTP:", otp);
    if (otp.length !== 4) {
      setToast({ message: "کد باید ۴ رقمی باشد ❌", type: "error" });
      return;
    }
    try {
      const response = await axios.post(
        `https://api.eghlym.com/api/UserController/VerifiyCode?CellPhone=${phoneNumber}&VerificationCode=${otp}`
      );
      if (response.data.code === "200"  && response.data.data === "Verification code is valid") {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            phoneNumber,
            token: response.data.data.access_token,
            isLoggedIn: true,
          })
        );
        setToast({ message: "ورود با موفقیت انجام شد ✅", type: "success" });
        setTimeout(() => {
          console.log("Navigating to /main after OTP verification");
          router.push("/main");
        }, 2000);
      } else {
        setToast({ message: response.data.data || "کد تأیید نامعتبر است ❌", type: "error" });
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      setToast({ message: "خطا در ارتباط با سرور ❌", type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center px-4 pt-8">
      <div data-testid="login-wrapper">
        {/* کارت لاگین */}
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-8 transition-all duration-200 hover:scale-[1.02] hover:shadow-3xl">
          {/* لوگو */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/images/logos/eghlym.png"
              alt="Logo"
              width={200}
              height={60}
              className="object-contain"
              onError={(e) => console.error("Logo load error:", e)}
            />
          </div>

          {/* تب‌ها */}
          <div className="flex justify-center mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-r-xl text-sm font-bold transition-all duration-200 ${
                tab === "username"
                  ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                  : "bg-white/20 text-white/90 hover:bg-white/30"
              }`}
              onClick={() => {
                console.log("Switching to username tab");
                setTab("username");
                setOtpSent(false);
                setPhoneNumber("");
                setOtp("");
              }}
            >
              ورود با نام کاربری
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-l-xl text-sm font-bold transition-all duration-200 ${
                tab === "phone"
                  ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                  : "bg-white/20 text-white/90 hover:bg-white/30"
              }`}
              onClick={() => {
                console.log("Switching to phone tab");
                setTab("phone");
                setUsername("");
                setPassword("");
              }}
            >
              ورود با موبایل
            </button>
          </div>

          {/* فرم لاگین */}
          {tab === "username" ? (
            <>
              <input
                className="w-full bg-white/20 border border-white/30 rounded-xl p-3 mb-4 text-white text-right text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="نام کاربری، ایمیل یا شماره موبایل"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="w-full bg-white/20 border border-white/30 rounded-xl p-3 mb-4 text-white text-right text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="رمز عبور"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-extrabold text-sm shadow-md transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
                onClick={handleUsernameLogin}
              >
                ورود
              </button>
              <button className="w-full text-white/90 text-sm mt-4 hover:text-white transition-colors duration-200">
                رمز عبور را فراموش کرده‌اید؟
              </button>
            </>
          ) : (
            <>
              <input
                className="w-full bg-white/20 border border-white/30 rounded-xl p-3 mb-4 text-white text-right text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="شماره موبایل (مثال: 09123456789)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                maxLength={11}
                type="tel"
              />
              {otpSent && (
                <input
                  className="w-full bg-white/20 border border-white/30 rounded-xl p-3 mb-4 text-white text-right text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="کد ۴ رقمی"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={4}
                  type="tel"
                />
              )}
              <button
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-extrabold text-sm shadow-md transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              >
                {otpSent ? "تأیید کد" : "ارسال کد"}
              </button>
            </>
          )}

          {/* جداکننده */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-white/30"></div>
            <span className="text-white/90 mx-3 text-sm font-bold">یا</span>
            <div className="flex-1 h-[1px] bg-white/30"></div>
          </div>

          {/* دکمه ایجاد حساب */}
          <button className="w-full text-white/90 text-sm font-bold hover:text-white transition-colors duration-200">
            ایجاد حساب کاربری جدید
          </button>

          {/* فوتر */}
          <div className="flex justify-center items-center mt-8">
            <span className="text-white/90 text-sm mr-2">اقلیم</span>
            <Image
              src="/images/images/logos/splash.png"
              alt="Footer Logo"
              width={40}
              height={40}
              className="object-contain"
              onError={(e) => console.error("Footer logo load error:", e)}
            />
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white transition-all duration-300 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}