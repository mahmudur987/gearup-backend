import express from "express";
import { cycleController } from "./cycle.controller";
import { CheckRole } from "../../../middleware/checkRole";
import { Role } from "../../user/user.interface";
import { multerUpload } from "../../../config/multer.config";
import { validateRequest } from "../../../middleware/validateRequest";
import { createCycleZodSchema } from "./cycle.validate";

const router = express.Router();

router.post(
  "/create-cycle",
  CheckRole(Role.USER),
  multerUpload.array("images"),
  validateRequest(createCycleZodSchema),
  cycleController.createCycle,
);
router.get("/", cycleController.getCycles);

router.get("/user-cycle", CheckRole(Role.USER), cycleController.getUserCycle);
router.get("/:id", cycleController.getCycleById);
export const cycleRoutes = router;

let data = {
  title: "Trek X-Caliber 8 Mountain Bike",
  vehicleType: "cycle",
  productType: "vehicle",
  cycleType: "mtb",
  brand: "Trek",
  price: 45000,
  condition: "used",
  location: "Dhaka",
  sellerId: "6971abaeceaa98e2c2a78374",
  contactVisible: true,
  description:
    "Well maintained Trek MTB with hydraulic disc brakes and smooth suspension.",
  videoUrl: "https://example.com/videos/trek.mp4",
  model: "X-Caliber 8",
  frameSize: "M",
};
