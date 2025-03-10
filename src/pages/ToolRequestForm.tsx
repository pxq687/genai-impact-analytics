
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ToolRequestForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    estimatedCost: "",
    estimatedSavings: "",
    department: "",
    useCase: ""
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
    
    // Validate form
    if (!formData.name || !formData.description || !formData.category || 
        !formData.estimatedCost || !formData.estimatedSavings || 
        !formData.department || !formData.useCase) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Calculate estimated ROI
    const cost = parseFloat(formData.estimatedCost);
    const savings = parseFloat(formData.estimatedSavings);
    
    if (isNaN(cost) || isNaN(savings)) {
      toast({
        title: "Error",
        description: "Cost and savings must be valid numbers",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request submitted",
        description: "Your tool request has been submitted for review",
      });
      setIsSubmitting(false);
      navigate("/tools");
    }, 1500);
  };
  
  return (
    <DashboardLayout
      title="Request New GenAI Tool"
      subtitle="Submit a request for a new AI tool to be added to the organization"
      actions={
        <Button variant="outline" onClick={() => navigate("/tools")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Button>
      }
    >
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>New Tool Request</CardTitle>
          <CardDescription>
            Provide details about the GenAI tool you'd like to implement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tool Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., ChatGPT, Midjourney"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Text Generation">Text Generation</SelectItem>
                      <SelectItem value="Image Generation">Image Generation</SelectItem>
                      <SelectItem value="Code Generation">Code Generation</SelectItem>
                      <SelectItem value="Video Generation">Video Generation</SelectItem>
                      <SelectItem value="Audio Generation">Audio Generation</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the tool and its capabilities"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Monthly Cost ($)</Label>
                  <Input
                    id="estimatedCost"
                    name="estimatedCost"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedSavings">Estimated Monthly Savings ($)</Label>
                  <Input
                    id="estimatedSavings"
                    name="estimatedSavings"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.estimatedSavings}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  placeholder="Describe how this tool will be used and what problems it will solve"
                  rows={4}
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate("/tools")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
