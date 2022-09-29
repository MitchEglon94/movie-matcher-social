import React, { useState } from "react";
// import { getMovies } from "./../features/movies/movieSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const defaultValues = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const user = useSelector((store) => store.user.user);
  const [isUserPresent, setIsUserPresent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(login(data));
    setIsUserPresent(true);
    reset();
  };

  if (isUserPresent) {
    navigate("/");
    setIsUserPresent(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <p>{errors.username?.message}</p>

      <input {...register("password")} />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
}
