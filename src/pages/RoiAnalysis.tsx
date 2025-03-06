
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { 
  kpiData, 
  timeSeriesData, 
  projectsData
} from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const RoiAnalysis = () => {
  return (
    <DashboardLayout 
      title="ROI Analysis" 
      subtitle="Detailed return on investment metrics for your AI initiatives"
    >
      <div className="space-y-6">
        {/* ROI Overview Section */}
        <StatCard
          title="Overall ROI"
          value={kpiData.find(item => item.id === "roi")?.value || "0%"}
          description="return on AI investment"
          trend="up"
          change={22.1}
          icon={<TrendingUp className="h-4 w-4" />}
          className="w-full lg:w-1/3"
        />

        {/* ROI Chart */}
        <ChartCard
          title="ROI Over Time"
          description="Cumulative return on AI investments"
          data={timeSeriesData}
          type="line"
          dataKeys={{ x: "name", y: ["savings"] }}
          colors={["#10B981"]}
          valueFormatter={(value) => formatCurrency(value)}
          height={350}
        />

        {/* ROI Calculator */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
            <CardDescription>Estimate potential returns for your AI projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment</Label>
                <Input id="initial-investment" type="number" placeholder="100000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-cost">Annual Operating Cost</Label>
                <Input id="annual-cost" type="number" placeholder="50000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-savings">Expected Annual Savings</Label>
                <Input id="annual-savings" type="number" placeholder="200000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe (Years)</Label>
                <Input id="timeframe" type="number" placeholder="3" />
              </div>
            </div>
            <Button className="mt-6" size="sm">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate ROI
            </Button>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">3-Year ROI</p>
                  <p className="text-2xl font-semibold text-ai-green">320%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Payback Period</p>
                  <p className="text-2xl font-semibold">14 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Net Benefit</p>
                  <p className="text-2xl font-semibold">$450,000</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Project ROI Breakdown */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Project ROI Breakdown</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
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
      </div>
    </DashboardLayout>
  );
};

export default RoiAnalysis;
