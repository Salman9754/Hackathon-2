import apiInstance from "@/utils/api-instance";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const login = async (Credentials: { email: string; password: string }) => {
    try {
      const result = await signIn("credentials", {
        ...Credentials,
        redirect: false,
      });
      if (result?.ok) {
        toast.success("signed In successfuly");
        router.push("/");
        return true;
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
      console.error("Sign-in error:", error);
      return false;
    }
  };

  const signUp = async (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    try {
      await apiInstance.post("/sign-up", values);
      toast.success("Account Created Successfully");
      router.push("/sign-in");
      return true;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const data = error.response.data;
          if (typeof data === "string") {
            errorMessage = data;
          } else if (typeof data === "object") {
            errorMessage =
              data.message ||
              data.error ||
              data.details ||
              JSON.stringify(data);
          }
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      console.error("Sign-up error:", error);
      return false;
    }
  };
  return { login, signUp };
}
