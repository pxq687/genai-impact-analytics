
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toolUsageByMonth, aiToolsList } from "@/lib/data";

interface ToolUsageChartProps {
  selectedTools: string[];
}

export function ToolUsageChart({ selectedTools }: ToolUsageChartProps) {
  // Get tool names from IDs
  const selectedToolNames = selectedTools.length > 0
    ? selectedTools.map(id => {
        const tool = aiToolsList.find(t => t.id === id);
        return tool?.name;
      }).filter(Boolean) as string[]
    : ["ChatGPT", "Claude", "GitHub Copilot", "DALL_E", "Midjourney"].slice(0, 3);
  
  // Colors for the chart lines
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57", "#83a6ed", "#8dd1e1"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Trends</CardTitle>
        <CardDescription>
          Monthly usage hours by AI tool
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={toolUsageByMonth}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedToolNames.map((tool, index) => {
                const key = tool.replace(/\s+/g, '_').replace(/-/g, '_');
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={tool === "DALL_E" ? "DALL_E" : tool}
                    stroke={colors[index % colors.length]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
