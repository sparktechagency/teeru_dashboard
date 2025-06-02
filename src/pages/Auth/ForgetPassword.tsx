/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AuthImages } from "../../../public/images/AllImages";
import { Form } from "antd";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

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
];

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();
  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      { body: values },
      "Sending OTP..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.set("teeru_forgetToken", res.data.forgetToken, {
        path: "/",
        expires: 1,
      });
      router("/forgot-password/otp-verify");
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center-safe gap-5 ">
          <img
            src={AuthImages.ForgotPassword}
            alt="logo"
            className="w-auto h-[500px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <div className=" mt-5 mb-8">
              <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                Forget password
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                Enter your email address to ger a verification code for
                resetting your password.
              </p>
            </div>

            <ReusableForm form={form} handleFinish={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  Typolevel={4}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseButton
                variant="gradient"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                Get OTP
              </ReuseButton>
            </ReusableForm>

            <div className="text-base-color w-fit mx-auto mt-10">
              <Link
                to="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
