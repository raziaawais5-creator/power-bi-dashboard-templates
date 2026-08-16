import { DashboardTemplate } from '../types';

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: 'sales-dashboard',
    slug: 'sales-dashboard',
    name: 'Sales Performance & Pipeline Dashboard',
    category: 'sales',
    price: 15,
    originalPrice: 35,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'Best Value',
    description: 'Complete executive sales telemetry tracking ARR, pipeline velocity, rep quota attainment, and regional conversion rates with dynamic drill-through.',
    highlight: 'Includes Win-Rate Matrix, Rep Leaderboard & Forecast Model',
    colorScheme: {
      primary: '#2563eb', // Blue
      secondary: '#3b82f6',
      accent: '#f59e0b',
      gradient: 'from-blue-600 to-indigo-700',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeText: 'text-blue-600',
    },
    features: [
      'Executive KPI Scorecards (ARR, MRR, Pipeline, Win Rate)',
      'Sales Rep Quota Attainment & Leaderboard with Tier Badging',
      'Geographical Sales Heatmap & Regional Breakdown',
      'Sales Funnel Velocity & Stage-by-Stage Drop-off Analysis',
      'Product Mix Profitability Matrix & Cohort Growth',
      'Interactive Date Range & Currency Switcher'
    ],
    pages: ['Executive Overview', 'Rep Performance', 'Pipeline & Funnel', 'Product Breakdown', 'Geographical Map'],
    daxCount: 42,
    tablesCount: 6,
    visualsCount: 28,
    compatibility: ['Power BI Desktop (Latest)', 'Power BI Service (Pro/Premium)', 'Power BI Mobile', 'Microsoft Fabric'],
    includes: [
      'Sales_Performance_v4.pbix (Ready-to-use template)',
      'Sales_Data_Model_StarSchema.xlsx (Sample Data)',
      '40+ Pre-built Optimized DAX Measures with notes',
      'Power BI Custom Corporate Blue Theme (.json)',
      'Step-by-step 15-page Implementation Guide (.pdf)'
    ],
    previewMetrics: [
      { label: 'Total Revenue', value: '$4,829,400', change: '+18.4%', isPositive: true },
      { label: 'Pipeline Value', value: '$12,450,000', change: '+24.1%', isPositive: true },
      { label: 'Avg Deal Size', value: '$42,500', change: '+6.2%', isPositive: true },
      { label: 'Win Rate', value: '34.8%', change: '+3.5%', isPositive: true },
    ],
    sampleDax: [
      {
        name: 'Total Revenue YTD',
        description: 'Calculates Year-to-Date revenue adhering to fiscal calendar parameters.',
        code: `Revenue YTD = \nCALCULATE(\n    [Total Sales],\n    DATESYTD(DimDate[Date], "12/31")\n)`
      },
      {
        name: 'Pipeline Velocity ($/day)',
        description: 'Measures sales velocity based on qualified opportunities and cycle time.',
        code: `Pipeline Velocity = \nDIVIDE(\n    [Open Deals Count] * [Average Deal Size] * [Win Rate %],\n    [Average Sales Cycle Days],\n    0\n)`
      },
      {
        name: 'Quota Attainment %',
        description: 'Dynamic rep attainment relative to monthly or quarterly quota targets.',
        code: `Quota Attainment % = \nDIVIDE(\n    [Total Closed Won Amount],\n    SUM(FactTargets[TargetAmount]),\n    BLANK()\n)`
      }
    ]
  },
  {
    id: 'hr-dashboard',
    slug: 'hr-dashboard',
    name: 'HR Workforce & Talent Analytics Dashboard',
    category: 'hr',
    price: 20,
    originalPrice: 45,
    rating: 4.8,
    reviewsCount: 248,
    badge: 'Popular',
    description: 'Modern People Analytics dashboard measuring headcount evolution, voluntary turnover, employee engagement, diversity ratios, and payroll distribution.',
    highlight: 'Turnover Predictor, eNPS Scorecards & Dept Benchmarking',
    colorScheme: {
      primary: '#059669', // Emerald
      secondary: '#10b981',
      accent: '#8b5cf6',
      gradient: 'from-emerald-600 to-teal-800',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeText: 'text-emerald-600',
    },
    features: [
      'Active Headcount, Hiring Velocity & Attrition Breakdown',
      'Voluntary vs Involuntary Turnover Analysis with Tenure Bands',
      'DE&I (Diversity, Equity & Inclusion) Composition Gauges',
      'Compensation Benchmarking & Salary Banding vs Market',
      'Performance Review Calibration Grid & 9-Box Matrix',
      'Employee eNPS & Pulse Survey Sentiment Visuals'
    ],
    pages: ['Headcount & Growth', 'Attrition & Retention', 'DE&I Analytics', 'Compensation & Payroll', '9-Box Performance'],
    daxCount: 38,
    tablesCount: 5,
    visualsCount: 24,
    compatibility: ['Power BI Desktop (Latest)', 'Power BI Service', 'Power BI Mobile', 'Microsoft Fabric'],
    includes: [
      'HR_Analytics_Executive_v3.pbix (Complete Template)',
      'HRIS_Synthetic_Employee_Dataset.xlsx',
      'Turnover & Attrition DAX Calculation Pack',
      'Modern Emerald People Theme (.json)',
      'HR Metrics Definition & Quickstart Guide (.pdf)'
    ],
    previewMetrics: [
      { label: 'Active Headcount', value: '1,428', change: '+8.2%', isPositive: true },
      { label: 'Annual Turnover', value: '7.4%', change: '-2.1%', isPositive: true },
      { label: 'Avg Time to Hire', value: '28 Days', change: '-4 Days', isPositive: true },
      { label: 'Employee eNPS', value: '+54', change: '+6 pts', isPositive: true },
    ],
    sampleDax: [
      {
        name: 'Annualized Turnover Rate',
        description: 'Calculates rolling voluntary and involuntary attrition rate.',
        code: `Turnover Rate % = \nVAR Leavers = [Total Separations]\nVAR AvgEmployees = ([Headcount Start of Period] + [Headcount End of Period]) / 2\nRETURN\nDIVIDE(Leavers, AvgEmployees, 0) * 100`
      },
      {
        name: 'Headcount Active Today',
        description: 'Calculates employee count alive at current filter context ignoring historical termination.',
        code: `Active Headcount = \nCALCULATE(\n    COUNTROWS(DimEmployees),\n    DimEmployees[HireDate] <= MAX(DimDate[Date]),\n    OR(ISBLANK(DimEmployees[TerminationDate]), DimEmployees[TerminationDate] > MAX(DimDate[Date]))\n)`
      }
    ]
  },
  {
    id: 'finance-dashboard',
    slug: 'finance-dashboard',
    name: 'CFO Financial Performance & Cash Flow Dashboard',
    category: 'finance',
    price: 25,
    originalPrice: 55,
    rating: 5.0,
    reviewsCount: 419,
    badge: 'Enterprise Grade',
    description: 'Institutional-grade CFO suite with EBITDA waterfall, P&L statement matrix, OPEX vs CAPEX variance, Working Capital ratios, and Budget vs Actuals tracking.',
    highlight: 'P&L Matrix, Cash Flow Waterfall & Dupont ROE Analysis',
    colorScheme: {
      primary: '#7c3aed', // Purple / Violet
      secondary: '#8b5cf6',
      accent: '#ec4899',
      gradient: 'from-purple-700 to-indigo-900',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      badgeText: 'text-purple-600',
    },
    features: [
      'Dynamic P&L Income Statement with Subtotal Hierarchies',
      'EBITDA & Net Operating Income Variance Waterfall',
      'OPEX Budget vs Actuals with % Variance Conditional Alerts',
      'Cash Flow Forecast & Working Capital Liquidity Indicators',
      'Balance Sheet Dupont Decomposition (ROE, ROA, Asset Turnover)',
      'Multi-currency and Fiscal Calendar Year Support'
    ],
    pages: ['Executive P&L Summary', 'Cash Flow & Liquidity', 'OPEX Breakdown', 'Balance Sheet & Ratios', 'Budget Variance'],
    daxCount: 56,
    tablesCount: 7,
    visualsCount: 32,
    compatibility: ['Power BI Desktop (Latest)', 'Power BI Service (Pro/Premium)', 'Fabric Lakehouse'],
    includes: [
      'CFO_Financial_Suite_v5.pbix (Multi-tab model)',
      'Chart_of_Accounts_P&L_Structure.xlsx',
      '50+ Advanced Financial DAX Formulas (Hierarchies, Variance)',
      'Luxury Violet & Slate Enterprise Theme (.json)',
      'GAAP/IFRS Financial Statement Modeling Manual (.pdf)'
    ],
    previewMetrics: [
      { label: 'Net Revenue', value: '$8,940,200', change: '+14.2%', isPositive: true },
      { label: 'Gross Margin', value: '62.8%', change: '+3.1%', isPositive: true },
      { label: 'EBITDA', value: '$2,480,000', change: '+21.5%', isPositive: true },
      { label: 'Quick Ratio', value: '2.1x', change: '+0.3x', isPositive: true },
    ],
    sampleDax: [
      {
        name: 'Budget Variance %',
        description: 'Calculates delta against fiscal target with dynamic formatting.',
        code: `Budget Variance % = \nVAR Actual = [Total Actual Amount]\nVAR Budget = [Total Budget Amount]\nVAR Variance = Actual - Budget\nRETURN\nDIVIDE(Variance, Budget, 0)`
      },
      {
        name: 'Dynamic P&L Subtotals',
        description: 'Builds compliant nested financial statement row headers in a matrix.',
        code: `P&L Row Value = \nSWITCH(\n    SELECTEDVALUE(DimChartOfAccounts[SummaryCategory]),\n    "Gross Revenue", [Gross Revenue],\n    "COGS", -1 * [COGS],\n    "Gross Profit", [Gross Profit],\n    "OPEX", -1 * [Total OPEX],\n    "Net Income", [Net Profit],\n    [Actual Amount]\n)`
      }
    ]
  },
  {
    id: 'ecommerce-dashboard',
    slug: 'ecommerce-dashboard',
    name: 'E-commerce & D2C Growth Analytics Dashboard',
    category: 'ecommerce',
    price: 30,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 388,
    badge: 'High Converter',
    description: 'High-octane Shopify & Omni-channel dashboard monitoring Gross Merchandise Value (GMV), Customer Acquisition Cost (CAC), ROAS, Cart Abandonment, and RFM Customer Cohorts.',
    highlight: 'RFM Customer Segmentation, Cohort Retention & ROAS Attribution',
    colorScheme: {
      primary: '#ea580c', // Orange
      secondary: '#f97316',
      accent: '#06b6d4',
      gradient: 'from-orange-600 to-amber-700',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      badgeText: 'text-orange-600',
    },
    features: [
      'Gross Merchandise Value (GMV) & Net Realized Revenue Tracking',
      'Blended & Paid ROAS, CAC, and Channel Attribution (Meta, Google, TikTok)',
      'Shopping Cart Funnel Abandonment & Checkout Conversion Rate',
      'Automated RFM (Recency, Frequency, Monetary) Customer Scoring',
      'Cohort Repeat Purchase Rate & LTV (Lifetime Value) Curves',
      'SKU-level Velocity, Stockout Forecasting & Returns Rate'
    ],
    pages: ['Growth Overview', 'Marketing ROAS & CAC', 'RFM Customer Cohorts', 'Conversion Funnel', 'Product & Inventory'],
    daxCount: 48,
    tablesCount: 6,
    visualsCount: 30,
    compatibility: ['Power BI Desktop (Latest)', 'Power BI Service', 'Shopify / WooCommerce / Amazon connectors'],
    includes: [
      'Ecommerce_Omnichannel_Growth_v4.pbix (High Res)',
      'Shopify_Sample_Orders_Customers_Schema.xlsx',
      '45+ Marketing & E-commerce DAX Measures',
      'Vibrant Sunset Growth Theme (.json)',
      'E-commerce Metrics Formula Playbook (.pdf)'
    ],
    previewMetrics: [
      { label: 'GMV (Sales)', value: '$1,924,500', change: '+28.7%', isPositive: true },
      { label: 'Blended ROAS', value: '4.2x', change: '+0.8x', isPositive: true },
      { label: 'Avg Order Value', value: '$86.40', change: '+12.3%', isPositive: true },
      { label: 'Checkout Conv.', value: '3.82%', change: '+0.6%', isPositive: true },
    ],
    sampleDax: [
      {
        name: 'Customer Lifetime Value (LTV)',
        description: 'Computes cumulative average revenue per cohort month.',
        code: `Cohort Cumulative LTV = \nCALCULATE(\n    [Total Net Sales],\n    FILTER(\n        ALLSELECTED(DimCohortMonth),\n        DimCohortMonth[CohortIndex] <= MAX(DimCohortMonth[CohortIndex])\n    )\n) / [Original Cohort Users Count]`
      },
      {
        name: 'Blended ROAS',
        description: 'Evaluates global omnichannel revenue against total advertising ad spend.',
        code: `Blended ROAS = \nDIVIDE(\n    [Total Ecommerce Revenue],\n    [Total Ad Spend Across Channels],\n    0\n)`
      }
    ]
  },
  {
    id: 'complete-bundle',
    slug: 'complete-dashboard-bundle',
    name: 'Complete Power BI Dashboard Bundle (All 4 Templates)',
    category: 'bundle',
    price: 60,
    originalPrice: 90,
    rating: 5.0,
    reviewsCount: 890,
    badge: 'Ultimate Value • Save $30',
    description: 'Get all 4 master dashboard templates (Sales, HR, Finance, E-commerce) + Master DAX Library + 12 Custom Power BI Themes + Lifetime Updates in one discounted package.',
    highlight: 'All 4 Templates + Master DAX Cheat Sheet + Figma Design Files',
    colorScheme: {
      primary: '#d97706', // Amber / Gold
      secondary: '#f59e0b',
      accent: '#3b82f6',
      gradient: 'from-amber-500 via-orange-600 to-indigo-800',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      badgeText: 'text-amber-700',
    },
    features: [
      'Includes Sales, HR, Finance, and E-commerce .pbix files ($90 combined value)',
      '180+ Battle-tested, optimized DAX formulas with documentation',
      '4 Star-Schema Excel datasets ready for immediate copy-paste',
      'Bonus: 12 Commercial Power BI JSON Themes (Dark, Light, Slate, Sunset, Forest)',
      'Bonus: Figma Design UI Kit for custom visual layout prototyping',
      'Free Lifetime updates and new template revisions'
    ],
    pages: ['All 20+ Pages Across 4 Templates included!'],
    daxCount: 184,
    tablesCount: 24,
    visualsCount: 114,
    compatibility: ['All Power BI Desktop versions', 'Power BI Pro & Premium', 'Fabric', 'Excel PowerPivot'],
    includes: [
      '4 Full .pbix Template Files (Sales, HR, Finance, Ecommerce)',
      '4 Master Clean Excel Datasets for rapid schema mapping',
      'Master DAX Formula Repository & Cheat Sheet (.pdf & .txt)',
      '12 Corporate Power BI Theme JSON files',
      'Figma Power BI Dashboard UI Kit (.fig)',
      'Commercial Unlimited Use License'
    ],
    previewMetrics: [
      { label: 'Templates', value: '4 Complete', change: '100% Ready', isPositive: true },
      { label: 'Bundle Price', value: '$60 USD', change: 'Save $30 (33% Off)', isPositive: true },
      { label: 'Total Pages', value: '20+ Tabs', change: 'Fully Linked', isPositive: true },
      { label: 'DAX Measures', value: '184+', change: 'Optimized', isPositive: true },
    ],
    sampleDax: [
      {
        name: 'Master Date Dimension Table Generator',
        description: 'Auto-generates complete fiscal and calendar date table in DAX.',
        code: `DimDate = \nADDCOLUMNS(\n    CALENDAR(DATE(2023, 1, 1), DATE(2026, 12, 31)),\n    "Year", YEAR([Date]),\n    "Quarter", "Q" & FORMAT([Date], "Q"),\n    "Month", FORMAT([Date], "mmm"),\n    "MonthNum", MONTH([Date]),\n    "YearMonth", FORMAT([Date], "yyyy-mm"),\n    "IsYTD", IF([Date] <= TODAY() && YEAR([Date]) = YEAR(TODAY()), TRUE(), FALSE())\n)`
      }
    ]
  }
];

// Rich mock datasets for live interactive rendering
export const SALES_CHART_DATA = [
  { month: 'Jan', revenue: 320000, target: 300000, deals: 24, winRate: 31 },
  { month: 'Feb', revenue: 350000, target: 320000, deals: 28, winRate: 33 },
  { month: 'Mar', revenue: 410000, target: 360000, deals: 35, winRate: 36 },
  { month: 'Apr', revenue: 380000, target: 370000, deals: 30, winRate: 32 },
  { month: 'May', revenue: 460000, target: 400000, deals: 42, winRate: 38 },
  { month: 'Jun', revenue: 520000, target: 450000, deals: 48, winRate: 41 },
  { month: 'Jul', revenue: 490000, target: 460000, deals: 44, winRate: 37 },
  { month: 'Aug', revenue: 540000, target: 480000, deals: 50, winRate: 42 },
  { month: 'Sep', revenue: 580000, target: 500000, deals: 55, winRate: 44 },
  { month: 'Oct', revenue: 610000, target: 530000, deals: 58, winRate: 46 },
  { month: 'Nov', revenue: 680000, target: 590000, deals: 64, winRate: 48 },
  { month: 'Dec', revenue: 740000, target: 640000, deals: 70, winRate: 51 },
];

export const SALES_BY_REGION = [
  { region: 'North America', revenue: 2150000, percentage: 44.5, quota: 108, color: '#3b82f6' },
  { region: 'Europe (EMEA)', revenue: 1420000, percentage: 29.4, quota: 102, color: '#10b981' },
  { region: 'Asia Pacific', revenue: 890000, percentage: 18.4, quota: 95, color: '#f59e0b' },
  { region: 'Latin America', revenue: 369400, percentage: 7.7, quota: 88, color: '#8b5cf6' },
];

export const SALES_REPS_LEADERBOARD = [
  { rep: 'Sarah Jenkins', region: 'North America', quota: '$850k', achieved: '$1,040,000', attainment: 122, status: 'President Club', deals: 29 },
  { rep: 'Marcus Vance', region: 'EMEA', quota: '$750k', achieved: '$895,000', attainment: 119, status: 'President Club', deals: 24 },
  { rep: 'Elena Rostova', region: 'North America', quota: '$700k', achieved: '$784,000', attainment: 112, status: 'Over Target', deals: 21 },
  { rep: 'David Chen', region: 'Asia Pacific', quota: '$650k', achieved: '$698,000', attainment: 107, status: 'Over Target', deals: 19 },
  { rep: 'Amara Patel', region: 'EMEA', quota: '$600k', achieved: '$585,000', attainment: 97.5, status: 'On Track', deals: 16 },
  { rep: 'Lucas Silva', region: 'Latin America', quota: '$500k', achieved: '$440,000', attainment: 88.0, status: 'Needs Focus', deals: 12 },
];

export const HR_HEADCOUNT_DATA = [
  { month: 'Jan', headcount: 1280, hires: 34, departures: 12, net: 22 },
  { month: 'Feb', headcount: 1302, hires: 38, departures: 10, net: 28 },
  { month: 'Mar', headcount: 1330, hires: 42, departures: 14, net: 28 },
  { month: 'Apr', headcount: 1358, hires: 39, departures: 11, net: 28 },
  { month: 'May', headcount: 1386, hires: 45, departures: 16, net: 29 },
  { month: 'Jun', headcount: 1415, hires: 48, departures: 15, net: 33 },
  { month: 'Jul', headcount: 1448, hires: 52, departures: 18, net: 34 },
  { month: 'Aug', headcount: 1482, hires: 50, departures: 14, net: 36 },
];

export const HR_DEPT_STATS = [
  { department: 'Engineering & Tech', headcount: 520, turnover: 5.2, budget: '$4.2M', satisfaction: 88, color: '#10b981' },
  { department: 'Sales & BD', headcount: 340, turnover: 9.8, budget: '$2.8M', satisfaction: 82, color: '#3b82f6' },
  { department: 'Product & Design', headcount: 190, turnover: 4.1, budget: '$1.9M', satisfaction: 91, color: '#8b5cf6' },
  { department: 'Marketing & Ops', headcount: 210, turnover: 7.6, budget: '$1.7M', satisfaction: 84, color: '#f59e0b' },
  { department: 'Customer Success', headcount: 168, turnover: 8.4, budget: '$1.2M', satisfaction: 86, color: '#ec4899' },
];

export const FINANCE_MONTHLY_DATA = [
  { month: 'Jan', revenue: 720000, cogs: 270000, opex: 240000, ebitda: 210000, margin: 29.1 },
  { month: 'Feb', revenue: 760000, cogs: 285000, opex: 245000, ebitda: 230000, margin: 30.2 },
  { month: 'Mar', revenue: 810000, cogs: 300000, opex: 250000, ebitda: 260000, margin: 32.1 },
  { month: 'Apr', revenue: 790000, cogs: 295000, opex: 255000, ebitda: 240000, margin: 30.3 },
  { month: 'May', revenue: 840000, cogs: 310000, opex: 260000, ebitda: 270000, margin: 32.1 },
  { month: 'Jun', revenue: 890000, cogs: 330000, opex: 265000, ebitda: 295000, margin: 33.1 },
  { month: 'Jul', revenue: 920000, cogs: 340000, opex: 270000, ebitda: 310000, margin: 33.7 },
  { month: 'Aug', revenue: 960000, cogs: 355000, opex: 280000, ebitda: 325000, margin: 33.8 },
];

export const ECOM_CHANNEL_DATA = [
  { channel: 'Meta Ads (FB/IG)', spend: '$140,000', revenue: '$644,000', roas: 4.6, cac: '$38.20', color: '#3b82f6' },
  { channel: 'Google Search & PMax', spend: '$115,000', revenue: '$598,000', roas: 5.2, cac: '$32.40', color: '#10b981' },
  { channel: 'TikTok Ads', spend: '$85,000', revenue: '$348,500', roas: 4.1, cac: '$42.10', color: '#ec4899' },
  { channel: 'Email & SMS (Klaviyo)', spend: '$18,000', revenue: '$285,000', roas: 15.8, cac: '$4.10', color: '#8b5cf6' },
  { channel: 'Organic & Direct', spend: '$0', revenue: '$349,000', roas: 99.0, cac: '$0.00', color: '#f59e0b' },
];

export const STAR_SCHEMA_TABLES = [
  {
    name: 'Fact_Sales',
    type: 'Fact Table',
    color: 'bg-blue-600 text-white',
    columns: ['SalesID (PK)', 'OrderDateKey (FK)', 'CustomerKey (FK)', 'ProductKey (FK)', 'SalesTerritoryKey (FK)', 'SalesAmount', 'UnitCost', 'DiscountPct', 'OrderQuantity', 'TaxAmt']
  },
  {
    name: 'Dim_Date',
    type: 'Dimension Table',
    color: 'bg-emerald-600 text-white',
    columns: ['DateKey (PK)', 'FullDate', 'Year', 'Quarter', 'MonthName', 'MonthNumber', 'FiscalYear', 'FiscalQuarter', 'IsWeekend', 'IsCurrentMonth']
  },
  {
    name: 'Dim_Customer',
    type: 'Dimension Table',
    color: 'bg-purple-600 text-white',
    columns: ['CustomerKey (PK)', 'CustomerName', 'Segment', 'Country', 'StateProvince', 'City', 'PostalCode', 'FirstOrderDate', 'CustomerTier']
  },
  {
    name: 'Dim_Product',
    type: 'Dimension Table',
    color: 'bg-amber-600 text-white',
    columns: ['ProductKey (PK)', 'ProductSKU', 'ProductName', 'Category', 'SubCategory', 'StandardCost', 'ListPrice', 'Color', 'Status']
  },
  {
    name: 'Dim_SalesTerritory',
    type: 'Dimension Table',
    color: 'bg-indigo-600 text-white',
    columns: ['TerritoryKey (PK)', 'TerritoryName', 'Region', 'CountryGroup', 'SalesManager', 'QuotaTarget2026']
  }
];
