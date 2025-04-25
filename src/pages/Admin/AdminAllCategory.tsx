import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import categoryData from "../../../public/data/CategoryData";
import { CategoryType } from "../../types/CategoryType";
import AdminAllCategoryTable from "../../ui/Tables/AdminAllCategoryTable";
import ReuseButton from "../../ui/Button/ReuseButton";
import AdminAllCategoryModal from "../../ui/Modal/Category/AdminAddCategoryModal";
import { GoPlusCircle } from "react-icons/go";

const AdminAllCategory = () => {
  const data = categoryData;
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<CategoryType | null>(null);

  const showAddCategoryModal = () => {
    setIsAddModalVisible(true);
  };

  const showDeleteModal = (record: CategoryType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: CategoryType) => {
    console.log(data);
  };
  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              Reviews
            </p>
          </div>
        </div>

        <div className="mt-5 px-4">
          <ReuseButton
            variant="secondary"
            className="my-5 !text-2xl flex items-center justify-center !py-6 font-bold"
            onClick={showAddCategoryModal}
          >
            <GoPlusCircle className="" /> Add Category
          </ReuseButton>
          <AdminAllCategoryTable
            data={data}
            loading={false}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
          <AdminAllCategoryModal
            isAddModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as CategoryType)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllCategory;
//
