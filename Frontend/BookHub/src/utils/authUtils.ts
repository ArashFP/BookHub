import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/logInMutation";
import { SIGNUP_MUTATION } from "../graphql/mutations/signUpMutation";

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response = await login({ variables: formData });
      const token = response.data.login.token;

      localStorage.setItem("token", token);

      return { success: true, token, user: response.data.login.user };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

  return { handleLogin, data, loading, error };
};

export const useSignUp = () => {
  const [createUser, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignUp = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await createUser({ variables: formData });

      return { success: true, user: response.data.createUser };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

  return { handleSignUp, data, loading, error };
};
