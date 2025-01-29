import React from "react";
import { DashUsersList } from "../../../components/DashUserList";
import { DashUserProjectList } from "../../../components/DashUserProjectList";
import { Rentability } from "../../../components/Rentability";
import { DashContactList } from "../../../components/DashContactList";
import { Servers } from "../../../components/Servers";

export default async function page() {
 
  return (
    <div>
      <DashUsersList />
      <Rentability  />
      <DashUserProjectList /> 
      <DashContactList />
      <Servers />
    </div>
  );
}
