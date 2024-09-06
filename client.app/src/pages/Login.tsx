import Input from "../components/atoms/Input";
import { Link } from "react-router-dom";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginModel, {
  emailErrorMessages,
  passwordErrorMessagesFactory
} from "../models/LoginModel";
import Submit from "../components/atoms/Submit";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>();
  const submitHandler: SubmitHandler<LoginModel> = (data) => {
    console.log(data);
  }
  return <>
    <form onSubmit={handleSubmit(submitHandler)} className={"flex flex-col gap-y-4"}>
      <Input required type={"email"} placeholder={"email@domain.com"} register={register} name={"email"} errors={errors}
             label={"Email"} errorMessagesFactory={emailErrorMessages} />
      <Input required placeholder={"*********"} type={"password"} register={register} name={"password"} errors={errors}
             label={"Password"} errorMessagesFactory={passwordErrorMessagesFactory("Password")} />
      <Submit value={"Login"} />
      <Link className={"text-center text-sm text-gray-400 underline"} to={"/sign-in"}>Don't have an account? Sign in</Link>
    </form>
  </>
}