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
import { Servers } from "../../../components/Servers";

export default async function page() {
  const [users, userProjects, userSubscriptions, messages] = await Promise.all([
    getUsers(),
    getAllUserProject(),
    getSubscriptions(),
    getAllMessages(),
  ]);

  return (
    <div>
      <DashUsersList users={users || []} />
      <Rentability userSubscriptions={userSubscriptions} />
      <DashUserProjectList userProjects={userProjects ?? []} />
      <DashContactList messages={messages ?? []} />
      <Servers />
    </div>
  );
}
