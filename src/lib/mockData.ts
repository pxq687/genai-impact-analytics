
import { SurveyResult, ToolRequest } from './types';

// Mock data for tool requests
export const toolRequestsData: ToolRequest[] = [
  {
    id: "req1",
    name: "Anthropic Claude 3",
    description: "Latest LLM from Anthropic with advanced reasoning capabilities",
    category: "Text Generation",
    estimatedCost: 15000,
    estimatedSavings: 42000,
    estimatedRoi: 280,
    requestedBy: "Sarah Johnson",
    department: "Product",
    useCase: "Customer query analysis and product documentation generation",
    status: "under_review",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-16T14:20:00Z",
    reviewers: ["Mike Chen", "Lisa Patel"],
    reviewComments: [
      {
        id: "comm1",
        userId: "user123",
        userName: "Mike Chen",
        comment: "Need more details on security compliance",
        createdAt: "2023-06-16T11:20:00Z"
      }
    ]
  },
  {
    id: "req2",
    name: "Synthesia",
    description: "AI video generation platform",
    category: "Video Generation",
    estimatedCost: 9800,
    estimatedSavings: 32500,
    estimatedRoi: 331,
    requestedBy: "Carlos Rodriguez",
    department: "Marketing",
    useCase: "Creating personalized video content for customer engagement",
    status: "requested",
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-10T09:15:00Z"
  },
  {
    id: "req3",
    name: "Notion AI",
    description: "AI assistant for Notion workspace",
    category: "Productivity",
    estimatedCost: 7500,
    estimatedSavings: 19200,
    estimatedRoi: 256,
    requestedBy: "Jennifer Lee",
    department: "Operations",
    useCase: "Internal knowledge base management and documentation",
    status: "approved",
    createdAt: "2023-05-22T14:40:00Z",
    updatedAt: "2023-06-05T11:30:00Z",
    reviewers: ["Mike Chen", "Lisa Patel", "David Wong"],
    reviewComments: [
      {
        id: "comm2",
        userId: "user456",
        userName: "Lisa Patel",
        comment: "Approved - strong ROI and well-defined use case",
        createdAt: "2023-06-01T15:45:00Z"
      }
    ]
  },
  {
    id: "req4",
    name: "Runway Gen-2",
    description: "Advanced video generation and editing AI",
    category: "Video Generation",
    estimatedCost: 12500,
    estimatedSavings: 28000,
    estimatedRoi: 224,
    requestedBy: "Michael Brown",
    department: "Marketing",
    useCase: "Creating product demos and marketing videos",
    status: "rejected",
    createdAt: "2023-05-18T11:20:00Z",
    updatedAt: "2023-06-02T09:30:00Z",
    reviewers: ["Lisa Patel", "David Wong"],
    reviewComments: [
      {
        id: "comm3",
        userId: "user789",
        userName: "David Wong",
        comment: "Rejected - similar functionality already available in existing tools",
        createdAt: "2023-06-02T09:30:00Z"
      }
    ]
  },
  {
    id: "req5",
    name: "Codeium",
    description: "AI code assistant with advanced capabilities",
    category: "Code Generation",
    estimatedCost: 8900,
    estimatedSavings: 46000,
    estimatedRoi: 517,
    requestedBy: "Alex Zhang",
    department: "Engineering",
    useCase: "Code completion and documentation for development teams",
    status: "active",
    createdAt: "2023-04-12T10:15:00Z",
    updatedAt: "2023-05-01T16:20:00Z"
  },
  {
    id: "req6",
    name: "OpenAI GPT-3",
    description: "Legacy text generation model",
    category: "Text Generation",
    estimatedCost: 12000,
    estimatedSavings: 36000,
    estimatedRoi: 300,
    requestedBy: "Emily Wilson",
    department: "Customer Service",
    useCase: "Automated email responses and customer support",
    status: "deprecated",
    createdAt: "2022-05-10T09:30:00Z",
    updatedAt: "2023-06-01T14:20:00Z"
  }
];

// Mock data for survey results
export const surveyResultsData: SurveyResult[] = [
  {
    id: "sur1",
    toolId: "t1", // ChatGPT
    userId: "user123",
    userName: "Mike Chen",
    satisfaction: 4,
    usability: 5,
    efficiency: 4,
    feedback: "Very useful for drafting emails and summarizing documents. Would be better with more domain-specific knowledge.",
    createdAt: "2023-06-10T11:30:00Z"
  },
  {
    id: "sur2",
    toolId: "t1", // ChatGPT
    userId: "user456",
    userName: "Lisa Patel",
    satisfaction: 5,
    usability: 4,
    efficiency: 5,
    feedback: "Excellent tool for brainstorming and content creation. Has significantly improved my productivity.",
    createdAt: "2023-06-11T09:15:00Z"
  },
  {
    id: "sur3",
    toolId: "t2", // Claude
    userId: "user789",
    userName: "David Wong",
    satisfaction: 4,
    usability: 3,
    efficiency: 4,
    feedback: "Good reasoning capabilities but sometimes struggles with complex instructions.",
    createdAt: "2023-06-09T14:20:00Z"
  },
  {
    id: "sur4",
    toolId: "t5", // GitHub Copilot
    userId: "user101",
    userName: "Alex Zhang",
    satisfaction: 5,
    usability: 5,
    efficiency: 5,
    feedback: "Game changer for development. Saves hours of coding time each week.",
    createdAt: "2023-06-08T16:45:00Z"
  },
  {
    id: "sur5",
    toolId: "t3", // DALL-E
    userId: "user202",
    userName: "Jennifer Lee",
    satisfaction: 4,
    usability: 4,
    efficiency: 3,
    feedback: "Great for generating quick concept images, but sometimes requires multiple attempts to get the right output.",
    createdAt: "2023-06-07T10:30:00Z"
  },
  {
    id: "sur6",
    toolId: "t5", // GitHub Copilot
    userId: "user303",
    userName: "Carlos Rodriguez",
    satisfaction: 4,
    usability: 4,
    efficiency: 5,
    feedback: "Has significantly sped up our development process. Occasionally suggests deprecated approaches.",
    createdAt: "2023-06-12T15:20:00Z"
  }
];
