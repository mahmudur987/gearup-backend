import { IProduct } from "../product.interface";
import { Product } from "../product.model";

const createCycle = async (payload: Partial<IProduct>) => {
  const result = await Product.create(payload);
  return result;
};

const getCycles = async () => {
  const result = await Product.find({ productType: "cycle" });
  return result;
};

const getUserCycle = async (userId: string) => {
  const result = await Product.find({ sellerId: userId });
  return result;
};

export const cycleService = {
  createCycle,
};
