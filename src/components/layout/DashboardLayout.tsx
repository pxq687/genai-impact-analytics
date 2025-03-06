
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({
  children,
  className,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-dashboard-gradient">
        <Header title={title} subtitle={subtitle} actions={actions} />
        <main className={cn("flex-1 overflow-y-auto p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
