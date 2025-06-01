/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import Cookies from "js-cookie";
import { decodedToken } from "../../utils/jwt";
import { IJwtPayload } from "../../types";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formetDateAndTime } from "../../utils/dateFormet";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";

interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ collapsed, setCollapsed }) => {
  const imageAPiUrl = getImageUrl();
  const token = Cookies.get("teeru_accessToken");
  const user = decodedToken(token || "") as IJwtPayload;
  const [open, setOpen] = useState(false);

  const { data, isFetching } = useGetNotificationQuery(
    { page: 1, limit: 5 },
    {
      skip: !open,
      refetchOnMountOrArgChange: open,
    }
  );

  const notifications = data?.data?.result;
  const { data: profile, isFetching: profileFetching } = useGetProfileQuery({});

  const profileData = profile?.data;

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {isFetching ? (
        <div className="flex items-center justify-center w-40 h-60">
          <FadeLoader color="#507D18" />
        </div>
      ) : (
        notifications?.map((notification: any) => (
          <div className="test-start" key={notification._id}>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#F3F8E2] rounded-full w-fit h-fit">
                <img src={AllIcons.bell} className="w-5 h-5" alt="" />
              </div>
              <div className="flex flex-col items-start">
                <p>{notification.message}</p>
                <p className="text-gray-400">
                  {formetDateAndTime(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        See More
      </Link>
    </div>
  );

  return (
    <div className="flex justify-between gap-0 items-center mt-1.5">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <div className=" p-1 bg-[#F3F8E2] rounded-full w-fit">
            <img src={AllIcons.bell} className="w-6 h-6" alt="" />
          </div>
        </Dropdown>
        {profileFetching ? (
          <div className="flex items-center">
            <FadeLoader color="#507D18" />
          </div>
        ) : (
          <Link to="profile">
            <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1 ">
              <img
                src={
                  imageAPiUrl + profileData?.profileImage || AllImages.profile
                }
                alt="profile_pic"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                className="rounded-full border border-secondary-color"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base-color font-semibold text-sm">
                  {profileData?.fullName || ""}
                </p>
                <p className="text-base-color text-xs">{profileData?.role}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
