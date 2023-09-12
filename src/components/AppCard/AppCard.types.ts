export type ComponentT = {
  isActive?: boolean;
  isInstalled?: Boolean;
  label: string;
  category: string;
  description: string;
  img: string;
  appSlug: string;
  onClick: () => void;
  onInstallApp: any;
  id: number;
};
