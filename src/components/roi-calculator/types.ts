export interface CalculatorInputs {
  // Business Information
  monthlyRevenue: number;
  averageOrderValue: number;
  emailListSize: number;

  // Email Marketing Metrics
  emailsPerMonth: number;
  openRate: number;
  clickThroughRate: number;
  conversionRate: number;
  deliverability: number;
  newSubscribersPerMonth: number;

  // Marketing Costs
  emailMarketingCosts: number;
  staffHours: number;
  hourlyRate: number;

  // Brevo Features
  features: {
    multiChannel: boolean;
    aiContent: boolean;
    automation: boolean;
    segmentation: boolean;
    abTesting: boolean;
  };
}

export interface CalculatorResults {
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  totalMonthlyCosts: number;
  monthlyROI: number;
  monthlyROIPercentage: number;
  annualROI: number;
  revenueIncrease: number;
  costSavings: number;
  conversions: number;
  improvements: {
    openRate: number;
    clickThroughRate: number;
    conversionRate: number;
    deliverability: number;
  };
  currentMetrics: {
    openRate: number;
    clickThroughRate: number;
    conversionRate: number;
    deliverability: number;
    conversions: number;
  };
}

export interface IndustryBenchmarks {
  [key: string]: {
    openRate: number;
    clickThroughRate: number;
    conversionRate: number;
    deliverability: number;
    averageROI: number;
  };
}