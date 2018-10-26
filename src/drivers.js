import { routerify } from "cyclic-router";
import { makeHistoryDriver } from "@cycle/history";
import onionify from "cycle-onionify";
import { makeDOMDriver } from "@cycle/dom";
import switchPath from "switch-path";

const driverThunks = [
  ["DOM", () => makeDOMDriver("#app")],
  ["history", () => makeHistoryDriver()]
];
export const buildDrivers = fn =>
  driverThunks
    .map(fn)
    .map(([n, t]) => ({ [n]: t }))
    .reduce((a, c) => Object.assign(a, c), {});

export const driverNames = driverThunks
  .map(([n]) => n)
  .concat(["onion", "router"]);

export function wrapMain(main) {
  return routerify(onionify(main), switchPath);
}
