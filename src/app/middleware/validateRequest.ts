import { NextFunction, Request, Response } from "express";
import { da } from "zod/v4/locales";

export const validateRequest =
  (zodSchema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      req.body = await zodSchema.parseAsync(req.body);
      console.log(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
