import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { UserType } from "../../types/userTypes";
import { Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";

interface AdminAllUsersTableProps {
  data: UserType[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: UserType) => void;
  showBlockModal: (record: UserType) => void;
  showUnblockModal: (record: UserType) => void;
  page?: number;
  total?: number;
  limit?: number;
}

const AdminAllUsersTable: React.FC<AdminAllUsersTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showBlockModal,
  // showUnblockModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      render: (text: number) => text.toString().padStart(2, "0"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      filterMultiple: false,
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: UserType) => (
        <>
          <Space size="middle">
            {/* Block User Tooltip */}
            {/* <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip> */}

            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
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
        </>
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

export default AdminAllUsersTable;
