import { useForm } from "react-hook-form";
import { useLogin } from "../../utils/authUtils";
import Button from "../Button/Button";

const SignIn = ({ onClose }: SignInProps) => {
  const { handleLogin, loading, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit = async (data: SignInFormInputs) => {
    const result = await handleLogin(data);

    if (result.success) {
      onClose();
    } else {
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button
        type="submit"
        onClick={() => {}}
        variant="primary"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default SignIn;

interface SignInFormInputs {
  email: string;
  password: string;
}

interface SignInProps {
  onClose: () => void;
}
