import React from "react";
import { DashUsersList } from "../../../components/DashUserList";
import { DashUserProjectList } from "../../../components/DashUserProjectList";
import {
  getUsers,
  getAllUserProject,
  getSubscriptions,
  getAllMessages,
} from "../../../lib/api";
import { Rentability } from "../../../components/Rentability";
import { DashContactList } from "../../../components/DashContactList";

export default async function page() {
  const users = await getUsers();
  const userProjects = await getAllUserProject();
  const userSubscriptions = await getSubscriptions();
  const messages = await getAllMessages();

  return (
    <div>
      <DashUsersList users={users || []} />
      <Rentability userSubscriptions={userSubscriptions} />
      <DashUserProjectList userProjects={userProjects ?? []} />
      <DashContactList contacts={messages ?? []} />
    </div>
  );
}