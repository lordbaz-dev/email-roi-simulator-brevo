import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalculatorInputs, CalculatorResults } from "./types";
import { calculateROI } from "./calculator-logic";
import { BrevoLogo } from "./BrevoLogo";
import { TwoStepCalculatorInputs } from "./TwoStepCalculatorInputs";
import { TwoStepCalculatorResults } from "./TwoStepCalculatorResults";

const defaultInputs: CalculatorInputs = {
  monthlyRevenue: 100000,
  averageOrderValue: 150,
  emailListSize: 1000,
  emailsPerMonth: 10000,
  openRate: 25,
  clickThroughRate: 2,
  conversionRate: 1.5,
  deliverability: 80,
  newSubscribersPerMonth: 500,
  emailMarketingCosts: 299,
  staffHours: 40,
  hourlyRate: 50,
  features: {
    multiChannel: false,
    aiContent: false,
    automation: false,
    segmentation: false,
    abTesting: false
  }
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculatorResults | null>(null);

  // Auto-calculate results whenever inputs change
  useEffect(() => {
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gradient-light flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brevo-hero-bg shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BrevoLogo />
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="outline" className="border-brevo-green text-brevo-green hover:bg-brevo-green/10">
                Talk to Sales
              </Button>
              <Button className="bg-brevo-green hover:bg-brevo-green-dark text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-brevo-hero-bg py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brevo-text-primary">
            Email Marketing ROI Calculator
          </h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-brevo-text-primary">
            Adjust your parameters on the left and see your ROI projection in real-time
          </p>
        </div>
      </section>

      {/* Main Content - Side by Side Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-full mx-auto w-full">
        {/* Left Sidebar - Parameters (33%) */}
        <aside className="lg:w-1/3 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-white border-r">
          <div className="p-4 sm:p-6">
            <TwoStepCalculatorInputs
              defaultInputs={inputs}
              onInputsChange={setInputs}
            />
          </div>
        </aside>

        {/* Right Content - Results (67%) */}
        <main className="lg:w-2/3 bg-muted/30">
          <div className="p-4 sm:p-6 lg:p-8">
            {results && (
              <TwoStepCalculatorResults
                results={results}
                inputs={inputs}
              />
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-brevo-text-secondary">
            <p>© 2024 Brevo. All rights reserved.</p>
            <p className="mt-2">
              ROI calculations based on industry benchmarks and Brevo customer data.
              Individual results may vary.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}