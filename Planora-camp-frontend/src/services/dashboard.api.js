import axiosInstance from "../api/axios"; // your axios instance with baseURL & auth

const dashboardAPI = {
  getSummary: () => axiosInstance.get("/dashboard/summary"),
  getAnalytics: () => axiosInstance.get("/dashboard/task-analytics"),
  getProductivity: () => axiosInstance.get("/dashboard/my-productivity"),
  getDueTasks: () => axiosInstance.get("/dashboard/due-tasks"),
  getDueProjects: () => axiosInstance.get("/dashboard/due-projects"),

};

export default dashboardAPI;
