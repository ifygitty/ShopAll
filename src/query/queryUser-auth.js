// import { createGhostUser, checkEmailExists, useCheckEmail, verifyUserEmail,  resendOtp, verifyOtp } from "@/api/authUser";
import { createGhostUser, checkEmailExists, sendAuthOtp, resendOtp, verifyOtp, getUser } from "@/api/authUser";
import { useMutation, useQuery } from "@tanstack/react-query";



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



export const useCheckEmail = () =>
  useMutation({
    mutationFn: (email) => checkEmailExists(email),
  });

export const useSendOtp = () =>
  useMutation({
    mutationFn: sendAuthOtp,
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: verifyOtp,
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: (email) => resendOtp(email),
  });


export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    retry: false,           
    staleTime: 1000 * 60 * 5 
  });
};
