import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import RecentNotification from "../../Components/Dashboard/Overview/RecentNotification";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import { useGetUserRatioQuery } from "../../redux/features/dashboard/dashboardApi";

const AdminDashboard = () => {
  const { data, isFetching } = useGetUserRatioQuery({});
  const totalUser = data?.data?.totalUsers || 0;
  const totalEarning = data?.data?.totalEarnings || 0;
  return (
    <div>
      <>
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
          <div className="lg:col-span-4">
            <OverviewCard totalUser={totalUser} totalEarning={totalEarning} />
            <UserOverview />
          </div>
          <div className="lg:col-span-2">
            <RecentNotification />
          </div>
        </div>
        <div>
          <RecentUser />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
