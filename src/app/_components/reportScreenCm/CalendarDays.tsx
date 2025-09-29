"use client";

import { Moment } from "moment-jalaali";

interface CalendarDaysProps {
  days: (Moment | null)[];
  isToday: (day: Moment) => boolean;
  isSelected: (day: Moment) => boolean;
  onSelectDate: (day: Moment) => void;
}

export default function CalendarDays({
  days,
  isToday,
  isSelected,
  onSelectDate,
}: CalendarDaysProps) {
  return (
    <div className="grid grid-cols-7 gap-1 p-2 transition-all duration-200">
      {days.map((day, i) => (
        <div
          key={i}
          className={`aspect-square flex justify-center items-center rounded-xl border text-xs shadow-sm
            ${
              !day
                ? "bg-gray-50"
                : isToday(day)
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 transition"
            }
            ${
              day && isSelected(day)
                ? "border-pink-500 border-2 shadow-md scale-105"
                : "border-gray-200"
            }`}
        >
          {day ? (
            <button
              onClick={() => onSelectDate(day)}
              className="w-full h-full flex items-center justify-center font-semibold"
            >
              {day.format("jD")}
            </button>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  );
}