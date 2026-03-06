export interface AppSettings {
  app_name?: string;
  app_logo?: string;
  secondary_logo?: string;
  company_phone?: string;
  company_website?: string;
  copyright?: string;
  [key: string]: string | undefined;
}

export interface SettingsResponse {
  success: boolean;
  data: AppSettings;
}
