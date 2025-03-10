
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Star, Search, Filter, BarChart3 } from "lucide-react";
import { surveyResultsData } from "@/lib/mockData";
import { aiToolsList } from "@/lib/data";
import { SurveyResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Surveys() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToolId, setSelectedToolId] = useState<string>("all");
  const [openNewSurvey, setOpenNewSurvey] = useState(false);
  
  // Filter surveys based on search and tool filter
  const filteredSurveys = surveyResultsData.filter(survey => {
    const matchesSearch = survey.feedback.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         survey.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTool = selectedToolId === "all" || survey.toolId === selectedToolId;
    
    return matchesSearch && matchesTool;
  });
  
  // Calculate average ratings for selected surveys
  const calculateAverages = () => {
    if (filteredSurveys.length === 0) return { satisfaction: 0, usability: 0, efficiency: 0 };
    
    const totals = filteredSurveys.reduce((acc, survey) => {
      return {
        satisfaction: acc.satisfaction + survey.satisfaction,
        usability: acc.usability + survey.usability,
        efficiency: acc.efficiency + survey.efficiency
      };
    }, { satisfaction: 0, usability: 0, efficiency: 0 });
    
    return {
      satisfaction: parseFloat((totals.satisfaction / filteredSurveys.length).toFixed(1)),
      usability: parseFloat((totals.usability / filteredSurveys.length).toFixed(1)),
      efficiency: parseFloat((totals.efficiency / filteredSurveys.length).toFixed(1))
    };
  };
  
  const averages = calculateAverages();
  
  // Get rating distribution
  const getRatingDistribution = (metric: 'satisfaction' | 'usability' | 'efficiency') => {
    const distribution = [0, 0, 0, 0, 0]; // For ratings 1-5
    
    filteredSurveys.forEach(survey => {
      const rating = survey[metric];
      if (rating >= 1 && rating <= 5) {
        distribution[rating - 1]++;
      }
    });
    
    return distribution;
  };
  
  return (
    <DashboardLayout
      title="User Surveys"
      subtitle="Collect and analyze user feedback on GenAI tools"
      actions={
        <Dialog open={openNewSurvey} onOpenChange={setOpenNewSurvey}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Survey Response
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Survey Response</DialogTitle>
              <DialogDescription>
                Enter a new user's feedback on an AI tool
              </DialogDescription>
            </DialogHeader>
            <SurveyForm onClose={() => setOpenNewSurvey(false)} />
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedToolId} onValueChange={setSelectedToolId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                {aiToolsList.map(tool => (
                  <SelectItem key={tool.id} value={tool.id}>{tool.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Overall Satisfaction
              </CardTitle>
              <CardDescription>Average user satisfaction score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{averages.satisfaction}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averages.satisfaction)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {filteredSurveys.length} responses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Usability Rating
              </CardTitle>
              <CardDescription>How easy tools are to use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{averages.usability}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averages.usability)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {filteredSurveys.length} responses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Efficiency Impact
              </CardTitle>
              <CardDescription>Productivity improvement score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{averages.efficiency}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averages.efficiency)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {filteredSurveys.length} responses
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="feedback">
          <TabsList>
            <TabsTrigger value="feedback">User Feedback</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feedback" className="pt-4">
            {filteredSurveys.length > 0 ? (
              <div className="space-y-4">
                {filteredSurveys.map(survey => {
                  const tool = aiToolsList.find(t => t.id === survey.toolId);
                  
                  return (
                    <Card key={survey.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">
                              Feedback on {tool?.name || "Unknown Tool"}
                            </CardTitle>
                            <CardDescription>
                              By {survey.userName} on {new Date(survey.createdAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= survey.satisfaction
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{survey.feedback}</p>
                        
                        <div className="grid grid-cols-2 mt-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Usability</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= survey.usability
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Efficiency</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= survey.efficiency
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No survey responses found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    Try adjusting your search or filter criteria, or add a new survey response.
                  </p>
                  <Button onClick={() => setOpenNewSurvey(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Survey Response
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="analysis" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Satisfaction Distribution</CardTitle>
                  <CardDescription>Distribution of user satisfaction ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getRatingDistribution('satisfaction').map((count, index) => {
                      const rating = index + 1;
                      const percentage = filteredSurveys.length > 0 
                        ? Math.round((count / filteredSurveys.length) * 100) 
                        : 0;
                      
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-12 text-sm">{rating} Stars</div>
                          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="w-10 text-sm font-medium text-right">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tool Comparison</CardTitle>
                  <CardDescription>How different AI tools are rated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiToolsList.filter(tool => {
                      return surveyResultsData.some(survey => survey.toolId === tool.id);
                    }).map(tool => {
                      const toolSurveys = surveyResultsData.filter(survey => survey.toolId === tool.id);
                      const avgSatisfaction = toolSurveys.reduce((sum, survey) => sum + survey.satisfaction, 0) / toolSurveys.length;
                      
                      return (
                        <div key={tool.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{tool.name}</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= Math.round(avgSatisfaction)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${(avgSatisfaction / 5) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {toolSurveys.length} responses
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface SurveyFormProps {
  onClose: () => void;
}

function SurveyForm({ onClose }: SurveyFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    toolId: "",
    userName: "",
    satisfaction: "3",
    usability: "3",
    efficiency: "3",
    feedback: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.toolId || !formData.userName || !formData.feedback) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Survey response submitted",
        description: "Thank you for your feedback"
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="toolId">AI Tool</Label>
        <Select
          value={formData.toolId}
          onValueChange={(value) => handleSelectChange("toolId", value)}
        >
          <SelectTrigger id="toolId">
            <SelectValue placeholder="Select tool" />
          </SelectTrigger>
          <SelectContent>
            {aiToolsList.map(tool => (
              <SelectItem key={tool.id} value={tool.id}>{tool.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="userName">Your Name</Label>
        <Input
          id="userName"
          name="userName"
          placeholder="John Doe"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Overall Satisfaction</Label>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              type="button"
              variant="outline"
              className={`p-2 ${
                Number(formData.satisfaction) === rating
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => handleSelectChange("satisfaction", rating.toString())}
            >
              <Star
                className={`h-5 w-5 ${
                  Number(formData.satisfaction) >= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : ""
                }`}
              />
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Usability Rating</Label>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              type="button"
              variant="outline"
              className={`p-2 ${
                Number(formData.usability) === rating
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => handleSelectChange("usability", rating.toString())}
            >
              <Star
                className={`h-5 w-5 ${
                  Number(formData.usability) >= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : ""
                }`}
              />
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Efficiency Impact</Label>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              type="button"
              variant="outline"
              className={`p-2 ${
                Number(formData.efficiency) === rating
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => handleSelectChange("efficiency", rating.toString())}
            >
              <Star
                className={`h-5 w-5 ${
                  Number(formData.efficiency) >= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : ""
                }`}
              />
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="feedback">Your Feedback</Label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="Share your experience with this tool..."
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </form>
  );
}
