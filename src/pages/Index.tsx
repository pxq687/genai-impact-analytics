
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { ToolFilter } from "@/components/dashboard/ToolFilter";
import { ToolBreakdown } from "@/components/dashboard/ToolBreakdown";
import { ToolUsageChart } from "@/components/dashboard/ToolUsageChart";
import { useState } from "react";
import { 
  kpiData, 
  timeSeriesData, 
  departmentUsageData, 
  insightsData, 
  projectsData,
  costBreakdownData,
  adoptionRateData,
  aiToolsList
} from "@/lib/data";
import { DollarSign, Users, Clock, TrendingUp, AlertCircle } from "lucide-react";

const iconMap = {
  "total-cost-savings": <DollarSign className="h-4 w-4" />,
  "productivity-gain": <Users className="h-4 w-4" />,
  "time-saved": <Clock className="h-4 w-4" />,
  "roi": <TrendingUp className="h-4 w-4" />,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Index = () => {
  // State for selected tools filter
  const [selectedTools, setSelectedTools] = useState<string[]>(
    aiToolsList.slice(0, 3).map(tool => tool.id)
  );

  return (
    <DashboardLayout 
      title="GenAI Impact Dashboard" 
      subtitle="Overview of your AI investments and returns"
    >
      <div className="space-y-6">
        {/* Tool Filter */}
        <div className="mb-6">
          <ToolFilter 
            selectedTools={selectedTools} 
            onToolsChange={setSelectedTools} 
          />
        </div>

        {/* KPI Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              description={kpi.description}
              trend={kpi.trend as "up" | "down" | "neutral"}
              change={kpi.change}
              icon={iconMap[kpi.id as keyof typeof iconMap]}
            />
          ))}
        </div>

        {/* AI Tool Breakdown Section */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <ToolBreakdown selectedTools={selectedTools} />
        </div>

        {/* Tool Usage Chart */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <ToolUsageChart selectedTools={selectedTools} />
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Cost vs. Savings Over Time"
            description="Monthly comparison of AI investments and returns"
            data={timeSeriesData}
            type="area"
            dataKeys={{ x: "name", y: ["costs", "savings"] }}
            colors={["#6B7280", "#10B981"]}
            valueFormatter={(value) => formatCurrency(value)}
            height={300}
          />
          <ChartCard
            title="AI Investment Breakdown"
            description="Distribution of AI spending by category"
            data={costBreakdownData}
            type="pie"
            dataKeys={{ x: "name", y: "value" }}
            valueFormatter={(value) => formatCurrency(value)}
            height={300}
          />
        </div>

        {/* Usage and Adoption Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Department Usage"
            description="GenAI adoption across departments"
            data={departmentUsageData}
            type="bar"
            dataKeys={{ x: "name", y: "value" }}
            valueFormatter={(value) => `${value}%`}
            height={300}
          />
          <ChartCard
            title="User Adoption Trend"
            description="Weekly active users and new users"
            data={adoptionRateData}
            type="line"
            dataKeys={{ x: "name", y: ["activeUsers", "newUsers"] }}
            colors={["#3B82F6", "#8B5CF6"]}
            height={300}
          />
        </div>

        {/* Top AI Projects Section */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Top AI Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              status={project.status as "Live" | "In Progress" | "Planning"}
              roi={project.roi}
              costs={project.costs}
              savings={project.savings}
            />
          ))}
        </div>

        {/* AI Insights Section */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Insights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insightsData.map((insight) => (
            <InsightCard
              key={insight.id}
              title={insight.title}
              description={insight.description}
              category={insight.category}
              impact={insight.impact as "low" | "medium" | "high"}
            />
          ))}
        </div>

        {/* Risk Alert Section */}
        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="font-medium text-yellow-800">Attention Needed</h3>
          </div>
          <p className="mt-2 text-sm text-yellow-700">
            Data analysis cycle times have reduced, but model accuracy needs improvement.
            Consider allocating resources to fine-tune models for the data analytics team.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
