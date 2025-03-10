
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { aiToolsList } from "@/lib/data";

const Performance = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    aiToolsList.slice(0, 3).map(tool => tool.id)
  );

  return (
    <DashboardLayout 
      title="AI Performance" 
      subtitle="Metrics and analytics on your AI models performance"
      selectedTools={selectedTools}
      onToolsChange={setSelectedTools}
    >
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">AI Performance Dashboard</h2>
          <p className="text-muted-foreground">
            This page will display key performance indicators for your AI models and systems.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
