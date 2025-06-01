/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import dayjs from "dayjs";

import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import { ICategoryType, IEventType } from "../../../types";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryAPi";
import { FadeLoader } from "react-spinners";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateEventMutation } from "../../../redux/features/event/eventApi";

interface AdminEditEventModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventType | null;
}

const AdminEditEventModal: React.FC<AdminEditEventModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [editEvent] = useUpdateEventMutation();
  const [form] = Form.useForm();
  const [date, setDate] = React.useState<string | null>(null); // Ensuring date is always string | null

  const handleDateChange = (_date: any, dateString: string | string[]) => {
    // If an array of dates is passed, take the first date
    if (Array.isArray(dateString)) {
      setDate(dateString[0] || null); // Set only the first date or null
    } else {
      setDate(dateString); // If single date is selected, set it directly
    }
  };

  const { data, isFetching } = useGetCategoryQuery(
    {
      page: 1,
      limit: 999999,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isEditModalVisible,
    }
  );

  const allCategory: ICategoryType[] = data?.data?.result;

  // Set initial form values when currentRecord changes
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        name: currentRecord.name,
        category: currentRecord.category?._id || null,
        date: currentRecord.date ? dayjs(currentRecord.date) : null,
        time: currentRecord.time ? dayjs(currentRecord.time, "HH:mm") : null,
        location: currentRecord.location,
        tribune: currentRecord.ticketPrices?.tribune ?? "",
        annexeLoge: currentRecord.ticketPrices?.annexeLoge ?? "",
        logeVIP: currentRecord.ticketPrices?.logeVIP ?? "",
        logeVVIP: currentRecord.ticketPrices?.logeVVIP ?? "",
        serviceFee: currentRecord.ticketPrices?.serviceFee ?? "",
        processingFee: currentRecord.ticketPrices?.processingFee ?? "",
      });
    } else {
      form.resetFields();
    }
  }, [currentRecord, form]);

  // Handle form submit and transform values
  const handleFinish = async (values: any) => {
    const dateISO = values.date ? values.date.toISOString() : null;
    const timeStr = values.time ? values.time.format("HH:mm") : null;

    const payload = {
      name: values.name,
      category: values.category,
      date: dateISO,
      time: timeStr,
      location: values.location,
      ticketPrices: {
        tribune: Number(values.tribune),
        annexeLoge: Number(values.annexeLoge),
        logeVIP: Number(values.logeVIP),
        logeVVIP: Number(values.logeVVIP),
        serviceFee: Number(values.serviceFee),
        processingFee: Number(values.processingFee),
      },
    };

    const res = await tryCatchWrapper(
      editEvent,
      { body: payload, params: currentRecord?._id },
      "Deleting Event..."
    );
    if (res.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      footer={null}
      open={isEditModalVisible}
      onCancel={handleCancel}
      centered
      className="lg:!w-[800px]"
      destroyOnClose
    >
      <div className="p-5">
        {isFetching ? (
          <div className="flex justify-center items-center h-[500px]">
            <FadeLoader color="#507d18" />
          </div>
        ) : (
          <ReusableForm form={form} handleFinish={handleFinish}>
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
                placeholder="Select date"
                onChange={handleDateChange} // Handle date change
                rules={[{ required: true, message: "Please select a date" }]}
              />
              <ReuseTimePicker
                date={date}
                name="time"
                label="Select Time"
                placeholder="Select time"
                rules={[{ required: true, message: "Please select a time" }]}
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
              Update
            </ReuseButton>
          </ReusableForm>
        )}
      </div>
    </Modal>
  );
};

export default AdminEditEventModal;
