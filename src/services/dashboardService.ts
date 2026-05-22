const API_URL = "http://localhost:3000/api/v1";

export const getDashboardChart = async (token: string) => {
  const response = await fetch(`${API_URL}/dashboard/chart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  
  console.log("SERVICE RESULT:", result)       // ← tambah ini
  console.log("SERVICE DATA:", result.data)    // ← tambah ini

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};