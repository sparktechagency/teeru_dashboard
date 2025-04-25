/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import React from "react";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import { EventType } from "../../../types/EventType";

interface AdminEditEventModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: EventType | null;
}

const AdminEditEventModal: React.FC<AdminEditEventModalProps> = ({
  isEditModalVisible,
  handleCancel,
}) => {
  const [date, setDate] = React.useState<string | null>(null); // Ensuring date is always string | null

  const handleDateChange = (_date: any, dateString: string | string[]) => {
    // If an array of dates is passed, take the first date
    if (Array.isArray(dateString)) {
      setDate(dateString[0] || null); // Set only the first date or null
    } else {
      setDate(dateString); // If single date is selected, set it directly
    }
  };

  return (
    <Modal
      footer={null}
      open={isEditModalVisible}
      onCancel={handleCancel}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5">
        <ReusableForm onSubmit={() => {}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReuseInput
              label="Event Name"
              inputType="normal"
              name="name"
              type="text"
              placeholder="Event Name"
              rules={[{ required: true, message: "Please enter Event Name" }]}
            />
            <ReuseSelect
              label="Category"
              name="category"
              options={[
                { value: "Category 1", label: "Category 1" },
                { value: "Category 2", label: "Category 2" },
                { value: "Category 3", label: "Category 3" },
                { value: "Category 4", label: "Category 4" },
              ]}
              rules={[{ required: true, message: "Please select a category" }]}
              placeholder="Select Category"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReuseDatePicker
              name="date"
              label="Date"
              onChange={handleDateChange} // Handle date change
              placeholder="Select date"
              rules={[{ required: true }]}
            />
            <ReuseTimePicker
              label="Select Time"
              name="time"
              onChange={(time, timeString) => {
                console.log("Selected Time:", time);
                console.log("Time String:", timeString);
              }}
              date={date} // Pass the selected date to control time selection
              placeholder="Select time"
              rules={[{ required: true }]}
              disabled={!date} // Disable TimePicker if no date is selected
            />
          </div>
          <ReuseInput
            label="Location"
            inputType="normal"
            name="location"
            type="text"
            placeholder="Location"
            rules={[{ required: true, message: "Please enter Location" }]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReuseInput
              label="Tribune"
              inputType="normal"
              name="tribune"
              type="text"
              placeholder="Tribune"
              rules={[{ required: true, message: "Please enter Tribune" }]}
            />
            <ReuseInput
              label="Annexe Loge"
              inputType="normal"
              name="annexeLoge"
              type="text"
              placeholder="Annexe Loge"
              rules={[{ required: true, message: "Please enter Annexe Loge" }]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReuseInput
              label="Loge VIP"
              inputType="normal"
              name="logeVIP"
              type="text"
              placeholder="Loge VIP"
              rules={[{ required: true, message: "Please enter Loge VIP" }]}
            />
            <ReuseInput
              label="Loge VVIP"
              inputType="normal"
              name="logeVVIP"
              type="text"
              placeholder="Loge VVIP"
              rules={[{ required: true, message: "Please enter Loge VVIP" }]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReuseInput
              label="Service Fee"
              inputType="normal"
              name="serviceFee"
              type="text"
              placeholder="Service Fee"
              rules={[{ required: true, message: "Please enter Service Fee" }]}
            />
            <ReuseInput
              label="Processing Fee"
              inputType="normal"
              name="processingFee"
              type="text"
              placeholder="Processing Fee"
              rules={[
                { required: true, message: "Please enter Processing Fee" },
              ]}
            />
          </div>

          <ReuseButton variant="secondary" htmlType="submit" className="mt-8">
            Add{" "}
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminEditEventModal;
