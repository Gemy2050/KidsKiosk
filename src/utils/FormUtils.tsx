import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import TinyEditor from "@/components/TinyEditor";
import { IInput } from "@/interfaces";
import { ProductForm } from "@/validation";
import { MutableRefObject } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";

interface RenderFieldProps {
  field: IInput;
  productFormMethods: UseFormReturn<ProductForm>;
  dynamicOptions?: { id: string | number; name: string }[]; // Generalized for any dynamic data
  editorRef?: MutableRefObject<TinyMCEEditor | null>;
}

export const renderField = ({
  field,
  productFormMethods,
  dynamicOptions = [],
  editorRef,
}: RenderFieldProps) => {
  const { register, control, watch } = productFormMethods;

  const formData = watch();
  const { hasDiscount, image, imageUrl } = formData;

  if (field.name === "discount" && hasDiscount !== "Yes") return null;

  switch (field.type) {
    case "select":
      // Handle dynamic or static select options
      const options = field.isDynamicOptions ? dynamicOptions : field.options;
      return (
        <InputGroup>
          <label htmlFor={field.name}>{field.label}</label>
          <Select
            id={field.name}
            className="border p-2 rounded w-full"
            {...register(field.name as keyof ProductForm)}
          >
            {!field.defaultValue && <option value="">Select an option</option>}
            {options?.map((option) => (
              <option
                key={typeof option === "string" ? option : option.id}
                value={
                  typeof option === "string" ? option : option.id.toString()
                }
              >
                {typeof option === "string" ? option : option.name}
              </option>
            ))}
          </Select>
        </InputGroup>
      );

    case "editor":
      return (
        <InputGroup className="col-span-full">
          <label
            htmlFor="Discount"
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
          >
            {field.label}
          </label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TinyEditor
                value={field.value}
                onEditorChange={field.onChange}
                editorRef={editorRef || { current: null }}
              />
            )}
          />
        </InputGroup>
      );

    default:
      return (
        <InputGroup
          {...(field.type === "file" && {
            imageUrl,
            image: image instanceof FileList ? image[0] : undefined,
          })}
        >
          <label htmlFor={field.name}>{field.label}</label>
          <Input
            type={field.type}
            id={field.name}
            placeholder={field.placeholder}
            className="border p-2 rounded w-full"
            {...register(field.name as keyof ProductForm)}
          />
        </InputGroup>
      );
  }
};
