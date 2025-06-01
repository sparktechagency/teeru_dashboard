/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import React from "react";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryAPi";
import { ICategoryType } from "../../../types";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddEventMutation } from "../../../redux/features/event/eventApi";
import { FadeLoader } from "react-spinners";

interface AdminAddEventModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AdminAddEventModal: React.FC<AdminAddEventModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [addEvent] = useAddEventMutation();
  const [date, setDate] = React.useState<string | null>(null); // Ensuring date is always string | null

  const { data, isFetching } = useGetCategoryQuery(
    {
      page: 1,
      limit: 999999,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isAddModalVisible,
    }
  );

  const allCategory: ICategoryType[] = data?.data?.result;

  const handleDateChange = (_date: any, dateString: string | string[]) => {
    // If an array of dates is passed, take the first date
    if (Array.isArray(dateString)) {
      setDate(dateString[0] || null); // Set only the first date or null
    } else {
      setDate(dateString); // If single date is selected, set it directly
    }
  };

  const handleSubmit = async (values: any) => {
    const dateISO = values.date
      ? values.date.format("YYYY-MM-DDTHH:mm:ss") // local time ISO string without 'Z'
      : new Date().toISOString();
    const timeStr = values.time?.format?.("HH:mm") || "";

    const ticketPrices = {
      tribune: Number(values.tribune),
      annexeLoge: Number(values.annexeLoge),
      logeVIP: Number(values.logeVIP),
      logeVVIP: Number(values.logeVVIP),
      serviceFee: Number(values.serviceFee),
      processingFee: Number(values.processingFee),
    };

    const payload = {
      name: values.name,
      category: values.category,
      date: dateISO,
      time: timeStr,
      location: values.location,
      ticketPrices,
    };

    const res = await tryCatchWrapper(
      addEvent,
      { body: payload },
      "Deleting Event..."
    );
    if (res.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      footer={null}
      open={isAddModalVisible}
      onCancel={handleCancel}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5">
        {isFetching ? (
          <div className="flex justify-center items-center h-[500px]">
            <FadeLoader color="#507d18" />
          </div>
        ) : (
          <ReusableForm form={form} handleFinish={handleSubmit}>
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
                options={allCategory?.map((category) => ({
                  value: category?._id,
                  label: category?.name,
                }))}
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
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
                type="number"
                placeholder="Tribune"
                rules={[{ required: true, message: "Please enter Tribune" }]}
              />
              <ReuseInput
                label="Annexe Loge"
                inputType="normal"
                name="annexeLoge"
                type="number"
                placeholder="Annexe Loge"
                rules={[
                  { required: true, message: "Please enter Annexe Loge" },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseInput
                label="Loge VIP"
                inputType="normal"
                name="logeVIP"
                type="number"
                placeholder="Loge VIP"
                rules={[{ required: true, message: "Please enter Loge VIP" }]}
              />
              <ReuseInput
                label="Loge VVIP"
                inputType="normal"
                name="logeVVIP"
                type="number"
                placeholder="Loge VVIP"
                rules={[{ required: true, message: "Please enter Loge VVIP" }]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseInput
                label="Service Fee"
                inputType="normal"
                name="serviceFee"
                type="number"
                placeholder="Service Fee"
                rules={[
                  { required: true, message: "Please enter Service Fee" },
                ]}
              />
              <ReuseInput
                label="Processing Fee"
                inputType="normal"
                name="processingFee"
                type="number"
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
        )}
      </div>
    </Modal>
  );
};

export default AdminAddEventModal;
