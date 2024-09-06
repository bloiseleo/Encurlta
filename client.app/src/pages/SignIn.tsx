import { useForm } from "react-hook-form";
import SignInModel from "../models/SignInModel";
import Input from "../components/atoms/Input";
import { emailErrorMessages, passwordErrorMessagesFactory } from "../models/LoginModel";
import React from "react";
import Submit from "../components/atoms/Submit";
import { validateEmail } from "../validations/EmailValidations";

export default function SignIn() {
  const { register, formState: { errors }, handleSubmit, getValues} = useForm<SignInModel>();
  const onSubmit = (data: SignInModel) => {
    console.log(data);
  }
  return <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-y-4"}>
    <Input
      placeholder={"email@domain.com"}
      register={register}
      name={"email"}
      errors={errors}
      label={"Email"}
      errorMessagesFactory={emailErrorMessages}
      validate={{
        validEmail: (email) => {
          if(typeof email !== 'string') return false;
          return validateEmail(email)
        }
      }}
    />
    <Input
      required={true}
      type={"password"}
      placeholder={"*********"}
      register={register}
      name={"password"}
      errors={errors}
      label={"Password"}
      errorMessagesFactory={passwordErrorMessagesFactory("Password")}
      validate={{
        longEnough: (value) => {
          if(typeof value !== 'string') return false;
          return value.length >= 8;
        }
      }}
    />
    <Input
      required
      type={"password"}
      placeholder={"*********"}
      register={register}
      name={"passwordConfirm"}
      errors={errors}
      label={"Confirm Password"}
      errorMessagesFactory={passwordErrorMessagesFactory("Confirm Password")}
      validate={{
        equalToPassword: (value) => {
          const { password } = getValues();
          return value === password;
        }
      }}
    />
    <Submit value={"Register"} />
  </form>
}