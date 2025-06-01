import { Modal, Rate } from "antd";
import { formetDateAndTime } from "../../../utils/dateFormet";
import { IReview } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface AdminViewReviewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IReview | null;
}

const AdminViewReviewModal: React.FC<AdminViewReviewModalProps> = ({
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
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            User Feedback
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            See full details feedback from {currentRecord?.userId?.fullName}
          </p>
          <div className="flex justify-center items-center gap-1 mt-5">
            {/* Avatar */}
            <img
              src={imageApiUrl + currentRecord?.userId?.profileImage}
              alt={currentRecord?.userId?.fullName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold ">
              {currentRecord?.userId?.fullName}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="text-secondary-color">
                  {currentRecord?.userId?.fullName}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.userId?.email}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Rating :</span>
                <span className="text-justify pt-0 flex items-center">
                  <Rate disabled defaultValue={currentRecord?.rating} />
                  <span className="ml-2">{currentRecord?.rating}</span>
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Date :</span>
                <span className="text-justify pt-0 ">
                  {formetDateAndTime(currentRecord?.createdAt)}
                </span>
              </div>
              <div className="flex items-start  gap-2 mb-2">
                <span className="font-medium text-nowrap">Review :</span>
                <span className="text-justify pt-0 ">
                  {currentRecord?.comment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewReviewModal;
