require("./sass/style.scss"); // TODO: Move to webpack.config.js

import { buildDrivers, wrapMain } from "./drivers";
import { run } from "@cycle/run";
import { App } from "./app";

const main = wrapMain(App);

run(main, buildDrivers(([k, t]) => [k, t()]));
