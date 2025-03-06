
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Adoption = () => {
  return (
    <DashboardLayout 
      title="User Adoption" 
      subtitle="Track and analyze how users are adopting AI tools"
    >
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User Adoption Dashboard</h2>
          <p className="text-muted-foreground">
            This page will display detailed user adoption metrics for your AI tools and solutions.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Adoption;
