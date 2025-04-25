import { useState } from "react";
import { UserData } from "../../../public/data/Users";
import { UserType } from "../../types/userTypes";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllUsersTable from "../../ui/Tables/AdminAllUsersTable";
import AdminViewUsersModal from "../../ui/Modal/Users/AdminViewUsers";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";

const AdminAllUsers = () => {
  const data = UserData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<UserType | null>(null);

  const showViewUserModal = (record: UserType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: UserType) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: UserType) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = (data: UserType) => {
    console.log(data);
  };
  const handleUnblock = (data: UserType) => {
    console.log(data);
  };
  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl "
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              Users
            </p>
            <div className="h-fit">
              <SearchInput
                placeholder="Search ..."
                setSearch={setSearchText}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
        <div className="p-5">
          <AdminAllUsersTable
            data={data}
            loading={false}
            showViewModal={showViewUserModal}
            showBlockModal={showBlockModal}
            showUnblockModal={showUnblockModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
        </div>
        <AdminViewUsersModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <BlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
          description=" Are You Sure You want to Block This Player?"
        />
        <UnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleUnblock={handleUnblock}
          description=" Are You Sure You want to Unblock This Player?"
        />
      </div>
    </div>
  );
};

export default AdminAllUsers;
