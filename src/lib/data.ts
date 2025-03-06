// Mock data for dashboard
export const kpiData = [
  {
    id: "total-cost-savings",
    title: "Total Cost Savings",
    value: "$432,800",
    change: 12.4,
    trend: "up",
    description: "vs. previous period",
  },
  {
    id: "productivity-gain",
    title: "Productivity Gain",
    value: "28.5%",
    change: 5.2,
    trend: "up",
    description: "employee efficiency",
  },
  {
    id: "time-saved",
    title: "Time Saved",
    value: "1,285",
    change: 18.6,
    trend: "up",
    description: "hours per month",
  },
  {
    id: "roi",
    title: "ROI",
    value: "347%",
    change: 22.1,
    trend: "up",
    description: "return on AI investment",
  },
];

export const costBreakdownData = [
  { name: "Development", value: 125000 },
  { name: "Infrastructure", value: 85000 },
  { name: "Licensing", value: 110000 },
  { name: "Training", value: 65000 },
  { name: "Maintenance", value: 45000 },
];

export const timeSeriesData = [
  {
    name: "Jan",
    savings: 42000,
    costs: 78000,
  },
  {
    name: "Feb",
    savings: 52000,
    costs: 80000,
  },
  {
    name: "Mar",
    savings: 68000,
    costs: 82500,
  },
  {
    name: "Apr",
    savings: 95000,
    costs: 84000,
  },
  {
    name: "May",
    savings: 115000,
    costs: 85000,
  },
  {
    name: "Jun",
    savings: 162500,
    costs: 87500,
  },
  {
    name: "Jul",
    savings: 189000,
    costs: 88000,
  },
  {
    name: "Aug",
    savings: 212000,
    costs: 88000,
  },
  {
    name: "Sep",
    savings: 258000,
    costs: 89500,
  },
  {
    name: "Oct",
    savings: 321000,
    costs: 91000,
  },
  {
    name: "Nov",
    savings: 394500,
    costs: 92500,
  },
  {
    name: "Dec",
    savings: 432800,
    costs: 94000,
  },
];

export const departmentUsageData = [
  { name: "Customer Service", value: 32 },
  { name: "Marketing", value: 24 },
  { name: "Product", value: 18 },
  { name: "Operations", value: 16 },
  { name: "HR", value: 6 },
  { name: "Finance", value: 4 },
];

export const adoptionRateData = [
  {
    name: "Week 1",
    newUsers: 12,
    activeUsers: 12,
    totalUsers: 12,
  },
  {
    name: "Week 2",
    newUsers: 18,
    activeUsers: 24,
    totalUsers: 30,
  },
  {
    name: "Week 3",
    newUsers: 22,
    activeUsers: 42,
    totalUsers: 52,
  },
  {
    name: "Week 4",
    newUsers: 26,
    activeUsers: 58,
    totalUsers: 78,
  },
  {
    name: "Week 5",
    newUsers: 24,
    activeUsers: 74,
    totalUsers: 102,
  },
  {
    name: "Week 6",
    newUsers: 30,
    activeUsers: 98,
    totalUsers: 132,
  },
  {
    name: "Week 7",
    newUsers: 32,
    activeUsers: 110,
    totalUsers: 164,
  },
  {
    name: "Week 8",
    newUsers: 38,
    activeUsers: 135,
    totalUsers: 202,
  },
];

export const aiToolsList = [
  { id: "t1", name: "ChatGPT", category: "Text Generation" },
  { id: "t2", name: "Claude", category: "Text Generation" },
  { id: "t3", name: "DALL-E", category: "Image Generation" },
  { id: "t4", name: "Midjourney", category: "Image Generation" },
  { id: "t5", name: "GitHub Copilot", category: "Code Generation" },
  { id: "t6", name: "Bard", category: "Text Generation" },
  { id: "t7", name: "Stable Diffusion", category: "Image Generation" },
  { id: "t8", name: "Jasper", category: "Content Creation" }
];

export const toolUsageData = [
  { 
    id: "t1", 
    name: "ChatGPT", 
    category: "Text Generation",
    usageHours: 453,
    costPerMonth: 12500,
    savingsPerMonth: 38500,
    roi: 308,
    userCount: 215,
    departments: ["Marketing", "Customer Service", "Product", "Operations"]
  },
  { 
    id: "t2", 
    name: "Claude", 
    category: "Text Generation",
    usageHours: 287,
    costPerMonth: 9800,
    savingsPerMonth: 26400,
    roi: 269,
    userCount: 128,
    departments: ["Marketing", "Customer Service", "Product"]
  },
  { 
    id: "t3", 
    name: "DALL-E", 
    category: "Image Generation",
    usageHours: 164,
    costPerMonth: 7200,
    savingsPerMonth: 22800,
    roi: 316,
    userCount: 76,
    departments: ["Marketing", "Product"]
  },
  { 
    id: "t4", 
    name: "Midjourney", 
    category: "Image Generation",
    usageHours: 142,
    costPerMonth: 6500,
    savingsPerMonth: 19200,
    roi: 295,
    userCount: 58,
    departments: ["Marketing", "Product"]
  },
  { 
    id: "t5", 
    name: "GitHub Copilot", 
    category: "Code Generation",
    usageHours: 386,
    costPerMonth: 8200,
    savingsPerMonth: 53400,
    roi: 651,
    userCount: 92,
    departments: ["Product", "Operations"]
  },
  { 
    id: "t6", 
    name: "Bard", 
    category: "Text Generation",
    usageHours: 156,
    costPerMonth: 5400,
    savingsPerMonth: 14500,
    roi: 268,
    userCount: 84,
    departments: ["Marketing", "Customer Service"]
  },
  { 
    id: "t7", 
    name: "Stable Diffusion", 
    category: "Image Generation",
    usageHours: 98,
    costPerMonth: 3200,
    savingsPerMonth: 8900,
    roi: 278,
    userCount: 42,
    departments: ["Marketing"]
  },
  { 
    id: "t8", 
    name: "Jasper", 
    category: "Content Creation",
    usageHours: 124,
    costPerMonth: 4800,
    savingsPerMonth: 16800,
    roi: 350,
    userCount: 65,
    departments: ["Marketing", "Customer Service"]
  }
];

export const toolUsageByMonth = [
  { month: "Jan", ChatGPT: 280, Claude: 180, "GitHub Copilot": 220, DALL_E: 90, Midjourney: 70 },
  { month: "Feb", ChatGPT: 310, Claude: 200, "GitHub Copilot": 240, DALL_E: 110, Midjourney: 90 },
  { month: "Mar", ChatGPT: 350, Claude: 230, "GitHub Copilot": 270, DALL_E: 130, Midjourney: 100 },
  { month: "Apr", ChatGPT: 380, Claude: 250, "GitHub Copilot": 310, DALL_E: 140, Midjourney: 120 },
  { month: "May", ChatGPT: 410, Claude: 260, "GitHub Copilot": 330, DALL_E: 150, Midjourney: 130 },
  { month: "Jun", ChatGPT: 450, Claude: 280, "GitHub Copilot": 370, DALL_E: 160, Midjourney: 140 }
];

export const aiTasksData = [
  { 
    name: "Content Generation", 
    hours: 320,
    successRate: 93,
  },
  { 
    name: "Data Analysis", 
    hours: 285,
    successRate: 89,
  },
  { 
    name: "Code Generation", 
    hours: 210,
    successRate: 82,
  },
  { 
    name: "Customer Support", 
    hours: 185,
    successRate: 95,
  },
  { 
    name: "Report Writing", 
    hours: 165,
    successRate: 91,
  },
  { 
    name: "Email Drafting", 
    hours: 120,
    successRate: 97,
  },
];

export const insightsData = [
  {
    id: 1,
    title: "Development teams achieving 42% productivity boost",
    description: "Engineering teams using GenAI for code generation have increased output by 42% while reducing bugs.",
    category: "Productivity",
    impact: "high",
  },
  {
    id: 2,
    title: "Content creation costs reduced by 28%",
    description: "Marketing teams leveraging AI assistants have decreased content production costs while increasing output volume.",
    category: "Cost Reduction",
    impact: "medium",
  },
  {
    id: 3,
    title: "Customer support resolution time improved by 35%",
    description: "Support teams using AI to draft responses have seen faster resolution times and higher customer satisfaction.",
    category: "Customer Experience",
    impact: "high",
  },
  {
    id: 4,
    title: "Data analysis cycle shortened by 3 days on average",
    description: "Analytics teams using AI for data preparation and initial analysis have compressed reporting cycles.",
    category: "Efficiency",
    impact: "medium",
  },
];

export const projectsData = [
  {
    id: "p1",
    name: "Customer Service AI Assistant",
    status: "Live",
    roi: 412,
    costs: 85000,
    savings: 350200,
  },
  {
    id: "p2",
    name: "Code Generation Tools",
    status: "Live",
    roi: 325,
    costs: 112000,
    savings: 364000,
  },
  {
    id: "p3",
    name: "Data Analysis Automation",
    status: "Live",
    roi: 280,
    costs: 96500,
    savings: 270200,
  },
  {
    id: "p4",
    name: "Marketing Content Generator",
    status: "In Progress",
    roi: null,
    costs: 78500,
    savings: null,
  },
  {
    id: "p5",
    name: "HR Documentation Assistant",
    status: "Planning",
    roi: null,
    costs: 65000,
    savings: null,
  },
];
