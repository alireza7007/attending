"use client";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function WeekDays() {
  return (
    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 rounded-lg">
      {weekDays.map((d, i) => (
        <p
          key={i}
          className="text-center font-bold text-gray-500 py-1 text-xs"
        >
          {d}
        </p>
      ))}
    </div>
  );
}