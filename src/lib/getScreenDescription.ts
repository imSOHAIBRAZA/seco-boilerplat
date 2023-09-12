import _ from "lodash";
import { Tab } from "../types";
import { navConfig } from "./routeConfig";

export function getScreenDescription(activePath: string): string {
  let activeRoute: Tab | undefined;

  const matchedPath = activePath.match(/.*\//gm)?.[0];
  const indexPath = matchedPath?.substring(0, matchedPath?.length - 1) || "";

  const route = _.find(navConfig, (x) => x.route === activePath);

  if (route) {
    activeRoute = _.find(route.tabs, (x) => x.route === activePath);
  } else {
    activeRoute = _.find(
      _.find(navConfig, (x) => x.route === indexPath)?.tabs,
      (x) => x.route === activePath,
    );
  }

  return activeRoute?.description || "";
}
