export const getImagePreviewUrl = (
  image: FileList | File | null | string
): string => {
  if (image instanceof FileList && image.length > 0) {
    return URL.createObjectURL(image[0]);
  }
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return typeof image === "string" ? image : "";
};
