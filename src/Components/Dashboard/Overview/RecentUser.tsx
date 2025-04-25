/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserData } from "../../../../public/data/Users";
import RecentUsersTable from "../../../ui/Tables/RecentUsersTable";

const RecentUser = () => {
  const recentUserData: any = UserData.slice(0, 6);

  // const [isRecentUserViewModalVisible, setIsRecentUserViewModalVisible] =
  //   useState(false);
  // const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  // const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  // const [currentRecord, setCurrentRecord] = useState(null);

  // const showViewUserModal = (record) => {
  //   setCurrentRecord(record);
  //   setIsRecentUserViewModalVisible(true);
  // };

  // const showBlockModal = (record) => {
  //   setCurrentRecord(record);
  //   setIsBlockModalVisible(true);
  // };
  // const showUnblockModal = (record) => {
  //   setCurrentRecord(record);
  //   setIsUnblockModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsRecentUserViewModalVisible(false);
  //   setIsBlockModalVisible(false);
  //   setIsUnblockModalVisible(false);
  //   setCurrentRecord(null);
  // };
  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center py-2">
        <p className="text-2xl text-base-color lg:text-3xl font-bold mb-3">
          Recent All Users
        </p>
      </div>

      <div
        className=" rounded-xl "
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <RecentUsersTable data={recentUserData} loading={false} />
      </div>
      {/* <UserModal
        isUserViewModalVisible={isRecentUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showFilters={false}
      />
      <UserBlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <UserUnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      /> */}
    </div>
  );
};

export default RecentUser;
