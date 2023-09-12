export interface MetaConfig {
  name: string;
  title: string;
  description: string;
  favIcon: string;
  url: string;
  seoImage: string;
}

export interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export interface ConfigImages {
  backgroundImage: string;
  navLogo: string;
}

export interface UIConfig {
  theme: AppTheme;
  meta: MetaConfig;
  images: ConfigImages;
  chartColor: string[];
}
