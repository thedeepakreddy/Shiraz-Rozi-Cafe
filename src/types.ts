export interface MultilingualString {
  en: string;
  hu: string;
  de: string;
}

export interface MenuItem {
  id: string;
  name: MultilingualString;
  price: number;
  description?: MultilingualString;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: MultilingualString;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export type SupportedLanguage = 'en' | 'hu' | 'de';
