import AdminLayout from "./layout";
import { CustomButton } from "@/components/common/CustomButton";
export default function AdminPage() {

  const URL = "/admin/users";
  return (
    <AdminLayout>
      <div>
        <h1 className="page-title">Admin Page</h1>
        <CustomButton href={URL}>Create User</CustomButton>
      </div>
    </AdminLayout>
  );
}
