import { create } from 'zustand';

export const useCompanyStore = create((set) => ({
  companyName: '',
  logoUri: '',
  setCompanyName: (name) => set({ companyName: name }),
  setLogoUri: (uri) => set({ logoUri: uri }),

  polygonCoords: [],
  setPolygonCoords: (coords) => set({ polygonCoords: coords }),

  // گزارش‌ها: شی‌ء با تاریخ به‌عنوان کلید
  reports: [],
  setReport: (date, text) =>
    set((state) => ({
      reports: {
        ...state.reports,
        [date]: text,
      },
    })),
}));
