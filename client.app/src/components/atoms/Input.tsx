import React, { HTMLInputTypeAttribute } from "react";
import { FieldError, FieldErrors, UseFormRegister, ValidateResult } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>,
  name: string,
  errors: FieldErrors<any>,
  label: string,
  errorMessagesFactory: (strategy: string) => string,
  placeholder?: string,
  type?: HTMLInputTypeAttribute,
  required?: boolean,
  validate?: {
    [key: string]: (value: unknown) => ValidateResult | Promise<ValidateResult>
  },
  minLength?: number
}

export default function Input({ register, name, errors, label, errorMessagesFactory, placeholder, type, required = false, validate, minLength}: Props) {
  return <div className={"flex flex-col gap-y-2"}>
    <label className={"indent-2 " + ((errors[name]) ? " text-red-500" : "")}>{label}</label>
    <input placeholder={placeholder} type={type}
           className={"border rounded-md focus:outline-0 p-2 " + (errors.email ? "border-red-500" : "")} {...register(name, {
      required,
      validate,
      min: 8
    })} />
    {errors[name] && <span className={"text-sm text-red-500 indent-2"}>{errorMessagesFactory(errors[name] ? (errors[name] as FieldError).type: '')}</span>}
  </div>
}