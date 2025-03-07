
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  selectedTools?: string[];
  onToolsChange?: (tools: string[]) => void;
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
  selectedTools,
  onToolsChange
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={title} 
          subtitle={subtitle} 
          actions={actions} 
          selectedTools={selectedTools}
          onToolsChange={onToolsChange}
        />
        <main className="flex-1 overflow-auto p-6 pb-16">{children}</main>
      </div>
    </div>
  );
}
