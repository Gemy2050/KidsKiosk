import * as yup from "yup";

export const registerSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "first name should be at least 3 characters"),
    secondName: yup
      .string()
      .required("Second name is required")
      .min(3, "last name should be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid"
      )
      .required("Email is required"),
    phone: yup.string().required("Phone is required").min(11).max(11),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(18, "Password must be at least 18 characters long"),
    confirmedPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "confirm password does not match password"),
    address: yup
      .string()
      .required("Address is required")
      .min(4, "address is too short"),
    image: yup.mixed().required("image is required"),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;

//* Login Schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password must be at least 18 characters long"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

//* resetPassword Schema
export const resetPasswordSchema = yup.object({
  otp: yup
    .string()
    .required("otp code is required")
    .matches(/^[0-9]{6}$/, "otp code is not valid"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password must be at least 18 characters long"),
  confirmedNewPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf(
      [yup.ref("newPassword")],
      "confirm password does not match password"
    ),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

//* Profile Schema
export const profileSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "first name should be at least 3 characters"),
    secondName: yup
      .string()
      .required("Second name is required")
      .min(3, "last name should be at least 3 characters"),
    phone: yup.string().required("Phone is required").min(11).max(11),
    address: yup
      .string()
      .required("Address is required")
      .min(4, "address is too short"),
    image: yup.mixed().required("image is required"),
  })
  .required();

export type ProfileFormData = yup.InferType<typeof profileSchema>;

// *** Dashboard  ***

// ProductForm Schema
export const productForm = yup.object({
  image: yup.mixed().test("required", "Image is required", function (value) {
    const { imageUrl } = this.parent; // Access other fields in the schema
    // Validate: Either image should be uploaded or imageUrl should exist
    return imageUrl || (value && (value as FileList).length > 0);
  }),
  imageUrl: yup.string().optional(),
  name: yup.string().required("name is required"),
  description: yup.string().required("description is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("price is required"),
  productCategoryId: yup.string().required("category is required"),
  hasDiscount: yup.string().required("discount is required"),
  discount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when(["hasDiscount", "price"], {
      is: (hasDiscount: string) => hasDiscount === "Yes",
      then: (schema) =>
        schema
          .required("discount is required")
          .min(0, "Discount must be positive number")
          .max(yup.ref("price"), "Discount cannot be greater than price"),
      otherwise: (schema) => schema.nullable(),
    }),
  colors: yup.array().of(
    yup.object().shape({
      id: yup
        .mixed()
        .default(() => Date.now())
        .transform((_, originalValue) =>
          originalValue ? originalValue : Date.now()
        ),
      color: yup.string().required("color is required"),
      sizes: yup.array().of(
        yup.object().shape({
          id: yup
            .number()
            .default(() => Date.now())
            .transform((_, originalValue) =>
              originalValue ? originalValue : Date.now()
            ),
          size: yup.string().required("size is required"),
          quantity: yup.string().required("quantity is required"),
        })
      ),
    })
  ),
});

export type ProductForm = yup.InferType<typeof productForm>;
