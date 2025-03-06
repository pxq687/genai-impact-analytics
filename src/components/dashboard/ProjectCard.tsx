
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  status: "Live" | "In Progress" | "Planning";
  roi: number | null;
  costs: number;
  savings: number | null;
  className?: string;
}

export function ProjectCard({
  name,
  status,
  roi,
  costs,
  savings,
  className,
}: ProjectCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Live":
        return "bg-ai-green/10 text-ai-green border-ai-green/30";
      case "In Progress":
        return "bg-ai-blue/10 text-ai-blue border-ai-blue/30";
      case "Planning":
        return "bg-ai-purple/10 text-ai-purple border-ai-purple/30";
      default:
        return "bg-ai-gray/10 text-ai-gray border-ai-gray/30";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const progress = savings ? Math.min(100, Math.round((savings / costs) * 100)) : 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <Badge variant="outline" className={cn("font-normal", getStatusColor())}>
            {status}
          </Badge>
        </div>
        <CardDescription>
          Investment: {formatCurrency(costs)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-6 pt-2">
        {roi !== null ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">ROI</span>
              <span className="text-sm font-medium text-ai-green">{roi}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Cost</span>
              <span>Savings: {savings ? formatCurrency(savings) : '$0'}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">ROI</span>
              <span className="text-sm font-medium text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Cost</span>
              <span>Savings: Projected</span>
            </div>
            <Progress value={10} className="h-2 animate-pulse-slow" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
