import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorInputs } from "./types";
import { TrendingUp, Bot, Settings, Target, FlaskConical, Smartphone } from "lucide-react";

interface TwoStepCalculatorInputsProps {
  defaultInputs: CalculatorInputs;
  onInputsChange: (inputs: CalculatorInputs) => void;
}

export function TwoStepCalculatorInputs({ defaultInputs, onInputsChange }: TwoStepCalculatorInputsProps) {
  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    const newInputs = { ...defaultInputs, [field]: value };
    onInputsChange(newInputs);
  };

  const handleFeatureChange = (feature: keyof CalculatorInputs['features']) => {
    const newFeatures = {
      ...defaultInputs.features,
      [feature]: !defaultInputs.features[feature]
    };
    onInputsChange({ ...defaultInputs, features: newFeatures });
  };

  const featureCards = [
    {
      key: 'multiChannel' as keyof CalculatorInputs['features'],
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Add SMS to Email',
      description: 'Email + SMS campaigns',
      impact: '+40% conversion boost'
    },
    {
      key: 'aiContent' as keyof CalculatorInputs['features'],
      icon: <Bot className="w-6 h-6" />,
      title: 'AI-Powered Content',
      description: 'Aura AI content creation',
      impact: '+7.4% open rate'
    },
    {
      key: 'automation' as keyof CalculatorInputs['features'],
      icon: <Settings className="w-6 h-6" />,
      title: 'Advanced Automation',
      description: 'Automated customer journeys',
      impact: '+20% conversion rate'
    },
    {
      key: 'segmentation' as keyof CalculatorInputs['features'],
      icon: <Target className="w-6 h-6" />,
      title: 'Behavioral Segmentation',
      description: 'Smart audience targeting',
      impact: '+18.9% click rate'
    },
    {
      key: 'abTesting' as keyof CalculatorInputs['features'],
      icon: <FlaskConical className="w-6 h-6" />,
      title: 'A/B Testing',
      description: 'Optimize performance',
      impact: '+10% overall performance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brevo-green mb-2">
          Your Parameters
        </h2>
        <p className="text-sm text-brevo-text-secondary">
          Adjust values to see ROI in real-time
        </p>
      </div>

      {/* Business Information */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-brevo-green" />
            <h3 className="text-lg font-semibold text-brevo-text-primary">Business Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="monthly-revenue" className="text-sm">Monthly Revenue (€)</Label>
              <Input
                id="monthly-revenue"
                type="number"
                min="1000"
                max="1000000"
                value={defaultInputs.monthlyRevenue}
                onChange={(e) => handleInputChange('monthlyRevenue', Number(e.target.value))}
                placeholder="100,000"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="avg-order-value" className="text-sm">Average Order Value (€)</Label>
              <Input
                id="avg-order-value"
                type="number"
                min="10"
                max="1000"
                value={defaultInputs.averageOrderValue}
                onChange={(e) => handleInputChange('averageOrderValue', Number(e.target.value))}
                placeholder="150"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-list-size" className="text-sm">Email List Size</Label>
              <Input
                id="email-list-size"
                type="number"
                min="100"
                max="1000000"
                value={defaultInputs.emailListSize}
                onChange={(e) => handleInputChange('emailListSize', Number(e.target.value))}
                placeholder="10,000"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Marketing Metrics */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3 text-brevo-text-primary">📧 Email Metrics</h3>
          <div className="space-y-3 mb-4">
            <div>
              <Label htmlFor="emails-per-month" className="text-sm">Emails Sent Per Month</Label>
              <Input
                id="emails-per-month"
                type="number"
                min="1"
                max="30"
                value={defaultInputs.emailsPerMonth}
                onChange={(e) => handleInputChange('emailsPerMonth', Number(e.target.value))}
                placeholder="8"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-subscribers" className="text-sm">New Subscribers/Month</Label>
              <Input
                id="new-subscribers"
                type="number"
                min="0"
                max="10000"
                value={defaultInputs.newSubscribersPerMonth}
                onChange={(e) => handleInputChange('newSubscribersPerMonth', Number(e.target.value))}
                placeholder="500"
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm">Deliverability: {defaultInputs.deliverability}%</Label>
              <Slider
                value={[defaultInputs.deliverability]}
                onValueChange={([value]) => handleInputChange('deliverability', value)}
                min={70}
                max={95}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Open Rate: {defaultInputs.openRate}%</Label>
              <Slider
                value={[defaultInputs.openRate]}
                onValueChange={([value]) => handleInputChange('openRate', value)}
                min={10}
                max={60}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Click Rate: {defaultInputs.clickThroughRate}%</Label>
              <Slider
                value={[defaultInputs.clickThroughRate]}
                onValueChange={([value]) => handleInputChange('clickThroughRate', value)}
                min={0.5}
                max={8}
                step={0.1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Conversion Rate: {defaultInputs.conversionRate}%</Label>
              <Slider
                value={[defaultInputs.conversionRate]}
                onValueChange={([value]) => handleInputChange('conversionRate', value)}
                min={0.5}
                max={5}
                step={0.1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brevo Features Selection */}
      <Card className="bg-gradient-to-br from-background to-primary/5 border-brevo-green">
        <CardContent className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-brevo-green mb-1">
              🚀 Brevo Features
            </h3>
            <p className="text-xs text-brevo-text-secondary">
              Select features to include in ROI
            </p>
          </div>

          <div className="space-y-2">
            {featureCards.map((feature) => (
              <div
                key={feature.key}
                className={`relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-3 ${
                  defaultInputs.features[feature.key]
                    ? 'border-brevo-green bg-brevo-green/5'
                    : 'border-gray-200 hover:border-brevo-green/50'
                }`}
                onClick={() => handleFeatureChange(feature.key)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    defaultInputs.features[feature.key] ? 'text-brevo-green' : 'text-brevo-text-secondary'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-brevo-text-primary">{feature.title}</h4>
                      <input
                        type="checkbox"
                        checked={defaultInputs.features[feature.key]}
                        onChange={() => handleFeatureChange(feature.key)}
                        className="w-4 h-4 flex-shrink-0"
                      />
                    </div>
                    <p className="text-xs text-brevo-text-secondary mb-1">{feature.description}</p>
                    <div className="text-xs font-medium text-brevo-green">{feature.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}