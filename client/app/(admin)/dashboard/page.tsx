import React from "react";
import { DashUsersList } from "../../../components/DashUserList";
import { getUsers } from "../../../lib/api";

export default async function page() {
    const users = await getUsers();
  return (
    <div>
      <DashUsersList users={users || []} />
    </div>
  );
}
