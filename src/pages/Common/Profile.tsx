/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import { AllImages } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "userName",
    type: "text",
    inputType: "text",
    label: "User name",
    placeholder: "Enter your username",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "User name is required" }],
  },
  {
    name: "contactNumber",
    type: "text",
    inputType: "tel",
    label: "Contact number",
    placeholder: "Enter your contact number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Contact number is required" }],
  },
];

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user_into") || "null");
  const profileData = {
    userName: "James Mitchell",
    email: "emily@gmail.com",
    contactNumber: "+99-01846875456",
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-3xl text-primary-color font-semibold w-[95%] mx-auto">
          Profile
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" text-base-color rounded-lg h-full w-full lg:w-[70%]">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                className="h-36 w-36 rounded-full border-2 border-secondary-color relative"
                src={AllImages.profile}
                alt=""
              />
              <p className="text-4xl font-semibold">{profileData.userName}</p>
            </div>
            <div className="w-full flex justify-end mt-5">
              <ReuseButton
                className="!px-4"
                variant="secondary"
                htmlType="button"
                url={`/${user?.role}/profile/edit-profile`}
              >
                <div className="flex gap-3">
                  <EditOutlined
                    className="text-lg"
                    style={{ color: "#FAFAFA" }}
                  />
                  <p className="text-primary-color text-lg">Edit Profile</p>
                </div>
              </ReuseButton>
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-white mt-5">
            <ReusableForm
              onSubmit={onSubmit}
              className="!w-full"
              defaultValues={profileData}
            >
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
                  disabled
                />
              ))}
            </ReusableForm>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
