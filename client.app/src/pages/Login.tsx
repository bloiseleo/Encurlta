import Input from "../components/atoms/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginModel, {
  emailErrorMessages,
  passwordErrorMessagesFactory
} from "../models/LoginModel";
import Submit from "../components/atoms/Submit";
import useApi from "../services/hooks/useApi";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginModel>();
  const [loading, setLoading] = useState(false);
  const api = useApi("http://localhost:3000");
  const submitHandler: SubmitHandler<LoginModel> = (data) => {
    setLoading(true);
    api.login({
      email: data.email,
      password: data.password,
    })
      .then(res => {
        setLoading(false);
        if(res.status != 200) {
          setError("email", {
            type: 'value',
          });
          setError("password", {
            type: 'value',
          })
          return;
        }
      })
  }
  return <>
    <form onSubmit={handleSubmit(submitHandler)} className={"flex flex-col gap-y-4"}>
      <Input required type={"email"} placeholder={"email@domain.com"} register={register} name={"email"} errors={errors}
             label={"Email"} errorMessagesFactory={emailErrorMessages} />
      <Input required placeholder={"*********"} type={"password"} register={register} name={"password"} errors={errors}
             label={"Password"} errorMessagesFactory={passwordErrorMessagesFactory("Password")} />
      <Submit loading={loading} value={"Login"} />
      <Link className={"text-center text-sm text-gray-400 underline"} to={"/sign-in"}>Don't have an account? Sign in</Link>
    </form>
  </>
}