"use client";

import { useState, useEffect } from "react";
import moment, { Moment } from "moment-jalaali";
import { useCompanyStore } from "../_store/companyStore";
import CalendarHeader from "@/app/_components/reportScreenCm/CalendarHeader";
import WeekDays from "@/app/_components/reportScreenCm/WeekDays";
import CalendarDays from "@/app/_components/reportScreenCm/CalendarDays";
import TimeDisplay from "@/app/_components/reportScreenCm/TimeDisplay";
import ReportSection from "@/app/_components/reportScreenCm/ReportSection";
moment.loadPersian({ usePersianDigits: false });

export default function JalaliCalendar() {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Moment | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Moment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [reportText, setReportText] = useState("");
  const [isReportFocused, setIsReportFocused] = useState(false);

  const reports = useCompanyStore((state) => state.reports);
  const setReport = useCompanyStore((state) => state.setReport);

  useEffect(() => {
    const now = moment();
    setToday(now);
    setCurrentMonth(now.clone().startOf("jMonth"));
    setSelectedDate(now.clone());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    const key = selectedDate.format("jYYYY/jMM/jDD");
    setReportText(reports[key] || "");
  }, [selectedDate, reports]);

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => prev && prev.clone().subtract(1, "jMonth"));
  const handleNextMonth = () =>
    setCurrentMonth((prev) => prev && prev.clone().add(1, "jMonth"));

  const handleConfirmReport = () => {
    if (!selectedDate) return;
    const dateKey = selectedDate.format("jYYYY/jMM/jDD");

    if (reports[dateKey]) {
      return alert("شما قبلاً برای این روز گزارش ثبت کرده‌اید.");
    }
    if (reportText.trim() === "") {
      return alert("متن گزارش نمی‌تواند خالی باشد.");
    }

    setReport(dateKey, reportText.trim());
    setReportText("");
    alert("گزارش با موفقیت ثبت شد.");
    console.log("گزارش ثبت شده:", { date: dateKey, text: reportText.trim() });
    console.log("تمام گزارش‌ها:", reports);
  };

  const generateMonthDays = () => {
    const days: (Moment | null)[] = [];
    if (!currentMonth) return days;

    const startDay = currentMonth.clone().startOf("jMonth");
    const endDay = currentMonth.clone().endOf("jMonth");
    const dayCount = endDay.jDate();
    const firstDayOfWeek = startDay.day();
    const adjustedFirstDayOfWeek = (firstDayOfWeek + 1) % 7;

    for (let i = 0; i < adjustedFirstDayOfWeek; i++) days.push(null);
    for (let i = 0; i < dayCount; i++)
      days.push(startDay.clone().add(i, "days"));

    return days;
  };

  const isToday = (day: Moment) => (today ? day.isSame(today, "day") : false);
  const isSelected = (day: Moment) => (selectedDate ? day.isSame(selectedDate, "day") : false);

  if (!mounted || !today || !currentMonth || !selectedDate) {
    return null;
  }

  const dateKey = selectedDate.format("jYYYY/jMM/jDD");
  const hasExistingReport = !!reports[dateKey];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-3 sm:p-5 flex flex-col rtl w-full max-w-2xl mx-auto border border-gray-100 overflow-y-auto max-h-[90vh]">
      <div className={`${isReportFocused ? "hidden" : "block"}`}>
        <CalendarHeader
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <WeekDays />
        <CalendarDays
          days={generateMonthDays()}
          isToday={isToday}
          isSelected={isSelected}
          onSelectDate={setSelectedDate}
        />
        <TimeDisplay />
      </div>
      <ReportSection
        selectedDate={selectedDate}
        reportText={reportText}
        setReportText={setReportText}
        hasExistingReport={hasExistingReport}
        onConfirmReport={handleConfirmReport}
        onFocus={() => setIsReportFocused(true)}
        onBlur={() => setIsReportFocused(false)}
      />
    </div>
  );
}