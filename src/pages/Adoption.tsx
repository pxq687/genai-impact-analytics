
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { adoptionRateData, toolUsageData, aiToolsList, departmentUsageData } from "@/lib/data";
import { ToolFilter } from "@/components/dashboard/ToolFilter";

const Adoption = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    aiToolsList.slice(0, 5).map(tool => tool.id)
  );
  
  // Filter data based on selected tools
  const filteredData = selectedTools.length > 0 
    ? toolUsageData.filter(tool => selectedTools.includes(tool.id))
    : toolUsageData;
  
  // Calculate adoption rates by department for selected tools
  const departmentAdoption = departmentUsageData.map(dept => {
    // Find tools that are used in this department
    const toolsInDept = filteredData.filter(tool => 
      tool.departments.includes(dept.name)
    );
    
    // Sum user counts for these tools
    const userCount = toolsInDept.reduce((sum, tool) => sum + tool.userCount, 0);
    
    return {
      name: dept.name,
      adoptionRate: dept.value,
      userCount
    };
  });
  
  // Calculate the combined ROI color for each tool category
  const categoryColors = {
    "Text Generation": "#8884d8",
    "Image Generation": "#82ca9d",
    "Code Generation": "#ffc658",
    "Content Creation": "#ff8042"
  };
  
  return (
    <DashboardLayout 
      title="User Adoption" 
      subtitle="Track and analyze how users are adopting AI tools"
    >
      <div className="space-y-6">
        {/* Tool Filter */}
        <div className="mb-6">
          <ToolFilter 
            selectedTools={selectedTools} 
            onToolsChange={setSelectedTools} 
          />
        </div>
        
        {/* Adoption Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overall Adoption Trend</CardTitle>
              <CardDescription>
                Weekly active and new users across all tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={adoptionRateData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      name="Active Users" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="newUsers" 
                      name="New Users" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalUsers" 
                      name="Total Users" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Count by Tool Category</CardTitle>
              <CardDescription>
                Distribution of users across AI tool categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {filteredData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="userCount" name="Active Users" fill="#8884d8">
                        {filteredData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={categoryColors[entry.category as keyof typeof categoryColors]} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select at least one tool to view user distribution
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Department Adoption and Tool Analysis */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Adoption by Department</CardTitle>
              <CardDescription>
                Percentage of employees using AI tools per department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentAdoption}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'adoptionRate') return [`${value}%`, 'Adoption Rate'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="adoptionRate" name="Adoption Rate (%)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>
                Key engagement metrics for selected AI tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredData.length > 0 ? (
                <div className="space-y-4">
                  {filteredData.map(tool => (
                    <div key={tool.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{tool.name}</h3>
                        <span className="text-sm text-muted-foreground">{tool.category}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-secondary rounded-md p-2">
                          <p className="text-xs text-muted-foreground">Users</p>
                          <p className="text-lg font-semibold">{tool.userCount}</p>
                        </div>
                        <div className="bg-secondary rounded-md p-2">
                          <p className="text-xs text-muted-foreground">Hours/User</p>
                          <p className="text-lg font-semibold">
                            {(tool.usageHours / tool.userCount).toFixed(1)}
                          </p>
                        </div>
                        <div className="bg-secondary rounded-md p-2">
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className="text-lg font-semibold">{tool.roi}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  Select at least one tool to view engagement metrics
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Adoption;
