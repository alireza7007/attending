"use client";

import { Moment } from "moment-jalaali";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface CalendarHeaderProps {
  currentMonth: Moment;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-row-reverse justify-between items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-3 py-2 rounded-2xl shadow-md mb-2">
      <button onClick={onPrevMonth} className="hover:scale-110 transition">
        <IoArrowBack size={18} />
      </button>
      <p className="text-base sm:text-lg font-extrabold tracking-wide">
        {currentMonth.format("jMMMM jYYYY")}
      </p>
      <button onClick={onNextMonth} className="hover:scale-110 transition">
        <IoArrowForward size={18} />
      </button>
    </div>
  );
}