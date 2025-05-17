import AdminLayout from "../layout";
import { CreateUserForm } from "./CreateUserForm";
export default function UsersPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="page-title mb-7">Users</h1>
        <CreateUserForm />
      </div>
    </AdminLayout>
  );
}