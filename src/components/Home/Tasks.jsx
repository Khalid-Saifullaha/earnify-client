import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Card from "./Card";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Tasks = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/tasks`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {tasks && tasks.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {tasks.map((task) => (
            <Card key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default Tasks;
