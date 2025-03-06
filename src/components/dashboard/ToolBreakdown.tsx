
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { toolUsageData } from "@/lib/data";

interface ToolBreakdownProps {
  selectedTools: string[];
}

export function ToolBreakdown({ selectedTools }: ToolBreakdownProps) {
  // Filter data based on selected tools
  const filteredData = selectedTools.length > 0 
    ? toolUsageData.filter(tool => selectedTools.includes(tool.id))
    : toolUsageData;
  
  // Sort by ROI descending for better visualization
  const sortedData = [...filteredData].sort((a, b) => b.roi - a.roi);
  
  // Colors for different tool categories
  const categoryColors: Record<string, string> = {
    "Text Generation": "#8884d8",
    "Image Generation": "#82ca9d",
    "Code Generation": "#ffc658",
    "Content Creation": "#ff8042"
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Tool Breakdown</CardTitle>
        <CardDescription>
          Performance metrics for each AI tool
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {sortedData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === "roi") return [`${value}%`, "ROI"];
                    if (name === "costPerMonth") return [formatCurrency(value), "Monthly Cost"];
                    if (name === "savingsPerMonth") return [formatCurrency(value), "Monthly Savings"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => {
                    const tool = sortedData.find(t => t.name === label);
                    return `${tool?.name} (${tool?.category})`;
                  }}
                />
                <Legend />
                <Bar dataKey="roi" name="ROI (%)" fill="#8884d8">
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select at least one tool to view breakdown
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
