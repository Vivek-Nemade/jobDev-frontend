import api from "./api.js";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  verifyOTP: (data) => api.post("/auth/verify-otp", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  getMe: () => api.get("/auth/me"),
};

export const jobService = {
  getJobs: (params) => api.get("/jobs", { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post("/jobs", data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: () => api.get("/jobs/recruiter/my"),
};

export const applicationService = {
  apply: (jobId, formData) =>
    // api.post(`/applications/${jobId}`, formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
      api.post(`/applications/${jobId}`, formData),
  getMyApplications: () => api.get("/applications/my"),
  getJobApplicants: (jobId) => api.get(`/applications/job/${jobId}`),
  updateStatus: (id, status) =>
    api.patch(`/applications/${id}/status`, { status }),
};

export const userService = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (formData) =>
    api.put("/users/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  saveJob: (jobId) => api.post(`/users/save-job/${jobId}`),
  getSavedJobs: () => api.get("/users/saved-jobs"),
};

export const adminService = {
  getStats: () => api.get("/admin/stats"),
  getPendingJobs: () => api.get("/admin/jobs/pending"),
  updateJobStatus: (id, status) => api.patch(`/admin/jobs/${id}/status`, { status }),
  getAllUsers: (params) => api.get("/admin/users", { params }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};
