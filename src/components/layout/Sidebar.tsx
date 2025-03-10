
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  BarChart3, ChartPieIcon, GaugeCircle, 
  LayoutDashboard, LineChart, Settings, Sparkles, 
  TrendingUp, Users2, LifeBuoy, ClipboardList
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/",
  },
  {
    title: "ROI Analysis",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/roi",
  },
  {
    title: "Cost Tracking",
    icon: <GaugeCircle className="h-5 w-5" />,
    href: "/costs",
  },
  {
    title: "Usage Metrics",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/usage",
  },
  {
    title: "AI Performance",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/performance",
  },
  {
    title: "User Adoption",
    icon: <Users2 className="h-5 w-5" />,
    href: "/adoption",
  },
  {
    title: "Tool Lifecycle",
    icon: <LifeBuoy className="h-5 w-5" />,
    href: "/tools",
  },
  {
    title: "User Surveys",
    icon: <ClipboardList className="h-5 w-5" />,
    href: "/surveys",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={cn("pb-12 w-64 bg-card border-r", className)}>
      <div className="py-4 px-4 space-y-4">
        <div className="px-2 py-2">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight flex items-center gap-2">
            <ChartPieIcon className="h-6 w-6 text-primary" />
            <span className="text-gradient">GenAI Impact</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Analytics & ROI Dashboard
          </p>
        </div>
        <Separator />
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={currentPath === item.href ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start", 
                currentPath === item.href 
                  ? "bg-secondary font-medium" 
                  : "font-normal"
              )}
              asChild
            >
              <Link to={item.href}>
                <span className="mr-2">{item.icon}</span>
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
        <Separator />
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </Button>
        <div className="px-3 py-2 mt-6">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <span className="font-medium">Need Help?</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              View documentation and tutorials for maximizing your GenAI ROI
            </p>
            <Button className="w-full mt-2" size="sm">View Resources</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
