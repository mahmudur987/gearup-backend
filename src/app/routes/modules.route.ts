import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { cycleRoutes } from "../modules/product/cycle/cycle.route";

export const router = Router();

const Routes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/cycle",
    route: cycleRoutes,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});
