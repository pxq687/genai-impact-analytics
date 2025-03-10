
// GenAI Tool Status
export type ToolStatus = 'requested' | 'under_review' | 'approved' | 'rejected' | 'active' | 'deprecated';

// GenAI Tool Request
export interface ToolRequest {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedCost: number;
  estimatedSavings: number;
  estimatedRoi: number;
  requestedBy: string;
  department: string;
  useCase: string;
  status: ToolStatus;
  createdAt: string;
  updatedAt: string;
  reviewers?: string[];
  reviewComments?: ReviewComment[];
}

// Review Comment
export interface ReviewComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

// User Survey
export interface SurveyResult {
  id: string;
  toolId: string;
  userId: string;
  userName: string;
  satisfaction: number; // 1-5 scale
  usability: number; // 1-5 scale
  efficiency: number; // 1-5 scale
  feedback: string;
  createdAt: string;
}
