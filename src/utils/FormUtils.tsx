import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import TinyEditor from "@/components/TinyEditor";
import { IInput } from "@/interfaces";
import { ChangeEvent, MutableRefObject } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface RenderFieldProps {
  field: IInput;
  formData: { [key: string]: any };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  dynamicOptions?: { id: string | number; name: string }[]; // Generalized for any dynamic data
  editorRef?: MutableRefObject<TinyMCEEditor | null>;
}

export const renderField = ({
  field,
  formData,
  handleChange,
  dynamicOptions = [],
  editorRef,
}: RenderFieldProps) => {
  if (field.name === "discount" && formData.hasDiscount !== "Yes") return null;

  const fieldValue =
    field.type === "file" ? undefined : formData[field.name] || "";
  const imageUrl = field.type === "file" ? formData.imageUrl : "";

  switch (field.type) {
    case "select":
      // Handle dynamic or static select options
      const options = field.isDynamicOptions ? dynamicOptions : field.options;
      return (
        <InputGroup>
          <label htmlFor={field.name}>{field.label}</label>
          <Select
            name={field.name}
            id={field.name}
            value={String(fieldValue || field.defaultValue)}
            onChange={handleChange}
            className="border p-2 rounded w-full"
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
          <TinyEditor
            initialValue={fieldValue}
            editorRef={editorRef || { current: null }}
          />
        </InputGroup>
      );

    default:
      return (
        <InputGroup
          {...(field.type === "file" && { imageUrl, image: formData.image })}
        >
          <label htmlFor={field.name}>{field.label}</label>
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            value={fieldValue}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="border p-2 rounded w-full"
          />
        </InputGroup>
      );
  }
};
