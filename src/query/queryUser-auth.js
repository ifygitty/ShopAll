import { createGhostUser } from "@/api/authUser";
import { useMutation } from "@tanstack/react-query";



export const useCreateGhostUser = () => {
  return useMutation({
    mutationFn: createGhostUser,

    onSuccess: (data) => {
      console.log("Ghost user created:", data);
    },

    onError: (error) => {
      console.error("Ghost user error:", error.message);
    }
  });
};
