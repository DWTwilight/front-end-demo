import { rest } from "msw";
import residences from "./data/residences.json";

export const handlers = [
  // Handles residence data request
  rest.get("/residences", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(residences));
  }),
];
