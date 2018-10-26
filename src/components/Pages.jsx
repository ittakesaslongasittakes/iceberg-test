import { Qualifier } from "./Qualifier";

export const Pages = {
  Index: ({ DOM, onion, HTTP }) => Qualifier({ DOM, onion, HTTP }, "index")
};
