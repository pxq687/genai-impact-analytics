
import { useState } from "react";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { aiToolsList } from "@/lib/data";

interface ToolFilterProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

export function ToolFilter({ selectedTools, onToolsChange }: ToolFilterProps) {
  const [open, setOpen] = useState(false);
  
  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter(id => id !== toolId));
    } else {
      onToolsChange([...selectedTools, toolId]);
    }
  };
  
  const handleSelectAll = () => {
    onToolsChange(aiToolsList.map(tool => tool.id));
  };
  
  const handleClearAll = () => {
    onToolsChange([]);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter by AI Tool
            {selectedTools.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedTools.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>AI Tools</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-auto">
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
          <DropdownMenuSeparator />
          <div className="flex px-2 py-1.5 gap-2">
            <Button size="sm" variant="outline" className="flex-1 h-8" onClick={handleClearAll}>
              Clear
            </Button>
            <Button size="sm" className="flex-1 h-8" onClick={handleSelectAll}>
              Select All
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {selectedTools.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTools.map(toolId => {
            const tool = aiToolsList.find(t => t.id === toolId);
            return tool ? (
              <Badge key={tool.id} variant="secondary" className="gap-1">
                {tool.name}
                <button 
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                  onClick={() => handleToolToggle(tool.id)}
                >
                  <span className="sr-only">Remove</span>
                  <Check className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {selectedTools.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
