import axiosInstance from "@/config/axios.config";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export interface ICustomQueryProps<T> {
  url: string;
  key: string[];
  options?: QueryOptions<T, Error>;
  config?: AxiosRequestConfig;
}

function useCustomQuery<T>({
  url,
  key,
  options,
  config,
}: ICustomQueryProps<T>) {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: () => axiosInstance.get(url, config).then((res) => res.data),
    ...options,
  });
}

export default useCustomQuery;
