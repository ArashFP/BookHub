import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FormGroup from "../FormGroup/FormGroup";
import styles from "./UserSettings.module.css";
import {
  GET_USER_QUERY,
  UPDATE_USER_MUTATION,
} from "../../graphql/queries/userQueries";

export const UserSettings = () => {
  const userId = localStorage.getItem("userId");
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
  });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data?.user) {
      setValue("username", data.user.username);
      setValue("email", data.user.email);
      setValue("password", data.user.password);
    }
  }, [data, setValue]);

  const onSubmit = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
      alert("User information updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="Username" id="username">
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            disabled={!isEditing}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </FormGroup>

        <FormGroup label="Email" id="email">
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            disabled={!isEditing}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </FormGroup>

        <FormGroup label="Password" id="password">
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            disabled={!isEditing}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </FormGroup>

        <div className={styles.modalFooterButtons}>
          {isEditing ? (
            <>
              <Button type="submit" variant="primary" disabled={!isDirty}>
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              Update Information
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
