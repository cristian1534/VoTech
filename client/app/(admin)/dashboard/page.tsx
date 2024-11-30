import React from "react";
import { DashUsersList } from "../../../components/DashUserList";
import { DashUserProjectList } from "../../../components/DashUserProjectList";
import { getUsers, getAllUserProject } from "../../../lib/api";
import { Rentability } from "../../../components/Rentability";

export default async function page() {
  const users = await getUsers();
  const userProjects = await getAllUserProject();
  console.log(userProjects);

  return (
    <div>
      <DashUsersList users={users || []} />
      <Rentability />
      <DashUserProjectList userProjects={userProjects ?? []} />
    </div>
  );
}
