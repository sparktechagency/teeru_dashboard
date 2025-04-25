import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { MdDelete } from "react-icons/md";
import { CategoryType } from "../../types/CategoryType";

interface AdminAllCategoryTableProps {
  data: CategoryType[];
  loading: boolean;
  showDeleteModal: (record: CategoryType) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllCategoryTable as a functional component
const AdminAllCategoryTable: React.FC<AdminAllCategoryTableProps> = ({
  data,
  loading,
  showDeleteModal,
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
      title: "Category Name",
      dataIndex: "categoryName", // Data key for categoryName
      key: "categoryName",
    },
    {
      title: "Category Image",
      dataIndex: "categoryImage", // Data key for categoryImage
      key: "categoryImage",
      render: (image: string) => (
        <img
          src={image}
          alt="Category"
          className="w-auto h-20 object-cover rounded"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: CategoryType) => (
        <Space size="middle">
          <Tooltip placement="left" title="Block this User">
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

export default AdminAllCategoryTable;
