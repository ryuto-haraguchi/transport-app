import UserList from "./_components/UserList";
import DashboardLayout from "./layout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="page-title">Dashboard</h1>
        <UserList />
      </div>
    </DashboardLayout>
  );
}
