import { TProject } from "../types/typeProjects";
import axios from "axios";

export async function getProjects(): Promise<TProject[] | null> {
 
  try {
    const response = await axios.get("https://votech.onrender.com/projects/");

    return response.data as TProject[];
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}
