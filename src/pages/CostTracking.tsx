
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const CostTracking = () => {
  return (
    <DashboardLayout 
      title="Cost Tracking" 
      subtitle="Monitor and analyze your AI implementation costs"
    >
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Cost Tracking Dashboard</h2>
          <p className="text-muted-foreground">
            This page will display detailed cost tracking metrics for your AI investments.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CostTracking;
