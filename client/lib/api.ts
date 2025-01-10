import { TProject } from "../types/typeProjects";
import { TUser } from "../types/typeUser";
import { TContact } from "../types/typeContact";
import { TSubscription } from "../types/typeSubscriptions";
import { TUserProject } from "../types/typeUserProject";
import { Job } from "../types/typeJobs";
import axios from "axios";
import { getSessions, endSession } from "../customHooks/setSession";

// INTERFACES SECTION
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
}

type ProjectApiResponse = ApiResponse<TProject>;
type UserApiResponse = ApiResponse<TUser>;
type UserProjectApiResponse = ApiResponse<TUserProject>;
type UserSubscriptionApiResponse = ApiResponse<TSubscription>;
type ContactApiResponse = ApiResponse<TContact>;
type JobApiResponse = ApiResponse<Job>;

// GET SECTION
export async function getServerSideProps() {
  try {
    const response = await axios.get<ProjectApiResponse>(
      "https://votech.onrender.com/projects/",
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    return {
      props: {
        projects: response.data.data || null,
      },
    };
  } catch (error) {
    console.error("Axios error:", error);
    return {
      props: {
        projects: null,
      },
    };
  }
}

export async function getUsers(): Promise<TUser[] | null> {
  try {
    const response = await axios.get<UserApiResponse>(
      "https://votech.onrender.com/users/",
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    setTimeout(() => { window.location.reload()}, 1000);
    return response.data.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
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

export async function getAllMessages(): Promise<TContact[] | null> {
  try {
    const response = await axios.get<ContactApiResponse>(
      "https://votech.onrender.com/contacts/"
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

export async function getJobs(): Promise<Job[] | null> {
  try {
    const response = await axios.get<JobApiResponse>(
      "https://votech.onrender.com/jobs"
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

// DELETE SECTION
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
export async function deleteMessageByUuid(uuid: string): Promise<void> {
  const token = getSessions();
  try {
    await axios.delete(`https://votech.onrender.com/contacts/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Axios error:", error);
  }
}

export async function deleteJobByUuid(uuid: string): Promise<void> {
  try {
    await axios.delete(`https://votech.onrender.com/jobs/${uuid}`);
    window.location.reload();
  } catch (error) {
    console.error("Axios error:", error);
  }
}

// UPDATE SECTION
export async function updateVotes(uuid: string, votes: number): Promise<void> {
  try {
    await axios.patch(`https://votech.onrender.com/projects/${uuid}`, {
      votes,
    });
  } catch (error) {
    console.error("Axios error:", error);
  }
}

// HANDLING SECTION
export async function handlePaymentState(
  uuid: string | undefined,
  payment: boolean,
  setPayment: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  if (!uuid) {
    console.error("UUID is required");
    return;
  }
  setPayment(!payment);
  try {
    const result = await axios.patch(
      `https://votech.onrender.com/users/${uuid}`,
      { active: !payment }
    );
    console.log("RESULT:", result);
  } catch (error) {
    console.error("Error updating payment state:", error);
  }
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
