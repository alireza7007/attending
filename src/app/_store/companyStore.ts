"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type PolygonPoint = {
  latitude: number;
  longitude: number;
};

type CompanyStore = {
  companyName: string;
  logoUri: string;
  polygonCoords: PolygonPoint[];
  reports: Record<string, string>;
  entryTime: { hour: string; minute: string };
  exitTime: { hour: string; minute: string };
  setCompanyName: (name: string) => void;
  setLogoUri: (uri: string) => void;
  setPolygonCoords: (coords: PolygonPoint[]) => void;
  setReport: (date: string, text: string) => void;
  setEntryTime: (hour: string, minute: string) => void;
  setExitTime: (hour: string, minute: string) => void;
  clearAll: () => void;
};

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companyName: "",
      logoUri: "",
      polygonCoords: [],
      reports: {},
      entryTime: { hour: "", minute: "" },
      exitTime: { hour: "", minute: "" },
      setCompanyName: (name) => set({ companyName: name }),
      setLogoUri: (uri) => set({ logoUri: uri }),
      setPolygonCoords: (coords) => set({ polygonCoords: coords || [] }),
      setReport: (date, text) =>
        set((state) => ({
          reports: {
            ...state.reports,
            [date]: text,
          },
        })),
      setEntryTime: (hour, minute) => set({ entryTime: { hour, minute } }),
      setExitTime: (hour, minute) => set({ exitTime: { hour, minute } }),
      clearAll: () =>
        set({
          companyName: "",
          logoUri: "",
          polygonCoords: [],
          reports: {},
          entryTime: { hour: "", minute: "" },
          exitTime: { hour: "", minute: "" },
        }),
    }),
    {
      name: "company-storage",
      // 🛡 تضمین می‌کنیم داده‌ها همیشه فرمت درست داشته باشن
      merge: (persistedState, currentState) => {
        const state = { ...currentState, ...(persistedState as Partial<CompanyStore>) };
        return {
          ...state,
          companyName: state.companyName || "",
          logoUri: state.logoUri || "",
          polygonCoords: Array.isArray(state.polygonCoords) ? state.polygonCoords : [],
          reports: state.reports && typeof state.reports === "object" ? state.reports : {},
          entryTime: state.entryTime && typeof state.entryTime === "object" 
            ? { hour: state.entryTime.hour || "", minute: state.entryTime.minute || "" } 
            : { hour: "", minute: "" },
          exitTime: state.exitTime && typeof state.exitTime === "object" 
            ? { hour: state.exitTime.hour || "", minute: state.exitTime.minute || "" } 
            : { hour: "", minute: "" },
        };
      },
    }
  )
);