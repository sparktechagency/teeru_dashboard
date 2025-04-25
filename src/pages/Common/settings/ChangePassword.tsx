/* eslint-disable @typescript-eslint/no-explicit-any */

import ReuseButton from "../../../ui/Button/ReuseButton";
import { FormInstance } from "antd";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";

const inputStructure = [
  {
    name: "currentPassword",
    type: "password",
    inputType: "password",
    label: "Current password",
    placeholder: "Enter your current password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Current password is required" }],
    showPasswordToggle: true,
  },
  {
    name: "newPassword",
    type: "password",
    inputType: "password",
    label: "New password",
    placeholder: "Enter your new password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "New password is required" }],
    showPasswordToggle: true,
  },
  {
    name: "confirmNewPassword",
    type: "password",
    inputType: "password",
    label: "Confirm New password",
    placeholder: "Enter your new password again",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [
      { required: true, message: "Confirm Password is required" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Password does not match!"));
        },
      }),
    ],
    showPasswordToggle: true,
  },
];

const ChangePassword = () => {
  //   const user = JSON.parse(localStorage.getItem("user_into") || "null");
  const onFinish = (values: any) => {
    console.log("Success:", values);
    localStorage.removeItem("user_into");
    window.location.reload();
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl text-primary-color font-semibold">
            Change Password
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full">
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
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="w-full mt-4"
            >
              Change Password
            </ReuseButton>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
