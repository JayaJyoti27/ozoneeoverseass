import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export const Route = createFileRoute("/Admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
