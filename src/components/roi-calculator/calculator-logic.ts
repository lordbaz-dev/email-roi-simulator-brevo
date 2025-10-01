import { CalculatorInputs, CalculatorResults } from './types';

// Benchmarks réalistes 2025 - Source: Guide ROI Email + SMS
const EMAIL_BENCHMARKS = {
  openRate: 25,           // 15-35% moyenne sectorielle
  clickThroughRate: 4,    // 1.5-6.5% moyenne sectorielle
  conversionRate: 15,     // 5-25% moyenne sectorielle
  deliverability: 95      // Taux de délivrabilité standard
};

const SMS_BENCHMARKS = {
  openRate: 98,           // 98% taux d'ouverture SMS
  clickThroughRate: 12,   // 8-16% taux de clic SMS
  conversionRate: 32,     // 25-40% taux de conversion SMS
  deliverability: 99      // Quasi 100% de délivrabilité SMS
};

// Synergies observées Email + SMS (basé sur le PDF)
const EMAIL_SMS_SYNERGIES = {
  reachBoost: 25,              // +25% reach vs email seul
  openRateBoost: 15,           // +15% taux d'ouverture composite
  clickRateBoost: 35,          // +35% taux de clic composite
  conversionRateBoost: 40      // +40% taux de conversion composite
};

// Améliorations Brevo par feature (plus réalistes)
const BREVO_IMPROVEMENTS = {
  openRate: 3,           // Amélioration conservative
  clickRate: 8,          // Amélioration conservative
  conversionRate: 10,    // Amélioration conservative
  deliverability: 2      // Amélioration conservative
};

export function calculateFeatureImprovements(inputs: CalculatorInputs) {
  let openRateImprovement = 0;
  let clickThroughImprovement = 0;
  let conversionRateImprovement = 0;
  let deliverabilityImprovement = 0;

  // Base Brevo improvements (réalistes)
  openRateImprovement = 3;
  clickThroughImprovement = 8;
  conversionRateImprovement = 10;
  deliverabilityImprovement = 2;

  if (inputs.features.aiContent) {
    openRateImprovement += 2;
  }

  if (inputs.features.automation) {
    conversionRateImprovement += 5;
  }

  if (inputs.features.segmentation) {
    clickThroughImprovement += 3;
    conversionRateImprovement += 3;
  }

  if (inputs.features.abTesting) {
    openRateImprovement += 2;
    clickThroughImprovement += 2;
    conversionRateImprovement += 2;
  }

  return {
    openRateImprovement,
    clickThroughImprovement,
    conversionRateImprovement,
    deliverabilityImprovement
  };
}

function validateInputs(inputs: CalculatorInputs): CalculatorInputs {
  return {
    ...inputs,
    emailListSize: Math.min(Math.max(inputs.emailListSize, 100), 1000000),
    monthlyRevenue: Math.min(Math.max(inputs.monthlyRevenue, 1000), 1000000),
    averageOrderValue: Math.min(Math.max(inputs.averageOrderValue, 10), 1000),
    emailsPerMonth: Math.min(Math.max(inputs.emailsPerMonth, 1), 30),
    emailMarketingCosts: Math.min(Math.max(inputs.emailMarketingCosts, 50), 50000),
    openRate: Math.min(Math.max(inputs.openRate, 10), 80),
    clickThroughRate: Math.min(Math.max(inputs.clickThroughRate, 0.5), 10),
    conversionRate: Math.min(Math.max(inputs.conversionRate, 0.5), 8),
    deliverability: Math.min(Math.max(inputs.deliverability, 70), 98)
  };
}

function calculateRealisticROI(inputs: CalculatorInputs): CalculatorResults {
  const validatedInputs = validateInputs(inputs);
  const useSMS = validatedInputs.features.multiChannel;

  // BASE: Monthly Revenue (point de départ fourni par l'utilisateur)
  const currentMonthlyRevenue = validatedInputs.monthlyRevenue;

  // CALCUL conversions actuelles basées sur le revenu
  const emailsDelivered = validatedInputs.emailListSize * validatedInputs.emailsPerMonth * (validatedInputs.deliverability / 100);
  const emailOpened = emailsDelivered * (validatedInputs.openRate / 100);
  const emailClicked = emailOpened * (validatedInputs.clickThroughRate / 100);
  const emailConversions = emailClicked * (validatedInputs.conversionRate / 100);

  // CALCUL AVEC BREVO (Email amélioré)
  let brevoOpenRate = validatedInputs.openRate;
  let brevoClickRate = validatedInputs.clickThroughRate;
  let brevoConversionRate = validatedInputs.conversionRate;
  let brevoDeliverability = validatedInputs.deliverability;

  // Améliorations features Brevo (multiplicatives)
  const improvements = calculateFeatureImprovements(validatedInputs);
  brevoOpenRate = Math.min(brevoOpenRate * (1 + improvements.openRateImprovement / 100), 60);
  brevoClickRate = Math.min(brevoClickRate * (1 + improvements.clickThroughImprovement / 100), 15);
  brevoConversionRate = Math.min(brevoConversionRate * (1 + improvements.conversionRateImprovement / 100), 40);
  brevoDeliverability = Math.min(brevoDeliverability * (1 + improvements.deliverabilityImprovement / 100), 99);

  // Calcul du facteur d'amélioration global du funnel email
  const currentFunnelRate = (validatedInputs.deliverability / 100) * (validatedInputs.openRate / 100) * (validatedInputs.clickThroughRate / 100) * (validatedInputs.conversionRate / 100);
  const brevoFunnelRate = (brevoDeliverability / 100) * (brevoOpenRate / 100) * (brevoClickRate / 100) * (brevoConversionRate / 100);
  const emailImprovementFactor = brevoFunnelRate / currentFunnelRate;

  // Revenu email amélioré = revenu actuel × facteur d'amélioration
  let projectedMonthlyRevenue = currentMonthlyRevenue * emailImprovementFactor;

  // CALCUL SMS (si activé)
  let smsRevenue = 0;
  let brevoEmailConversions = emailConversions * emailImprovementFactor;
  let totalConversions = brevoEmailConversions;

  if (useSMS) {
    // Hypothèse: 30% de la liste email accepte les SMS
    const smsListSize = validatedInputs.emailListSize * 0.3;
    // 4-6 SMS par mois (moins fréquent que email)
    const smsPerMonth = Math.floor(validatedInputs.emailsPerMonth * 0.5);

    const smsDelivered = smsListSize * smsPerMonth * (SMS_BENCHMARKS.deliverability / 100);
    const smsOpened = smsDelivered * (SMS_BENCHMARKS.openRate / 100);
    const smsClicked = smsOpened * (SMS_BENCHMARKS.clickThroughRate / 100);
    const smsConversions = smsClicked * (SMS_BENCHMARKS.conversionRate / 100);
    smsRevenue = smsConversions * validatedInputs.averageOrderValue;

    // Effet de synergie Email + SMS (basé sur le PDF)
    const emailSynergyFactor = 1 + (EMAIL_SMS_SYNERGIES.conversionRateBoost / 100);
    projectedMonthlyRevenue = projectedMonthlyRevenue * emailSynergyFactor + smsRevenue;
    totalConversions = brevoEmailConversions * emailSynergyFactor + smsConversions;
  }

  // Revenus nouveaux abonnés (conservative)
  const newSubscriberRevenue = validatedInputs.newSubscribersPerMonth * (validatedInputs.averageOrderValue * 0.20);
  projectedMonthlyRevenue += newSubscriberRevenue;

  // Augmentation de revenu
  const revenueIncrease = projectedMonthlyRevenue - currentMonthlyRevenue;

  // ROI = pourcentage d'augmentation du revenu
  const roiPercentage = currentMonthlyRevenue > 0 ? Math.round((revenueIncrease / currentMonthlyRevenue) * 100) : 0;

  // Métriques finales
  return {
    currentMonthlyRevenue: Math.round(currentMonthlyRevenue),
    projectedMonthlyRevenue: Math.round(projectedMonthlyRevenue),
    totalMonthlyCosts: 0, // Retiré
    monthlyROI: 0, // Pas utilisé
    monthlyROIPercentage: Math.max(0, roiPercentage), // Toujours positif ou zéro
    annualROI: 0, // Pas utilisé
    revenueIncrease: Math.round(revenueIncrease),
    costSavings: 0, // Retiré
    conversions: Math.round(totalConversions),
    improvements: {
      openRate: Math.round(brevoOpenRate * 10) / 10,
      clickThroughRate: Math.round(brevoClickRate * 10) / 10,
      conversionRate: Math.round(brevoConversionRate * 10) / 10,
      deliverability: Math.round(brevoDeliverability * 10) / 10
    },
    currentMetrics: {
      openRate: validatedInputs.openRate,
      clickThroughRate: validatedInputs.clickThroughRate,
      conversionRate: validatedInputs.conversionRate,
      deliverability: validatedInputs.deliverability,
      conversions: Math.round(emailConversions)
    }
  };
}

export function calculateROI(inputs: CalculatorInputs): CalculatorResults {
  return calculateRealisticROI(inputs);
}

// Export constants for consistent display
export const getEmailBenchmarks = () => EMAIL_BENCHMARKS;
export const getSmsBenchmarks = () => SMS_BENCHMARKS;
export const getBrevoImprovements = () => BREVO_IMPROVEMENTS;
export const getEmailSmsSynergies = () => EMAIL_SMS_SYNERGIES;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatROIMultiplier(roi: number): string {
  return `${roi.toFixed(1)}x`;
}