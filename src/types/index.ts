export type DashboardCategory = 'sales' | 'hr' | 'finance' | 'ecommerce' | 'bundle';

export interface DashboardTemplate {
  id: string;
  slug: string;
  name: string;
  category: DashboardCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  highlight: string;
  badge?: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    badgeBg: string;
    badgeText: string;
  };
  features: string[];
  pages: string[];
  daxCount: number;
  tablesCount: number;
  visualsCount: number;
  compatibility: string[];
  includes: string[];
  previewMetrics: {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
  }[];
  sampleDax: {
    name: string;
    description: string;
    code: string;
  }[];
}

export interface CartItem {
  template: DashboardTemplate;
  quantity: number;
}

export interface FilterState {
  timePeriod: 'YTD' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'L12M';
  regionOrDept: string;
  segment: string;
  searchTerm: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  date: string;
  paymentMethod: string;
}
