/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { MdDelete, MdEdit } from "react-icons/md";
import { ColumnsType } from "antd/es/table";
import { IEventType } from "../../types";
import { formatDate } from "../../utils/dateFormet";
import { getImageUrl } from "../../helpers/config/envConfig";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface AdminAllEventTableProps {
  data: IEventType[];
  loading: boolean;
  showEditModal: (record: IEventType) => void;
  showDeleteModal: (record: IEventType) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllEventTable as a functional component
const AdminAllEventTable: React.FC<AdminAllEventTableProps> = ({
  data,
  loading,
  showEditModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const { t } = useTranslation();
  const imageApiUrl = getImageUrl();
  const columns: ColumnsType<IEventType> = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: t("event_table.event_name"),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: IEventType) => (
        <div className="flex items-center gap-2">
          {record?.image && (
            <img
              src={imageApiUrl + record.image}
              alt={text}
              className="w-10 h-10 object-cover rounded"
            />
          )}
          <p>{text}</p>
        </div>
      ),
      width: 300,
      fixed: "left",
    },
    {
      title: t("event_table.category"),
      dataIndex: ["category", "name"],
      key: "category",
      align: "center",
      render: (text: string, record: IEventType) =>
        text ? (
          <div className="flex items-center gap-2">
            {record?.category?.image && (
              <img
                src={imageApiUrl + record.category.image}
                alt={text}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <p>{text}</p>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: t("event_table.date_time"),
      dataIndex: "date",
      key: "date",
      render: (text: string, record: IEventType) => {
        // formatDate formats createdAt date part
        const formattedDate = formatDate(text);

        // record.time is a "HH:mm" string like "00:00"
        // parse it with dayjs and format to 12-hour with AM/PM
        const formattedTime = dayjs(record.time, "HH:mm").format("hh:mm A");

        return `${formattedDate} - ${formattedTime}`;
      },
    },
    {
      title: t("event_table.location"),
      dataIndex: "location",
      key: "location",
    },
    {
      title: t("event_table.head_to_head"),
      dataIndex: "head_to_head",
      key: "head_to_head",
    },
    {
      title: t("event_table.ticket_prices"),
      dataIndex: "ticketPrices",
      key: "ticketPrices",
      render: (ticketPrices: any) => {
        return (
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            <span>Tribune: {ticketPrices.tribune}</span>
            <span>Annexe Loge: {ticketPrices.annexeLoge}</span>
            <span>Loge VIP: {ticketPrices.logeVIP}</span>
            <span>Loge VVIP: {ticketPrices.logeVVIP}</span>
          </div>
        );
      },
    },
    {
      title: t("event_table.service_fee"),
      dataIndex: ["ticketPrices", "serviceFee"],
      key: "serviceFee",
      align: "center",
    },
    {
      title: t("event_table.processing_fee"),
      dataIndex: ["ticketPrices", "processingFee"],
      key: "processingFee",
      align: "center",
    },
    {
      title: t("event_table.action"),
      key: "action",
      render: (_: unknown, record: IEventType) => (
        <Space size="middle">
          <Tooltip placement="left" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="left" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default AdminAllEventTable;
