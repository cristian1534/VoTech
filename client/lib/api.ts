import { TProject } from "../types/typeProjects";
import { TUser } from "../types/typeUser";
import { TUserProject } from "../types/typeUserProject";
import axios from "axios";

interface ProjectApiResponse {
  status: number;
  message: string;
  data: TProject[];
}

interface UserApiResponse {
  status: number;
  message: string;
  data: TUser[];
}

interface UserProjectResponse {
  status: number;
  message: string;
  data: TUserProject[]
}
export async function getProjects(): Promise<TProject[] | null> {
  try {
    const response = await axios.get<ProjectApiResponse>(
      "https://votech.onrender.com/projects/"
    );

    return response.data.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

export async function getUsers(): Promise<TUser[] | null> {
  try {
    const response = await axios.get<UserApiResponse>(
      "https://votech.onrender.com/users/"
    );
    return response.data.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

export async function deleteUserByUuid(uuid: string): Promise<void> {
  const token = localStorage.getItem("session");
  try {
    await axios.delete(`https://votech.onrender.com/users/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("session");
    localStorage.removeItem("currentUser");
    window.location.reload();
  } catch (error) {
    console.error("Axios error:", error);
  }
}

export async function createUserProjectRelation(userEmail: string, projectId: number): Promise<TUserProject[] | null> {
  try {
    const response = await axios.post<UserProjectResponse>(`https://votech.onrender.com/user-project/`, { userEmail, projectId });
    console.log(response)
    return response.data?.data || null;  
  } catch (error) {
    console.error("Axios error:", error);
    return null;  
  }
};
