/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "password",
    type: "password",
    inputType: "password",
    label: "Password",
    placeholder: "Enter your password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Password is required" }],
  },
];

const SignIn = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    const data = {
      ...values,
      role: "admin",
    };
    console.log(data);
    localStorage.setItem("user_into", JSON.stringify(data));
    router("/");
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center-safe gap-5">
          <img
            src={AllImages.logo}
            alt="logo"
            className="w-auto h-[400px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                  Login to Account!
                </h1>
                <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                  Please enter your email and password to continue.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm onSubmit={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                />
              ))}
              <div className="flex justify-between items-center text-base mt-10 mb-5">
                <Checkbox className="!text-base-color">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!underline font-bold !text-secondary-color"
                >
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
