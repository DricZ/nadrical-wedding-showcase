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
