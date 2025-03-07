
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { 
  BellIcon, 
  CalendarIcon, 
  Download, 
  Filter, 
  Search, 
  UserRound,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { aiToolsList } from "@/lib/data";
import { useState } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  selectedTools?: string[];
  onToolsChange?: (tools: string[]) => void;
}

export function Header({ 
  title, 
  subtitle, 
  actions, 
  selectedTools = [], 
  onToolsChange 
}: HeaderProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  
  const handleToolToggle = (toolId: string) => {
    if (!onToolsChange) return;
    
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter(id => id !== toolId));
    } else {
      onToolsChange([...selectedTools, toolId]);
    }
  };
  
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-input bg-background pl-8 h-9 w-64 text-sm"
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Last 30 days</span>
          </Button>
          
          {onToolsChange && (
            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">GenAI Tools</span>
                  {selectedTools.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedTools.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by AI Tool</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-auto">
                  {aiToolsList.map((tool) => (
                    <DropdownMenuCheckboxItem
                      key={tool.id}
                      checked={selectedTools.includes(tool.id)}
                      onCheckedChange={() => handleToolToggle(tool.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{tool.name}</span>
                        {selectedTools.includes(tool.id) && <Check className="h-4 w-4 ml-2" />}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="relative">
            <BellIcon className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserRound className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Reports</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {actions}
        </div>
      </div>
    </div>
  );
}
