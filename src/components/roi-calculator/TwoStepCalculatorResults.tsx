import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalculatorResults, CalculatorInputs } from "./types";
import { formatCurrency, formatPercentage, getBrevoImprovements } from "./calculator-logic";
import { TrendingUp, DollarSign, Target, Users, ArrowRight, Sparkles, Smartphone, Bot, Settings, FlaskConical } from "lucide-react";

interface TwoStepCalculatorResultsProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

export function TwoStepCalculatorResults({ results, inputs }: TwoStepCalculatorResultsProps) {
  const improvements = getBrevoImprovements();

  const selectedFeatures = Object.entries(inputs.features)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => key);

  const percentageIncrease = results.monthlyROIPercentage;

  const featureImpacts: { [key: string]: { title: string; impact: string; description: string } } = {
    multiChannel: {
      title: "Email + SMS",
      impact: "+40% conversion boost",
      description: "Add SMS campaigns to reach customers on multiple channels"
    },
    aiContent: {
      title: "AI-Powered Content",
      impact: "+7.4% open rate",
      description: "Aura AI creates engaging subject lines and content"
    },
    automation: {
      title: "Advanced Automation",
      impact: "+20% conversion rate", 
      description: "Automated customer journeys drive conversions"
    },
    segmentation: {
      title: "Behavioral Segmentation",
      impact: "+18.9% click rate",
      description: "Target the right message to the right audience"
    },
    abTesting: {
      title: "A/B Testing",
      impact: "+10% overall performance",
      description: "Continuously optimize for better results"
    }
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-primary">Your ROI Projection</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Updates in real-time as you adjust parameters
        </p>
      </div>

      {/* Performance Improvements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold">Metric</th>
                  <th className="text-center py-3 font-semibold">Current</th>
                  <th className="text-center py-3 font-semibold text-primary">With Brevo</th>
                  <th className="text-center py-3 font-semibold text-green-600">Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 font-medium">Open Rate</td>
                  <td className="text-center py-3">{formatPercentage(results.currentMetrics.openRate, 1)}</td>
                  <td className="text-center py-3 text-primary font-semibold">{formatPercentage(results.improvements.openRate, 1)}</td>
                  <td className="text-center py-3 text-green-600 font-semibold">
                    +{formatPercentage(results.improvements.openRate - results.currentMetrics.openRate, 1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Click Rate</td>
                  <td className="text-center py-3">{formatPercentage(results.currentMetrics.clickThroughRate, 1)}</td>
                  <td className="text-center py-3 text-primary font-semibold">{formatPercentage(results.improvements.clickThroughRate, 1)}</td>
                  <td className="text-center py-3 text-green-600 font-semibold">
                    +{formatPercentage(results.improvements.clickThroughRate - results.currentMetrics.clickThroughRate, 1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Conversion Rate</td>
                  <td className="text-center py-3">{formatPercentage(results.currentMetrics.conversionRate, 1)}</td>
                  <td className="text-center py-3 text-primary font-semibold">{formatPercentage(results.improvements.conversionRate, 1)}</td>
                  <td className="text-center py-3 text-green-600 font-semibold">
                    +{formatPercentage(results.improvements.conversionRate - results.currentMetrics.conversionRate, 1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Deliverability</td>
                  <td className="text-center py-3">{formatPercentage(results.currentMetrics.deliverability, 1)}</td>
                  <td className="text-center py-3 text-primary font-semibold">{formatPercentage(results.improvements.deliverability, 1)}</td>
                  <td className="text-center py-3 text-green-600 font-semibold">
                    +{formatPercentage(results.improvements.deliverability - results.currentMetrics.deliverability, 1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Increase Display */}
      <Card className="border-2 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Current Monthly Revenue</div>
              <div className="text-2xl font-bold text-muted-foreground">
                {formatCurrency(results.currentMonthlyRevenue)}
              </div>
            </div>

            <ArrowRight className="w-8 h-8 text-green-600 mx-auto" />

            <div>
              <div className="text-sm text-green-700 mb-2">Projected with Brevo{inputs.features.multiChannel ? ' + SMS' : ''}</div>
              <div className="text-4xl font-bold text-green-600">
                {formatCurrency(results.projectedMonthlyRevenue)}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="inline-flex items-center rounded-full px-6 py-3 text-lg font-semibold bg-green-100 text-green-700 border-2 border-green-300">
              <TrendingUp className="w-5 h-5 mr-2" />
              +{formatPercentage(percentageIncrease, 0)} revenue increase
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">
              That's {formatCurrency(results.revenueIncrease)} more per month
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Monthly Revenue Increase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(results.revenueIncrease)}
            </div>
            <p className="text-sm text-muted-foreground">
              From {formatCurrency(results.currentMonthlyRevenue)} to {formatCurrency(results.projectedMonthlyRevenue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Annual Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(results.revenueIncrease * 12)}
            </div>
            <p className="text-sm text-muted-foreground">
              Projected annual revenue increase
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            How It Works: Understanding Your ROI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">The Email Marketing Funnel</h4>
            <div className="bg-white/80 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">1. Deliverability</span>
                <span className="text-muted-foreground">→ How many emails reach the inbox (not spam)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">2. Open Rate</span>
                <span className="text-muted-foreground">→ % of delivered emails that get opened</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">3. Click Rate</span>
                <span className="text-muted-foreground">→ % of opened emails where users click links</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">4. Conversion Rate</span>
                <span className="text-muted-foreground">→ % of clicks that result in purchases</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-green-100 px-2 py-1 rounded font-semibold">= Revenue</span>
                <span className="text-muted-foreground">→ Conversions × Average Order Value</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Why Each Metric Matters for Your Business</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/80 rounded-lg p-3 text-sm">
                <div className="font-semibold text-blue-700 mb-1">Deliverability Impact</div>
                <p className="text-muted-foreground">Better inbox placement means more people see your emails. A 3.5% improvement can mean hundreds more emails reaching customers.</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 text-sm">
                <div className="font-semibold text-blue-700 mb-1">Open Rate Impact</div>
                <p className="text-muted-foreground">Higher open rates indicate compelling subject lines. Small improvements multiply through the funnel to drive significant revenue gains.</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 text-sm">
                <div className="font-semibold text-blue-700 mb-1">Click Rate Impact</div>
                <p className="text-muted-foreground">More clicks mean more engaged readers. This is where targeted messaging and segmentation show real value.</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 text-sm">
                <div className="font-semibold text-blue-700 mb-1">Conversion Impact</div>
                <p className="text-muted-foreground">The final step that generates revenue. Automation and personalization dramatically improve conversion rates.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">The Compound Effect</h4>
            <p className="text-sm text-muted-foreground">
              Small improvements at each stage multiply together. For example: A 3.5% deliverability boost + 5% open rate increase + 10% click rate improvement =
              <span className="font-semibold text-green-600"> significantly higher revenue</span>. This is why optimizing the entire funnel matters more than focusing on just one metric.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature Impact Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 How Your Selected Features Drive Results</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Detailed breakdown of how each Brevo feature improves your metrics
          </p>
        </CardHeader>
        <CardContent>
          {selectedFeatures.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Select features on the left to see their detailed impact on your metrics</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedFeatures.includes('multiChannel') && (
                <div className="border-l-4 border-purple-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-lg text-purple-900">Email + SMS Combined</h4>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-purple-800 mb-1">📈 Conversion Rate: +40% composite boost</div>
                      <p className="text-sm text-muted-foreground">SMS has 98% open rate and 32% conversion rate. Combined with email creates powerful synergies.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-purple-700">Why it works:</span> SMS reaches 30% of your email list with ultra-high engagement for urgent messages.
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-purple-700">Business value:</span> +25% reach and +40% conversion through multi-touch attribution.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeatures.includes('aiContent') && (
                <div className="border-l-4 border-blue-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-lg text-blue-900">AI-Powered Content (Aura AI)</h4>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-blue-800 mb-1">📨 Open Rate: +2-3% additional boost</div>
                      <p className="text-sm text-muted-foreground">AI generates compelling subject lines and personalized content that resonates with each recipient.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-blue-700">Why it works:</span> AI analyzes successful patterns and creates subject lines optimized for your audience.
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-blue-700">Business value:</span> Save time while improving performance - no more A/B testing subject lines manually.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeatures.includes('automation') && (
                <div className="border-l-4 border-green-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-lg text-green-900">Advanced Automation</h4>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-green-800 mb-1">🎯 Conversion Rate: +5-8% additional boost</div>
                      <p className="text-sm text-muted-foreground">Automated workflows deliver the right message at the perfect moment in the customer journey.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-green-700">Why it works:</span> Welcome series, cart abandonment, and re-engagement emails trigger based on behavior.
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-green-700">Business value:</span> 20% time savings + better timing = higher conversions with less effort.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeatures.includes('segmentation') && (
                <div className="border-l-4 border-orange-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-lg text-orange-900">Behavioral Segmentation</h4>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-orange-800 mb-1">👆 Click Rate: +3% | Conversion: +3%</div>
                      <p className="text-sm text-muted-foreground">Target specific audiences with relevant messages based on their behavior and preferences.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-orange-700">Why it works:</span> Personalized content is more relevant, leading to higher engagement and action.
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-orange-700">Business value:</span> Send fewer, more targeted emails that drive better results.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeatures.includes('abTesting') && (
                <div className="border-l-4 border-pink-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-pink-600" />
                    <h4 className="font-bold text-lg text-pink-900">A/B Testing</h4>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-pink-800 mb-1">🔬 All Metrics: +2-3% improvement</div>
                      <p className="text-sm text-muted-foreground">Continuously optimize subject lines, content, CTAs, and send times for maximum performance.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-pink-700">Why it works:</span> Data-driven decisions eliminate guesswork and compound over time.
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <span className="font-medium text-pink-700">Business value:</span> Small ongoing improvements add up to significant revenue gains.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call to Actions */}
      <Card className="bg-gradient-to-br from-primary/5 to-brevo-green/5 border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Ready to achieve these results?
            </h3>
            <p className="text-sm text-muted-foreground">
              Join 500,000+ businesses already growing with Brevo
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-brevo-green hover:bg-brevo-green-dark">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </CardContent>
      </Card>


      {/* Trust Indicators */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Based on data from 500,000+ Brevo customers
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Industry benchmarks sourced from leading email marketing studies (HubSpot 2025, EmailToolTester 2025)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}