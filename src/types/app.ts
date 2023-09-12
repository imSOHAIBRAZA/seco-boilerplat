import { Operator } from ".";

type AppType = "Frontend" | "Backend";

export type App = {
  id: number;
  name: string;
  icon: string;
  sidebar_icon: string;
  backend_docker_image: string;
  data_docker_image: string;
  category: string;
  description: string;
  vendor: string;
  app_type: AppType;
  app_slug: string;
  is_active: boolean;
  is_deployed: boolean;
  app_zip_url: string | null;
  is_installed: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  allowed_companies: Operator[];
  companies: number[];
};

