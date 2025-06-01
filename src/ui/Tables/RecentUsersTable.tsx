import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { IUserType } from "../../types/userTypes";
import { ConfigProvider } from "antd";
import { getImageUrl } from "../../helpers/config/envConfig";
import { formetDateAndTime } from "../../utils/dateFormet";
import { ColumnsType } from "antd/es/table";

interface RecentUsersTableProps {
  data: IUserType[];
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
  const imageApiUrl = getImageUrl();
  const columns: ColumnsType<IUserType> = [
    {
      title: "#SI",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: IUserType) => (
        <div className="flex items-center gap-2">
          <img
            src={imageApiUrl + record?.profileImage}
            alt="User"
            className="w-10 h-10 object-cover rounded"
          />
          <p>{text}</p>
        </div>
      ),
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
      // filters: [
      //   { text: "Male", value: "male" },
      //   { text: "Female", value: "female" },
      // ],
      // filterMultiple: false,
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formetDateAndTime(date),
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
