
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  type: "area" | "bar" | "line" | "pie";
  dataKeys: {
    x: string;
    y: string | string[];
  };
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
  height?: number;
}

const defaultColors = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#6B7280"];

export function ChartCard({
  title,
  description,
  data,
  type,
  dataKeys,
  colors = defaultColors,
  className,
  valueFormatter = (value) => `${value}`,
  height = 300,
}: ChartCardProps) {
  const renderChart = () => {
    if (type === "area") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {Array.isArray(dataKeys.y) ? (
                dataKeys.y.map((key, index) => (
                  <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
                  </linearGradient>
                ))
              ) : (
                <linearGradient id={`color-${dataKeys.y}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <XAxis dataKey={dataKeys.x} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={valueFormatter} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), '']}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            {Array.isArray(dataKeys.y) ? (
              dataKeys.y.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#color-${key})`}
                />
              ))
            ) : (
              <Area
                type="monotone"
                dataKey={dataKeys.y}
                stroke={colors[0]}
                fillOpacity={1}
                fill={`url(#color-${dataKeys.y})`}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey={dataKeys.x} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={valueFormatter} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), '']}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            {Array.isArray(dataKeys.y) ? (
              dataKeys.y.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar dataKey={dataKeys.y} fill={colors[0]} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (type === "line") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey={dataKeys.x} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={valueFormatter} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), '']}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            {Array.isArray(dataKeys.y) ? (
              dataKeys.y.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={dataKeys.y}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey={Array.isArray(dataKeys.y) ? dataKeys.y[0] : dataKeys.y}
              nameKey={dataKeys.x}
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), '']}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        {renderChart()}
      </CardContent>
    </Card>
  );
}
