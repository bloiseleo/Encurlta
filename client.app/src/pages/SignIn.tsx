import { useForm } from "react-hook-form";
import SignInModel from "../models/SignInModel";
import Input from "../components/atoms/Input";
import { emailErrorMessages, passwordErrorMessagesFactory } from "../models/LoginModel";
import React, { useEffect, useState } from 'react';
import Submit from "../components/atoms/Submit";
import { validateEmail } from "../validations/EmailValidations";
import useApi from '../services/hooks/useApi';
import AlertModal from '../components/modals/AlertModal';
import useBroker from '../services/hooks/useBroker';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/modals/SuccessModal';

export default function SignIn() {
  const { register, formState: { errors }, handleSubmit, getValues} = useForm<SignInModel>();
  const [loading,setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: '',
    title: '',
    showSuccess: false
  });
  const channel = useBroker<boolean, void>();
  const channelSuccess = useBroker<boolean, void>();
  const api = useApi("http://localhost:3000");
  const navigate = useNavigate();
  const onSubmit = (data: SignInModel) => {
    setLoading(true);
    api.register({
      email: data.email,
      password: data.password
    })
      .then(res => {
        if(res.status !== 201) {
          setModalInfo({
            show: true,
            message: res.message,
            title: 'Error',
            showSuccess: false
          })
          setLoading(false);
          return;
        };
        setModalInfo(old => ({
          ...old,
          showSuccess: true
        }))
        setTimeout(() => {
          return navigate("/login");
        }, 3000);
      })
  }
  useEffect(() => {
    channel.on("close_modal", (data) => {
      if(typeof data === 'undefined') return;
      setModalInfo(old => ({
        ...old,
        show: data
      }));
    });
    channelSuccess.on('close_modal', data => {
      if(typeof data !== 'boolean') return;
      setModalInfo(old => ({
        ...old,
        showSuccess: data
      }));
    })
  });
  return <>
    <AlertModal
      channel={channel}
      show={modalInfo.show}
      message={modalInfo.message} title={modalInfo.title}
    />
    <SuccessModal
      channel={channelSuccess}
      show={modalInfo.showSuccess}
      message={"Account created successfully. You're being redirected to the login page"}
      title={"You're Welcome!"}
    />
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-y-4"}>
      <Input
        placeholder={"email@domain.com"}
        register={register}
        name={"email"}
        errors={errors}
        label={"Email"}
        errorMessagesFactory={emailErrorMessages}
        validate={{
          validEmail: (email) => {
            if (typeof email !== 'string') return false;
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
            if (typeof value !== 'string') return false;
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
      <Submit value={"Register"} loading={loading}/>
    </form>
  </>

}