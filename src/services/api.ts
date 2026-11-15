const API_BASE_URL = import.meta.env.VITE_API_URL || "https://admin.nadrical.my.id/api";

export const fetchSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return response.json();
};

export interface WeddingTemplateApi {
  id: number;
  name: string;
  slug: string;
  engine: string;
  category: string | null;
  image: string | null;
  demo_url: string | null;
  invitations_count: number;
  created_at: string;
}

export interface WeddingCategoryApi {
  id: number;
  name: string;
  slug: string;
  templates_count?: number;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface WeddingTemplatesResponse {
  data: WeddingTemplateApi[];
  categories: WeddingCategoryApi[];
  meta: PaginationMeta;
}

export const fetchWeddingTemplates = async (
  page: number = 1,
  categorySlug?: string,
  perPage: number = 12,
): Promise<WeddingTemplatesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  if (categorySlug) {
    params.set("category", categorySlug);
  }

  const response = await fetch(`${API_BASE_URL}/wedding-templates?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch wedding templates");
  }
  return response.json();
};

export interface WeddingPricingApi {
  id: number;
  name: string;
  slug: string;
  badge?: string | null;
  is_popular: boolean;
  original_price_idr: number | string;
  discount_percentage?: number | null;
  price_idr: number | string;
  price_usd?: number | string | null;
  guest_count: number;
  guest_slider_stops?: (number | string)[] | null;
  shots_options?: (number | string)[] | null;
  default_shots: number;
  storage_days: number;
  features?: string[] | null;
  cta_text: string;
  cta_url?: string | null;
  is_active: boolean;
  sort_order: number;
}

export const fetchWeddingPricings = async (): Promise<{ success: boolean; data: WeddingPricingApi[] }> => {
  const response = await fetch(`${API_BASE_URL}/wedding-pricings`);
  if (!response.ok) {
    throw new Error("Failed to fetch wedding pricings");
  }
  return response.json();
};
