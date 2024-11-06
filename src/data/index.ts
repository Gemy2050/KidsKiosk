import { IRegisterInput, IResetInput } from "./../interfaces/index";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    validation: {
      required: "firstName is required",
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    name: "secondName",
    placeholder: "Second Name",
    type: "text",
    validation: {
      required: "second name is required",
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: "email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
    },
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "string",
    validation: {
      required: "phone is required",
      maxLength: 11,
      pattern: {
        value: /01(0|1|2|5)\d{8}/i,
        message: "invalid phone number",
      },
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "password is required",
      minLength: 8,
      maxLength: 18,
    },
  },
  {
    name: "confirmedPassword",
    placeholder: "confirm Password",
    type: "password",
    validation: {
      required: "confirm password is required",
      minLength: 8,
      maxLength: 18,
    },
  },
  {
    name: "address",
    placeholder: "Address",
    type: "text",
    validation: {
      required: "address is required",
      minLength: 6,
    },
  },
];

export const RESET_FORM: IResetInput[] = [
  {
    name: "otp",
    placeholder: "otp code",
    type: "number",
    validation: {
      required: "otp code is required",
      minLength: 6,
      maxLength: 6,
      pattern: {
        value: /^[0-9]{1}$/,
        message: "invalid otp code",
      },
    },
  },
  {
    name: "newPassword",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "password is required",
      minLength: 8,
      maxLength: 18,
    },
  },
  {
    name: "confirmedNewPassword",
    placeholder: "Confirm Password",
    type: "password",
    validation: {
      required: "confirm password is required",
      minLength: 8,
      maxLength: 18,
    },
  },
];
