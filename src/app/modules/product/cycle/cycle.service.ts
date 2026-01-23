import { IProduct } from "../product.interface";
import { Product } from "../product.model";

const createCycle = async (payload: Partial<IProduct>) => {
  console.log(payload);

  const result = await Product.create(payload);
  return result;
};

const getCycles = async () => {
  const result = await Product.find({ vehicleType: "cycle" }).populate(
    "sellerId",
  );
  return result;
};
const getCycleById = async (id: string) => {
  const result = await Product.findById(id).populate("sellerId");
  if (result && result.views !== undefined) {
    result.views = result.views + 1;
  }

  await result?.save();

  return result;
};
const getUserCycle = async (userId: string) => {
  const result = await Product.find({ sellerId: userId });
  console.log(result, userId);
  return result;
};

export const cycleService = {
  createCycle,
  getCycles,
  getUserCycle,
  getCycleById,
};
