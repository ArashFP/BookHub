import { useForm } from "react-hook-form";
import { useSignUp } from "../../utils/authUtils";

const SignUp = () => {
  const { handleSignUp, loading, error } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    const result = await handleSignUp(data);

    if (result.success) {
      console.log("User created successfully!");
    } else {
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

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

      <button type="submit" disabled={loading}>
        {loading ? "Creating User..." : "Sign Up"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default SignUp;

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
}
