import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { UserType } from "../../types/userTypes";
import { ConfigProvider } from "antd";

interface RecentUsersTableProps {
  data: UserType[];
  loading: boolean;
  setPage?: (page: number) => void;
  page?: number;
  total?: number;
  limit?: number;
}

const RecentUsersTable: React.FC<RecentUsersTableProps> = ({
  data,
  loading,
  setPage,
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
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorTextQuaternary: "#ffffff",
            colorIcon: "#ffffff",
            headerBg: "#507D18",
            colorBgContainer: "#ffffff",
            colorText: "#111111",
            borderColor: "#ffffff",
            headerColor: "#ffffff",
            fontSize: 18,
            footerColor: "#FDFDFD",
            // marginXXS: 4,
            colorLinkActive: "#FDFDFD",
            headerSplitColor: "#ffffff",
          },
        },
      }}
    >
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
    </ConfigProvider>
  );
};

export default RecentUsersTable;
