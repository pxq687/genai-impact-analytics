
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ArrowUpRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toolRequestsData } from "@/lib/mockData";
import { ToolRequest, ToolStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";

export default function ToolLifecycle() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ToolStatus | "all">("all");
  
  // Filter tools based on search term and status
  const filteredTools = toolRequestsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || tool.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get counts for different statuses
  const getCountByStatus = (status: ToolStatus) => {
    return toolRequestsData.filter(tool => tool.status === status).length;
  };
  
  // Function to get the appropriate badge for a tool status
  const getStatusBadge = (status: ToolStatus) => {
    switch(status) {
      case "requested":
        return <Badge variant="outline">Requested</Badge>;
      case "under_review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "active":
        return <Badge variant="default" className="bg-green-600">Active</Badge>;
      case "deprecated":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Deprecated</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <DashboardLayout
      title="Tool Lifecycle Management"
      subtitle="Request, review, and manage GenAI tools across the organization"
      actions={
        <Button asChild>
          <Link to="/tools/request">
            <PlusCircle className="mr-2 h-4 w-4" />
            Request New Tool
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-auto" onValueChange={(value) => setStatusFilter(value as ToolStatus | "all")}>
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">{toolRequestsData.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="requested">
                Requested
                <Badge variant="secondary" className="ml-2">{getCountByStatus("requested")}</Badge>
              </TabsTrigger>
              <TabsTrigger value="under_review">
                Review
                <Badge variant="secondary" className="ml-2">{getCountByStatus("under_review")}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
                <Badge variant="secondary" className="ml-2">{getCountByStatus("active")}</Badge>
              </TabsTrigger>
              <TabsTrigger value="deprecated">
                Deprecated
                <Badge variant="secondary" className="ml-2">{getCountByStatus("deprecated")}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <div className="col-span-full flex justify-center py-10">
              <div className="text-center space-y-2">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">No tools found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

interface ToolCardProps {
  tool: ToolRequest;
}

function ToolCard({ tool }: ToolCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Use the getStatusBadge function to get the appropriate badge
  const getStatusBadge = (status: ToolStatus) => {
    switch(status) {
      case "requested":
        return <Badge variant="outline">Requested</Badge>;
      case "under_review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "active":
        return <Badge variant="default" className="bg-green-600">Active</Badge>;
      case "deprecated":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Deprecated</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{tool.name}</CardTitle>
            <CardDescription>{tool.category}</CardDescription>
          </div>
          {getStatusBadge(tool.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{tool.description}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Department</p>
            <p className="text-sm">{tool.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Requester</p>
            <p className="text-sm">{tool.requestedBy}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Requested Date</p>
            <p className="text-sm">{formatDate(tool.createdAt)}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Est. Monthly Cost</p>
            <p className="text-base font-medium">${tool.estimatedCost.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Est. Monthly Savings</p>
            <p className="text-base font-medium text-emerald-600">${tool.estimatedSavings.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Est. ROI</p>
            <p className="text-base font-medium text-blue-600">{tool.estimatedRoi}%</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" asChild>
            <Link to={`/tools/${tool.id}`}>
              View Details
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
