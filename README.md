# Brevo Email Marketing ROI Calculator

A professional ROI calculator for email marketing campaigns with realistic industry benchmarks and Email + SMS synergy calculations.

## Features

- **Realistic Benchmarks** - Based on 2025 industry data
  - Email: 25% open rate, 4% CTR, 15% conversion
  - SMS: 98% open rate, 12% CTR, 32% conversion
- **Email + SMS Synergies** - Calculate combined channel impact (+40% conversion boost)
- **Revenue-Based ROI** - Monthly revenue as the calculation base
- **Brevo Feature Impact** - See how AI, automation, segmentation improve metrics
- **Educational Sections** - "How It Works" explains the funnel and business impact

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- Recharts for visualizations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── roi-calculator/
│   │   ├── ROICalculator.tsx          # Main calculator component
│   │   ├── TwoStepCalculatorInputs.tsx # Left panel with inputs
│   │   ├── TwoStepCalculatorResults.tsx # Right panel with results
│   │   ├── calculator-logic.ts         # ROI calculation logic
│   │   └── types.ts                    # TypeScript types
│   └── ui/                             # shadcn/ui components
├── pages/
│   └── Index.tsx                       # Main page
└── main.tsx                            # App entry point
```

## Deployment

### Netlify / Vercel

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## License

MIT
