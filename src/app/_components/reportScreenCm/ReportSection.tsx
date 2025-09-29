"use client";

import { Moment } from "moment-jalaali";

interface ReportSectionProps {
  selectedDate: Moment;
  reportText: string;
  setReportText: (text: string) => void;
  hasExistingReport: boolean;
  onConfirmReport: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export default function ReportSection({
  selectedDate,
  reportText,
  setReportText,
  hasExistingReport,
  onConfirmReport,
  onFocus,
  onBlur,
}: ReportSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="mt-2 text-gray-700 text-sm font-medium">
        گزارش روز {selectedDate.format("jYYYY/jMM/jDD")}:
      </p>
      <textarea
        className="w-full border border-gray-200 rounded-xl p-2 sm:p-3 mt-1 min-h-[120px] sm:min-h-[150px] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-y"
        placeholder="متن گزارش را وارد کنید..."
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={hasExistingReport}
      />
      <button
        className={`w-full py-2 sm:py-3 rounded-xl text-white font-bold shadow-md transition
          ${
            reportText.trim() === "" || hasExistingReport
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90"
          }`}
        onClick={onConfirmReport}
      >
        ثبت گزارش
      </button>
    </div>
  );
}