import { App, NavItem, UserType } from "../types";
import _map from "lodash/map";
import _forEach from "lodash/forEach";
import _filter from "lodash/filter";
import { navConfig } from "./routeConfig";

export function generateRoutes(apps: App[], userType: UserType | undefined): NavItem[] {
  const filteredNavConfig: NavItem[] = _filter(navConfig, (navItem) => {
    if (navItem.hasAccess.length > 0) {
      return navItem.hasAccess.includes(userType as UserType);
    } else {
      return true;
    }
  });

  const generatedRoutes: NavItem[] = [];

  _forEach(filteredNavConfig, (navItem) => {
    if (navItem.static === true) {
      generatedRoutes.push(navItem);
    }
  });
  apps = apps.filter((app) => app.is_installed)
  _map(apps, (app) => {
    const indexOfApp = filteredNavConfig.findIndex((x) => x.route === app.app_slug);

    if (indexOfApp > -1) {
      const item = { sidebar_icon: app.sidebar_icon, ...filteredNavConfig[indexOfApp] };

      generatedRoutes.push(item);
    }
  });

  return generatedRoutes;
}
