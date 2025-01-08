import { Product } from "@/interfaces";

export function getTotalPrice(cart: Product[]) {
  return cart
    .reduce((acc, item) => {
      return acc + item.quantity! * item.price;
    }, 0)
    .toFixed(2);
}

export const tableSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchValue = e.target.value;
  const rows = document.querySelectorAll("tbody tr");
  rows?.forEach((row: any) => {
    if (row.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
      row.classList.remove("hidden");
    } else {
      row.classList.add("hidden");
    }
  });
};

export function addObjectToFormData({
  data,
  formData,
}: {
  data: {};
  formData: FormData;
}) {
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof FileList) {
      formData.append(key, value[0]);
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value instanceof FileList) {
      Array.from(value).forEach((file, index) => {
        formData.append(`${key}[${index}]`, file);
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, String(item));
      });
      return;
    }

    formData.append(key, String(value));
  });
}

export function getUniqueId() {
  return Date.now();
}
