import { useGetMessageQuery } from "../services";

export const useGetMessage = (id: string) => {
  const { data, isLoading, error, isFetching } = useGetMessageQuery(id, {
    skip: id ? false : true,
  });
  if (error) {
    console.log({ error });
  }
  return { messageData: data, messageFetching: isFetching };
};
