import { memo } from "react";
import Input from "./Input";
import InputGroup from "./InputGroup";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Colors } from "@/interfaces";
import { ProductForm } from "@/validation";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  colorId: number | string;
  colors: Colors[];
  index: number;
  productFormMethods: UseFormReturn<ProductForm>;
}

const ColorBox = ({ colors, colorId, index, productFormMethods }: IProps) => {
  const { register, setValue } = productFormMethods;

  // Add a new size to a specific color
  const addSize = () => {
    if (!colors) return;
    const updatedColors = [...colors];
    updatedColors[index].sizes?.push({
      id: Date.now(),
      size: "",
      quantity: "",
    });
    setValue("colors", updatedColors);
  };

  // Remove a specific color
  const removeColor = () => {
    setValue(
      "colors",
      colors.filter((el) => el.id !== colorId)
    );
  };

  // Remove a specific size from a specific color
  const removeSize = (sizeIndex: number) => {
    const updatedColors = [...colors];
    updatedColors[index].sizes.splice(sizeIndex, 1);
    setValue("colors", updatedColors);
  };

  return (
    <div className=" rounded-md flex flex-col items-center">
      {/* Color Section */}
      <div className="w-full border-2 border-gray-100 max-w-md p-4 pt-6 bg-white rounded-lg shadow-lg mb-2">
        {/* Color Name */}
        <div className="flex gap-2 items-center justify-between mb-6">
          <InputGroup className="w-full">
            <label htmlFor={`colorName-${colorId}`}>color name</label>
            <Input
              type="text"
              id={`colorName-${colorId}`}
              // name="color"
              // value={color}
              // onChange={(e) => handleColorChange(e)}
              {...register(`colors.${index}.color`)}
            />
          </InputGroup>
          <button
            type="button"
            className="text-red-500 text-xl"
            onClick={removeColor}
          >
            <Trash2 size={22} />
          </button>
        </div>

        {/* Sizes and Quantities */}

        {colors?.[index].sizes?.map((el, idx) => (
          <div className="flex gap-2 mb-5" key={el.id}>
            <InputGroup className="w-1/2">
              <label htmlFor={`size-${el.id}`} className="text-[!10px]">
                size
              </label>
              <Input
                type="text"
                id={`size-${el.id}`}
                // value={el.size}
                // name="size"
                // onChange={(e) => handleSizeAndQuantityChange(e, el.id)}
                {...register(`colors.${index}.sizes.${idx}.size`)}
              />
            </InputGroup>
            <InputGroup className="w-1/2">
              <label htmlFor={`quantity-${el.id}`} className="text-[!10px]">
                quantity
              </label>
              <Input
                type="number"
                id={`quantity-${el.id}`}
                // value={el.quantity}
                // name="quantity"
                // onChange={(e) => handleSizeAndQuantityChange(e, el.id)}
                {...register(`colors.${index}.sizes.${idx}.quantity`)}
              />
            </InputGroup>
            <button
              type="button"
              className="text-red-500 text-xl"
              onClick={() => removeSize(idx)}
            >
              <Trash2 size={18} className="ms-1" />
            </button>
          </div>
        ))}

        {/* Add Size Button */}
        <Button
          type="button"
          className="mt-3"
          fullWidth
          rounded="md"
          size="sm"
          onClick={addSize}
        >
          + Add Size
        </Button>
      </div>
    </div>
  );
};

export default memo(ColorBox);
