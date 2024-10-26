import { TRegisterInputsNames } from "@/types";

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

export interface IUser {
  firstName: string;
  secondName: string;
  email: string;
  imageName: string;
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

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  priceBeforeDiscount: number;
  image: string;
  sizes: string[];
  isFavourite: boolean;
  isInRecentlyViewed: boolean;
}
