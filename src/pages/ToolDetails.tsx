
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Clock, CalendarIcon, User, MessageSquare, AlertTriangle } from "lucide-react";
import { toolRequestsData } from "@/lib/mockData";
import { ToolStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function ToolDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const tool = toolRequestsData.find(t => t.id === id);
  
  const [status, setStatus] = useState<ToolStatus>(tool?.status || "requested");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!tool) {
    return (
      <DashboardLayout title="Tool Not Found">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Tool Not Found</h2>
          <p className="text-muted-foreground mb-4">The tool you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/tools")}>
            Return to Tool Management
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
  
  const handleStatusChange = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Status updated",
        description: `Tool status has been updated to ${status}`,
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a review comment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Your review has been recorded"
      });
      setReviewComment("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <DashboardLayout
      title={tool.name}
      subtitle={`${tool.category} | Requested by ${tool.requestedBy}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/tools")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews & Comments</TabsTrigger>
              {(tool.status === "active" || tool.status === "deprecated") && (
                <TabsTrigger value="usage" className="flex-1">Usage Statistics</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tool Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tool.description}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Use Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tool.useCase}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Estimated Monthly Cost</p>
                      <p className="text-xl font-medium">${tool.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Estimated Monthly Savings</p>
                      <p className="text-xl font-medium text-emerald-600">${tool.estimatedSavings.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Estimated ROI</p>
                      <p className="text-xl font-medium text-blue-600">{tool.estimatedRoi}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4 pt-4">
              {tool.reviewComments && tool.reviewComments.length > 0 ? (
                <div className="space-y-4">
                  {tool.reviewComments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {comment.userName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{comment.userName}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </p>
                            </div>
                            <p className="mt-2">{comment.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-6">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <h3 className="text-lg font-medium">No reviews yet</h3>
                      <p className="text-muted-foreground">
                        Be the first to review this tool request
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Review Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview}>
                    <Textarea
                      placeholder="Enter your review or comment..."
                      className="mb-4"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {(tool.status === "active" || tool.status === "deprecated") && (
              <TabsContent value="usage" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Usage Statistics</CardTitle>
                    <CardDescription>Tool usage over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Usage data visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                    <div className="flex items-center">{getStatusBadge(tool.status)}</div>
                  </div>
                  
                  <div className="space-y-0.5 text-right">
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-sm">{formatDate(tool.updatedAt)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Update Status</p>
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value as ToolStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="requested">Requested</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full mt-2" onClick={handleStatusChange} disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Status"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Requested By</p>
                  <p>{tool.requestedBy}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p>{tool.department}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Request Date</p>
                  <p>{formatDate(tool.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {tool.reviewers && tool.reviewers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Committee</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.reviewers.map((reviewer, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {reviewer.charAt(0)}
                      </div>
                      <span>{reviewer}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
