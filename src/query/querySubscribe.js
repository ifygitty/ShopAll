import { checkNewsletterEmail, subscribeNewsletter } from "@/api/subscriber";
import { useMutation } from "@tanstack/react-query";



export const useCheckNewsletterEmail = () => {
  return useMutation({
    mutationFn: (email) => checkNewsletterEmail(email),
  });
};



export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (payload) => subscribeNewsletter(payload),
  });
};

