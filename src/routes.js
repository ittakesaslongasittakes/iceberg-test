import { Pages } from "./components/Pages";

const scope = "app";

export const routes = {
  "/": { component: Pages.Index, scope }
};
