import { TProject } from "../types/typeProjects";
import axios from "axios";

export async function getProjects(token: string): Promise<TProject[] | null> {
  
  if (!token) {
    console.error("No session token available");
    return null;
  }

  try {
    const response = await axios.get("https://votech.onrender.com/projects/", {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    return response.data as TProject[];
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}
