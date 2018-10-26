import xs from "xstream";
import { extractSinks } from "cyclejs-utils";
import { routes } from "./routes";
import { driverNames } from "./drivers";
import isolate from "@cycle/isolate";

const defaultState = {
  app: {
    path: []
  }
};
export const App = sources => {
  const initReducer$ = xs.of(
    prevState => (!prevState ? defaultState : prevState)
  );

  const match$ = sources.router.define(routes);

  const componentSinks$ = match$.map(({ path, value }) => {
    const { component, scope } = value;
    return isolate(component, scope)({
      ...sources,
      router: sources.router.path(path)
    });
  });

  const sinks = extractSinks(componentSinks$, driverNames);
  return {
    ...sinks,
    onion: xs.merge(initReducer$, sinks.onion)
  };
};
