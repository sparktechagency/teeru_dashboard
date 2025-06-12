/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import { useTranslation } from "react-i18next";
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
import ReuseUpload from "../../Form/ReuseUpload";

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
  const { t } = useTranslation(); // Hook to access translations
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
        head_to_head: currentRecord.head_to_head,
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
    const formData = new FormData();

    const dateISO = values.date ? values.date.toISOString() : null;
    const timeStr = values.time ? values.time.format("HH:mm") : null;

    const payload = {
      name: values.name,
      category: values.category,
      date: dateISO,
      time: timeStr,
      location: values.location,
      head_to_head: values.head_to_head,
      ticketPrices: {
        tribune: Number(values.tribune),
        annexeLoge: Number(values.annexeLoge),
        logeVIP: Number(values.logeVIP),
        logeVVIP: Number(values.logeVVIP),
        serviceFee: Number(values.serviceFee),
        processingFee: Number(values.processingFee),
      },
    };
    if (values?.image[0]?.originFileObj) {
      formData.append("image", values?.image[0]?.originFileObj);
    }
    formData.append("data", JSON.stringify(payload));
    const res = await tryCatchWrapper(
      editEvent,
      { body: formData, params: currentRecord?._id },
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
                label={t("event_form.event_name")}
                inputType="normal"
                name="name"
                type="text"
                placeholder={t("event_form.event_name_placeholder")}
                rules={[
                  { required: true, message: t("event_form.event_name") },
                ]}
              />
              <ReuseSelect
                label={t("event_form.category")}
                name="category"
                options={allCategory?.map((category) => ({
                  value: category?._id,
                  label: category?.name,
                }))}
                rules={[{ required: true, message: t("event_form.category") }]}
                placeholder={t("event_form.category_placeholder")}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseDatePicker
                name="date"
                label={t("event_form.date")}
                placeholder={t("event_form.date_placeholder")}
                onChange={handleDateChange}
                rules={[{ required: true, message: t("event_form.date") }]}
              />
              <ReuseTimePicker
                date={date}
                name="time"
                label={t("event_form.select_time")}
                placeholder={t("event_form.select_time_placeholder")}
                rules={[
                  { required: true, message: t("event_form.select_time") },
                ]}
              />
            </div>
            <ReuseInput
              label={t("event_form.location")}
              inputType="normal"
              name="location"
              type="text"
              placeholder={t("event_form.location_placeholder")}
              rules={[{ required: true, message: t("event_form.location") }]}
            />{" "}
            <div>
              <ReuseUpload name="image" label={t("event_form.event_image")} />
              <p>{currentRecord?.image}</p>
            </div>
            <div className="mt-5">
              <ReuseInput
                label={t("event_form.head_to_head")}
                inputType="normal"
                name="head_to_head"
                type="text"
                placeholder={t("event_form.head_to_head_placeholder")}
                rules={[{ required: true, message: t("event_form.location") }]}
              />
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
              <ReuseInput
                label={t("event_form.tribune")}
                inputType="normal"
                name="tribune"
                type="number"
                placeholder={t("event_form.tribune_placeholder")}
                rules={[{ required: true, message: t("event_form.tribune") }]}
              />
              <ReuseInput
                label={t("event_form.annexe_loge")}
                inputType="normal"
                name="annexeLoge"
                type="number"
                placeholder={t("event_form.annexe_loge_placeholder")}
                rules={[
                  { required: true, message: t("event_form.annexe_loge") },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseInput
                label={t("event_form.loge_vip")}
                inputType="normal"
                name="logeVIP"
                type="number"
                placeholder={t("event_form.loge_vip_placeholder")}
                rules={[{ required: true, message: t("event_form.loge_vip") }]}
              />
              <ReuseInput
                label={t("event_form.loge_vvip")}
                inputType="normal"
                name="logeVVIP"
                type="number"
                placeholder={t("event_form.loge_vvip_placeholder")}
                rules={[{ required: true, message: t("event_form.loge_vvip") }]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseInput
                label={t("event_form.service_fee")}
                inputType="normal"
                name="serviceFee"
                type="number"
                placeholder={t("event_form.service_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.service_fee") },
                ]}
              />
              <ReuseInput
                label={t("event_form.processing_fee")}
                inputType="normal"
                name="processingFee"
                type="number"
                placeholder={t("event_form.processing_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.processing_fee") },
                ]}
              />
            </div>
            <ReuseButton variant="secondary" htmlType="submit" className="mt-8">
              {t("event_form.update")}
            </ReuseButton>
          </ReusableForm>
        )}
      </div>
    </Modal>
  );
};

export default AdminEditEventModal;
