import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const Routes = [
  {
    path: "/user",
    route: UserRoutes,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});
