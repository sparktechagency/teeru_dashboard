import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IUserType } from "../../../types";
interface AdminViewUsersModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUserType | null;
}
const AdminViewUsersModal: React.FC<AdminViewUsersModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const imageApiUrl = getImageUrl();
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.fullName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={imageApiUrl + currentRecord?.profileImage}
              alt={currentRecord?.fullName}
              className="w-16 h-16 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.fullName}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              Personal Information
            </h2>
            <div className="text-lg  mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="">{currentRecord?.fullName}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Phone:</span>
                <span>{currentRecord?.phone}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Gender:</span>
                <span>{currentRecord?.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewUsersModal;
