import { IUser } from "@/interfaces";

export type TRegisterInputsNames =
  | "firstName"
  | "secondName"
  | "email"
  | "phone"
  | "password"
  | "confirmedPassword"
  | "address"
  | "image";

export type TProfileInputsNames =
  | "firstName"
  | "secondName"
  | "phone"
  | "address"
  | "image";

export type TResetInputsNames = "otp" | "newPassword" | "confirmedNewPassword";

export type User = IUser | null;
