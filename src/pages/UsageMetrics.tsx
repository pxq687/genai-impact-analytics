
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const UsageMetrics = () => {
  return (
    <DashboardLayout 
      title="Usage Metrics" 
      subtitle="Detailed analytics on your AI systems usage patterns"
    >
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Usage Metrics Dashboard</h2>
          <p className="text-muted-foreground">
            This page will display comprehensive usage metrics for your AI systems.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsageMetrics;
