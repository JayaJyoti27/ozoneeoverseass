import { Outlet } from "@tanstack/react-router";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex gap-6 bg-blue-wash min-h-screen">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
