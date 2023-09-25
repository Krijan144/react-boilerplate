import { useEffect } from "react";
import { useGetConversationQuery } from "../services";
import { useDispatch } from "react-redux";
import { setLoading, setError } from "./slice";
import { setConversationData } from "./slice";

export const useGetConversation = ({ id = "" }) => {
  const dispatch = useDispatch();

  const { data, isFetching, isError } = useGetConversationQuery(id);
  useEffect(() => {
    if (!isFetching) {
      dispatch(setLoading(false));
    }

    if (isError) {
      dispatch(setError(true));
    }

    if (data) {
      dispatch(setConversationData(data));
    }
  }, [data, isFetching, isError]);
};
