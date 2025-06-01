import { Modal } from "antd";
import { formetDateAndTime } from "../../../utils/dateFormet";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IEarning } from "../../../types";
import ReuseTable from "../../../utils/ReuseTable";

interface AdminViewEarningModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEarning | null;
}

const columns = [
  {
    title: "Name",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Seat",
    dataIndex: "seat",
    key: "seat",
    align: "center",
  },
];

const AdminViewEarningModal: React.FC<AdminViewEarningModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const imageApiUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            Earning Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            See full details earning from {currentRecord?.user_id?.fullName}
          </p>
          <div className="flex justify-center items-center gap-1 mt-5">
            {/* Avatar */}
            <img
              src={imageApiUrl + currentRecord?.user_id?.profileImage}
              alt={currentRecord?.user_id?.fullName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold ">
              {currentRecord?.user_id?.fullName}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="text-secondary-color">
                  {currentRecord?.user_id?.fullName}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.user_id?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Event Name:</span>
                <span>{currentRecord?.ticketId?.eventId?.name}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Amount:</span>
                <span>{currentRecord?.amount}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>{currentRecord?.transactionId}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Payment Method:</span>
                <span>{currentRecord?.paymentMethod}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Payment Status:</span>
                <span>{currentRecord?.paymentStatus}</span>
              </div>
              <div className="flex items-center  gap-2 mb-5">
                <span className="font-medium">Date :</span>
                <span className="text-justify pt-0 ">
                  {formetDateAndTime(currentRecord?.createdAt)}
                </span>
              </div>

              {currentRecord?.ticketId?.tickets && (
                <ReuseTable
                  data={currentRecord.ticketId.tickets}
                  columns={columns}
                  loading={false}
                  keyValue={"name"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewEarningModal;
