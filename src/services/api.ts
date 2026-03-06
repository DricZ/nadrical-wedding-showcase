const API_BASE_URL = import.meta.env.VITE_API_URL || "https://admin.nadrical.my.id/api";

export const fetchSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return response.json();
};
