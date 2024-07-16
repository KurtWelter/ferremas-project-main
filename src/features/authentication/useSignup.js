import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {mutate: signup, isLoading} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! A 5% discount has been applied to your first purchase."
      );
    },
    onError: () => {
      toast.error("Error creating account. Please try again.");
    },
  });

  return {signup, isLoading};
}
