import React from 'react'
import JalaliCalendar from '../_components/ReportShow'

export default function page() {
  return (
    <div>
      <JalaliCalendar />
    </div>
  )
}
























































// "use client";

// import { useState, useEffect } from "react";
// import moment from "moment-jalaali";
// import { IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { useCompanyStore } from "../_store/companyStore";

// moment.loadPersian({ usePersianDigits: false });

// export default function JalaliCalendar() {
//   // برای جلوگیری از خطای hydration
//   const [mounted, setMounted] = useState(false);
//   const [today, setToday] = useState<moment.Moment | null>(null);

//   // استور
//   const reports = useCompanyStore((state) => state.reports);
//   const setReport = useCompanyStore((state) => state.setReport);

//   // تاریخ و متن گزارش
//   const [currentMonth, setCurrentMonth] = useState<moment.Moment | null>(null);
//   const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
//   const [reportText, setReportText] = useState("");
//   const [isCalendarHidden, setIsCalendarHidden] = useState(false);

//   const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

//   // وقتی کلاینت mount شد → تاریخ بساز
//   useEffect(() => {
//     const now = moment();
//     setToday(now);
//     setCurrentMonth(now.clone().startOf("jMonth"));
//     setSelectedDate(now.clone());
//     setMounted(true);
//   }, []);

//   // فقط وقتی تاریخ تغییر کنه، متن گزارش پر بشه
//   useEffect(() => {
//     if (!selectedDate) return;
//     const key = selectedDate.format("jYYYY/jMM/jDD");
//     setReportText(reports[key] || "");
//   }, [selectedDate]);

//   // لاگ تغییرات برای دیباگ
//   useEffect(() => {
//     console.log("Reports changed:", reports);
//   }, [reports]);

//   // هنوز آماده نیست → چیزی رندر نکن
//   if (!mounted || !today || !currentMonth || !selectedDate) {
//     return null;
//   }

//   const handlePrevMonth = () =>
//     setCurrentMonth((prev) => prev && prev.clone().subtract(1, "jMonth"));
//   const handleNextMonth = () =>
//     setCurrentMonth((prev) => prev && prev.clone().add(1, "jMonth"));

//   const handleConfirmReport = () => {
//     if (!selectedDate) return;
//     const dateKey = selectedDate.format("jYYYY/jMM/jDD");

//     if (reports[dateKey]) {
//       return alert("شما قبلاً برای این روز گزارش ثبت کرده‌اید.");
//     }
//     if (reportText.trim() === "") {
//       return alert("متن گزارش نمی‌تواند خالی باشد.");
//     }

//     setReport(dateKey, reportText.trim());
//     setReportText("");
//     alert("گزارش با موفقیت ثبت شد.");
//   };

//   const generateMonthDays = () => {
//     const days: (moment.Moment | null)[] = [];
//     if (!currentMonth) return days;

//     const startDay = currentMonth.clone().startOf("jMonth");
//     const endDay = currentMonth.clone().endOf("jMonth");
//     const dayCount = endDay.jDate();

//     const firstDayOfWeek = startDay.day();
//     const adjustedFirstDayOfWeek = (firstDayOfWeek + 1) % 7;

//     for (let i = 0; i < adjustedFirstDayOfWeek; i++) days.push(null);
//     for (let i = 0; i < dayCount; i++)
//       days.push(startDay.clone().add(i, "days"));

//     return days;
//   };

//   const isToday = (day: moment.Moment) => today && day.isSame(today, "day");
//   const isSelected = (day: moment.Moment) =>
//     selectedDate && day.isSame(selectedDate, "day");

//   const days = generateMonthDays();

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-2 sm:p-4 flex flex-col rtl w-full max-w-2xl mx-auto">
//       {!isCalendarHidden && (
//         <>
//           {/* Header */}
//           <div className="flex flex-row-reverse justify-between items-center bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-t-2xl">
//             <button onClick={handlePrevMonth}>
//               <IoArrowBack size={20} className="sm:size-24" />
//             </button>
//             <p className="text-base sm:text-lg font-semibold">
//               {currentMonth.format("jMMMM jYYYY")}
//             </p>
//             <button onClick={handleNextMonth}>
//               <IoArrowForward size={20} className="sm:size-24" />
//             </button>
//           </div>

//           {/* Week Days */}
//           <div className=" grid grid-cols-7 bg-gray-100 border-b">
//             {weekDays.map((d, i) => (
//               <p
//                 key={i}
//                 className="text-center font-bold text-gray-600 py-2 text-xs sm:text-sm md:text-base"
//               >
//                 {d}
//               </p>
//             ))}
//           </div>

//           {/* Days */}
//           <div className="grid grid-cols-7 gap-1 p-2">
//             {days.map((day, i) => (
//               <div
//                 key={i}
//                 className={`aspect-square flex justify-center items-center rounded-lg border text-sm sm:text-base
//                   ${
//                     !day
//                       ? "bg-gray-50"
//                       : isToday(day)
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100"
//                   }
//                   ${
//                     day && isSelected(day)
//                       ? "border-orange-500 border-2"
//                       : "border-gray-300"
//                   }`}
//               >
//                 {day ? (
//                   <button
//                     onClick={() => setSelectedDate(day)}
//                     className="w-full h-full flex items-center justify-center"
//                   >
//                     {day.format("jD")}
//                   </button>
//                 ) : (
//                   <span>&nbsp;</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Report Section */}
//       <div className="p-3 sm:p-4 bg-gray-50 rounded-b-2xl">
//         <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
//           <div className="flex-1 text-center bg-green-600 text-white px-2 sm:px-4 py-2 rounded-lg">
//             ورود : 12:00
//           </div>
//           <div className="flex-1 text-center bg-red-600 text-white px-2 sm:px-4 py-2 rounded-lg">
//             خروج : 18:30
//           </div>
//         </div>

//         <p className="mt-2 text-gray-700 text-sm sm:text-base">
//           گزارش روز {selectedDate.format("jYYYY/jMM/jDD")}:
//         </p>

//         <textarea
//           className="w-full border rounded-lg p-2 mt-2 min-h-24 text-sm sm:text-base"
//           placeholder="متن گزارش را وارد کنید..."
//           value={reportText}
//           onChange={(e) => setReportText(e.target.value)}
//           onFocus={() => setIsCalendarHidden(true)}
//           onBlur={() => setIsCalendarHidden(false)}
//         />

//         <button
//           className={`w-full mt-3 py-2 rounded-lg text-white text-sm sm:text-base
//             ${
//               reportText.trim() === "" ||
//               reports[selectedDate.format("jYYYY/jMM/jDD")]
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-500 hover:bg-green-600"
//             }`}
//           disabled={
//             reportText.trim() === "" ||
//             !!reports[selectedDate.format("jYYYY/jMM/jDD")]
//           }
//           onClick={handleConfirmReport}
//         >
//           ثبت گزارش
//         </button>
//       </div>
//     </div>
//   );
// }
