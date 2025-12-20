import { useMutation } from "@tanstack/react-query";
import { createGhostUser } from "@/api/authUser";

const useCreateGhostUser = () => {
    return useMutation({
        mutationFn: createGhostUser
    })
};

export {
    useCreateGhostUser
}