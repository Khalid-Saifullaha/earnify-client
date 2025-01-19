import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCoins = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: coins = [], refetch } = useQuery({
    queryKey: ["coins", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return [coins, refetch];
};

export default useCoins;
