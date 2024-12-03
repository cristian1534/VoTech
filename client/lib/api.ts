import { TProject } from "../types/typeProjects";
import { TUser } from '../types/typeUser';
import { TSubscription } from "../types/typeSubscriptions";
import { TUserProject } from "../types/typeUserProject";
import axios from "axios";
import { getSessions, endSession } from "../customHooks/setSession";


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

interface UserProjectApiResponse {
  status: number;
  message: string;
  data: TUserProject[];
}

interface UserSubscriptionApiResponse {
  status: number;
  message: string;
  data: TSubscription[];
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
  const token = getSessions();

  try {
    await axios.delete(`https://votech.onrender.com/users/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    endSession();
    window.location.reload();
  } catch (error) {
    console.error("Axios error:", error);
  }
}

export async function handlePaymentState(
  uuid: string | undefined,
  payment: boolean,
  setPayment: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  setPayment(!payment); 
 
}


export async function createUserProjectRelation(
  userEmail: string,
  projectId: number
): Promise<TUserProject[] | string | null> {  
  try {
    const response = await axios.post<UserProjectApiResponse>(
      `https://votech.onrender.com/user-project/`,
      { userEmail, projectId }
    );
    return response.data?.data || null;
  } catch (error) {
    console.log(error);
    return "You have applied for the project before."; 
  }
}


export async function getAllUserProject(): Promise<TUserProject[] | null> {
  try {
    const response = await axios.get<UserProjectApiResponse>(
      `https://votech.onrender.com/user-project/`
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

export async function getSubscriptions(): Promise<TSubscription[]> {
  try {
    const response = await axios.post<UserSubscriptionApiResponse>(
      `https://votech.onrender.com/users/subscriptions/`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Axios error:", error);
    return [];
  }
}
