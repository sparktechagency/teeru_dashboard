import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import { eventData } from "../../../public/data/EventsData";
import ReuseButton from "../../ui/Button/ReuseButton";
import { GoPlusCircle } from "react-icons/go";
import { EventType } from "../../types/EventType";
import AdminAllEventTable from "../../ui/Tables/AdminAllEventTable";
import AdminAddEventModal from "../../ui/Modal/Event/AdminAddEventModa";
import AdminEditEventModal from "../../ui/Modal/Event/AdminEditEventModal";

const AdminAllEvent = () => {
  const data = eventData;
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<EventType | null>(null);

  const showAddEventModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditEventModal = (record: EventType) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: EventType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: EventType) => {
    console.log(data);
  };
  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              Events
            </p>
          </div>
        </div>

        <div className="mt-5 px-4">
          <ReuseButton
            variant="secondary"
            className="my-5 !text-2xl flex items-center justify-center !py-6 font-bold"
            onClick={showAddEventModal}
          >
            <GoPlusCircle className="" /> Create Event
          </ReuseButton>
          <AdminAllEventTable
            data={data}
            loading={false}
            showEditModal={showEditEventModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
          <AdminAddEventModal
            isAddModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          <AdminEditEventModal
            isEditModalVisible={isEditModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as EventType)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllEvent;
