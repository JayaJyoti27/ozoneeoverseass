import { Outlet } from "@tanstack/react-router";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
