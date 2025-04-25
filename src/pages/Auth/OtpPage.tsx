"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AuthImages } from "../../../public/images/AllImages";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = () => {
    if (otp.length === 6) {
      console.log("OTP:", otp);
      if (window?.location?.pathname === "/sign-up/otp-verify") {
        router("/");
      } else {
        router("/update-password");
      }
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-5">
          <img
            src={AuthImages.otp}
            alt="logo"
            className="w-auto h-[500px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <div className=" mt-5 mb-8">
              <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                Verify OTP
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                Please check your email. We have sent a code to contact
                @gmail.com
              </p>
            </div>

            <Form
              onFinish={handleOTPSubmit}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[35px] !h-[40px] sm:!w-[60px] sm:!h-[50px] text-[20px] sm:text-[30px] !bg-primary-color border !border-base-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                variant="gradient"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p className="!text-secondary-color !underline font-semibold cursor-pointer">
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
