
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { toolUsageData, aiToolsList, aiTasksData } from "@/lib/data";
import { ToolFilter } from "@/components/dashboard/ToolFilter";

const UsageMetrics = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    aiToolsList.slice(0, 5).map(tool => tool.id)
  );
  
  // Filter data based on selected tools
  const filteredData = selectedTools.length > 0 
    ? toolUsageData.filter(tool => selectedTools.includes(tool.id))
    : toolUsageData;
  
  // Data processing for usage by department chart
  const departmentMap: Record<string, number> = {};
  filteredData.forEach(tool => {
    tool.departments.forEach(dept => {
      departmentMap[dept] = (departmentMap[dept] || 0) + tool.usageHours;
    });
  });
  
  const departmentData = Object.entries(departmentMap).map(([name, value]) => ({ name, value }));
  
  // Data for user count by tool
  const userCountData = filteredData.map(tool => ({
    name: tool.name,
    value: tool.userCount,
    category: tool.category
  }));
  
  // Colors for different tool categories
  const categoryColors: Record<string, string> = {
    "Text Generation": "#8884d8",
    "Image Generation": "#82ca9d",
    "Code Generation": "#ffc658",
    "Content Creation": "#ff8042"
  };
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'];
  
  return (
    <DashboardLayout 
      title="Usage Metrics" 
      subtitle="Detailed analytics on your AI systems usage patterns"
    >
      <div className="space-y-6">
        {/* Tool Filter */}
        <div className="mb-6">
          <ToolFilter 
            selectedTools={selectedTools} 
            onToolsChange={setSelectedTools} 
          />
        </div>
        
        {/* AI Tool Usage Hours */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage Hours by AI Tool</CardTitle>
              <CardDescription>
                Total hours spent using each AI tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {filteredData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip formatter={(value) => [`${value} hours`, 'Usage']} />
                      <Legend />
                      <Bar dataKey="usageHours" name="Usage Hours" fill="#8884d8">
                        {filteredData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select at least one tool to view usage
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Count by AI Tool</CardTitle>
              <CardDescription>
                Number of active users per AI tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {filteredData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userCountData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} users`, 'Active Users']} />
                      <Legend />
                      <Bar dataKey="value" name="Active Users" fill="#8884d8">
                        {userCountData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select at least one tool to view user count
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Department Usage and Task Type */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Department</CardTitle>
              <CardDescription>
                How AI tools are used across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {departmentData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} hours`, 'Usage']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select at least one tool to view department usage
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Task Success Rate</CardTitle>
              <CardDescription>
                Success rate for different AI task types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={aiTasksData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                    <Legend />
                    <Bar dataKey="successRate" name="Success Rate (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsageMetrics;
