import { create } from "zustand";
import dashboardAPI from "../services/dashboard.api";

const useDashboardStore = create((set) => ({
  summary: null,
  analytics: null,
  productivity: null,
  loading: false,
  dueTasks: [],
  dueProjects: [],

  fetchSummary: async () => {
    set({ loading: true });
    try {
      const res = await dashboardAPI.getSummary();
      set({ summary: res.data.data });
    } catch (e) {
      console.error(e);
    }
    set({ loading: false });
  },

  fetchAnalytics: async () => {
    try {
      const res = await dashboardAPI.getAnalytics();
       set({ analytics: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchProductivity: async () => {
    try {
      const res = await dashboardAPI.getProductivity();
      set({ productivity: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },
  fetchDueTasks: async () => {
  const res = await dashboardAPI.getDueTasks();
  set({ dueTasks: res.data.data || [] });
},

  fetchDueProjects: async () => {
  const res = await dashboardAPI.getDueProjects();
  set({ dueProjects: res.data.data || []});
},

}));

export default useDashboardStore;
