import React, { useEffect, useState } from "react";
// import { getMovies } from "./../features/movies/movieSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup, updateMessage } from "./../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const defaultValues = {
  email: "",
  username: "",
  password: "",
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [toLogin, setToLogin] = useState(false);
  const message = useSelector((store) => store.user.message);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(message);
    if (message.status === 200) {
      console.log(message.status);
      setToLogin(true);
    }
  }, [message]);

  if (toLogin) {
    console.log("true");
    navigate("/login");
    dispatch(updateMessage());
    setToLogin(false);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const onSubmit = async (data) => {
    console.log(data);
    dispatch(signup(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input {...register("password")} placeholder="Password" />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
}
