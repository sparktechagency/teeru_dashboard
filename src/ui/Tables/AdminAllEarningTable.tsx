import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { IEarning } from "../../types";
interface AdminAllEarningTableProps {
  data: IEarning[];
  loading: boolean;
  showViewModal: (record: IEarning) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllEarningTable as a functional component
const AdminAllEarningTable: React.FC<AdminAllEarningTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "Full Name",
      dataIndex: ["user_id", "fullName"], // Data key for fullName
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: ["user_id", "email"], // Data key for email
      key: "email",
    },
    {
      title: "Event Name",
      dataIndex: ["ticketId", "eventId", "name"], // Data key for email
      key: "amount",
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for email
      key: "amount",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId", // Data key for email
      key: "transactionId",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus", // Data key for paymentStatus
      key: "paymentStatus",
      render: (text: string) =>
        text === "completed" ? (
          <span className="text-green-500">Completed</span>
        ) : (
          "Pending"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IEarning) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
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

export default AdminAllEarningTable;
