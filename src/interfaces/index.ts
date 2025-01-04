import { TRegisterInputsNames, TResetInputsNames } from "@/types";
import { InputHTMLAttributes } from "react";

export interface IRegisterInput {
  name: TRegisterInputsNames;
  placeholder: string;
  type: string;
  validation: {
    required?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

export interface IResetInput {
  name: TResetInputsNames;
  placeholder: string;
  type: string;
  validation: {
    required?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

export interface IUser {
  firstName: string;
  secondName: string;
  email: string;
  imageName?: string;
  image?: string;
  isVerified: boolean;
  token: string;
  expiresOn: string;
  refreshTokenExpiration: string;
}

export interface IAxiosError {
  message: string;
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export interface IInput {
  label: string;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"] | "select";
  placeholder?: string;
  options?: string[] | { id: string | number; name: string }[];
  defaultValue?: any;
  isDynamicOptions?: boolean;
  validation?: {
    required: string;
  };
}

export interface Category {
  id: number | string;
  name: string;
  description: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  productCategory: string;
  price: number;
  hasDiscount: string;
  discount: number;
  productCategoryId: number;
  image: File | null;
  imageUrl?: string;
  productImages?: { id: number; imageUrl: string }[];
}

export interface IProductsForm extends IInput {
  name: keyof ProductFormData;
}

export interface Product {
  id: number | string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  hasDiscount: boolean;
  priceBeforeDiscount: number;
  productCategoryId: number;
  productCategory?: string;
  category: string;
  quantity?: number;
  variants?: {
    id: number;
    color: string;
    sizes: ISize[];
  }[];
  productImages?: { id: number; imageUrl: string }[];
}

export interface ISize {
  id: number | string;
  size: number;
  quantity: number;
}

export interface ProductResponse {
  id: number | string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  hasDiscount: boolean;
  priceBeforeDiscount: number;
  productCategoryId: number;
  category: string;
  variants: Colors[];
  productImages?: [];
}

export interface Colors {
  id: number | string;
  color: string;
  sizes: { id: number; size: string; quantity: string }[];
}
