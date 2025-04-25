import { MdArrowBackIos } from "react-icons/md";
import { AllIcons } from "../../../public/images/AllImages";

const notifications = [
  {
    id: "1",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "2",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "3",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "4",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "5",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "6",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "7",
    activity: "New user has joined in your application.",
    time: "3:00 PM",
  },
  {
    id: "8",
    activity: "New user has joined in your application.",
    time: "3:30 PM",
  },
  {
    id: "9",
    activity: "New user has joined in your application.",
    time: "4:00 PM",
  },
  {
    id: "10",
    activity: "New user has joined in your application.",
    time: "4:15 PM",
  },
  {
    id: "11",
    activity: "New user has joined in your application.",
    time: "5:00 PM",
  },
  {
    id: "12",
    activity: "New user has joined in your application.",
    time: "5:30 PM",
  },
  {
    id: "13",
    activity: "New user has joined in your application.",
    time: "6:00 PM",
  },
  {
    id: "14",
    activity: "New user has joined in your application.",
    time: "6:15 PM",
  },
  {
    id: "15",
    activity: "New user has joined in your application.",

    time: "6:30 PM",
  },
];

const Notifications = () => {
  return (
    <div
      className=" bg-slate-50  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">
          All Notifications
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className=" p-1 bg-[#F3F8E2] rounded-full w-fit">
              <img src={AllIcons.bell} className="w-7 h-7" alt="" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification.activity}
              </span>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notifications;
