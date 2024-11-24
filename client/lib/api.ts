import { TProject } from "../types/typeProjects";
import axios from "axios";

interface ApiResponse {
  status: number;
  message: string;
  data: TProject[];
}

export async function getProjects(): Promise<TProject[] | null> {
  try {
    const response = await axios.get<ApiResponse>("https://votech.onrender.com/projects/");

    return response.data.data || null; 
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}
