
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BrainCircuit, TrendingUp } from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  category: string;
  impact: "low" | "medium" | "high";
  className?: string;
}

export function InsightCard({
  title,
  description,
  category,
  impact,
  className,
}: InsightCardProps) {
  const getImpactColor = () => {
    switch (impact) {
      case "high":
        return "bg-ai-green/10 text-ai-green border-ai-green/30";
      case "medium":
        return "bg-ai-blue/10 text-ai-blue border-ai-blue/30";
      case "low":
        return "bg-ai-gray/10 text-ai-gray border-ai-gray/30";
      default:
        return "bg-ai-gray/10 text-ai-gray border-ai-gray/30";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-6 space-y-0">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <BrainCircuit className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium leading-tight">{title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-6 pt-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="font-normal">
            {category}
          </Badge>
          <Badge variant="outline" className={cn("font-normal", getImpactColor())}>
            <TrendingUp className="mr-1 h-3 w-3" />
            {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
