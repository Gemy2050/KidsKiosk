import { IUser } from "@/interfaces";

export type TRegisterInputsNames =
  | "firstName"
  | "secondName"
  | "email"
  | "phone"
  | "password"
  | "confirmedPassword"
  | "address";

export type TResetInputsNames = "otp" | "newPassword" | "confirmedNewPassword";

export type User = IUser | null;
