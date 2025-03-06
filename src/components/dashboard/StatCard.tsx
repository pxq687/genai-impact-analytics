
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  trend = "neutral",
  change,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline">
          <h3 className="text-2xl font-semibold">{value}</h3>
          {change && (
            <span className={cn("ml-2 text-sm flex items-center", {
              "metric-up": trend === "up",
              "metric-down": trend === "down",
              "metric-neutral": trend === "neutral",
            })}>
              {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
              {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {trend === "neutral" && <MinusIcon className="mr-1 h-3 w-3" />}
              {change}%
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
