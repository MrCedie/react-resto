import { useEffect, useState } from "react";
import {
  Button,
  FloatButton,
  Modal,
  Row,
  Segmented,
  Space,
  Table,
  TableProps,
} from "antd";
import { TableInventoryType } from "../../../domain/types/table-inventory-type";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import InventoryForm from "../components/form";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTable,
  setCategory,
  setData,
} from "../../../domain/reducers/inventoryTableSlice";
import {
  getProductsFirebase,
  getCategoryFirebase,
} from "../../../data/api/firebaseService";
import { RootState } from "../../../domain/store/store";

type InventoryTableState = RootState["inventoryTable"];

const InvetoryScreen = () => {
  const dispatch = useDispatch();
  const { data, table, category } = useSelector<RootState, InventoryTableState>(
    (state: any) => state.inventoryTable
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setCategorySegment] = useState<string | undefined>(
    undefined
  );
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchData = async () => {
    setLoading(true);
    const list: any = await getProductsFirebase();
    if (list) {
      dispatch(setData(list));
    }
    setLoading(false);
  };

  const handleRefetchData = async () => {
    await handleFetchData();
    if (selectedCategory) {
      handlFilter(selectedCategory);
    }
  };

  const getCategory = async () => {
    const list = await getCategoryFirebase();
    if (list) {
      dispatch(setCategory(list));
    }
  };

  const tableInventoryColumn: TableProps<TableInventoryType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditBtn(record.id)}>EDIT</a>
        </Space>
      ),
    },
  ];

  const handleEditBtn = (id: string) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handlFilter = (value: string) => {
    setCategorySegment(value);
    dispatch(filterTable(value));
  };

  function handleFormCloseModal(): void {
    setIsModalOpen(false);
    setId(null);
  }

  const handleRefeshTable = () => {
    handleFetchData();
    getCategory();
  };

  useEffect(() => {
    handleRefeshTable();
  }, []);

  useEffect(() => {
    if (category.length > 0 && data.length > 0 && selectedCategory == null) {
      handlFilter(category[0].id);
    }
  }, [category]);

  return (
    <div>
      <Row justify="space-between">
        <Button onClick={handleRefeshTable}>
          <ReloadOutlined />
        </Button>
        <Segmented
          value={selectedCategory}
          onChange={(value: string) => handlFilter(value)}
          options={category.map((res) => ({
            label: res.name,
            value: res.id,
          }))}
        />
      </Row>
      <br />
      <Table
        columns={tableInventoryColumn}
        dataSource={table}
        loading={loading}
      />
      <Modal
        title=""
        open={isModalOpen}
        footer=""
        onCancel={() => handleFormCloseModal()}
        destroyOnClose={true}
      >
        <InventoryForm
          id={id}
          closeModal={handleFormCloseModal}
          refreshTable={handleRefetchData}
        />
      </Modal>
      <FloatButton
        onClick={() => setIsModalOpen(true)}
        shape="square"
        type="primary"
        style={{ right: 30 }}
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default InvetoryScreen;
