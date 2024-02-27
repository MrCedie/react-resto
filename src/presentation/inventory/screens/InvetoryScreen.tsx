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
  setData,
} from "../../../domain/reducers/inventoryTableSlice";
import { fetchDataFirebase } from "../../../data/api/firebaseService";
import Column from "antd/es/table/Column";

const InvetoryScreen = () => {
  const dispatch = useDispatch();
  const { table } = useSelector((state: any) => state.inventoryTable);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("SANDWICH");
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchData = async () => {
    setLoading(true);
    const list: any = await fetchDataFirebase();
    if (list) {
      dispatch(setData(list));
      handlFilter(category);
    }
    setLoading(false);
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
      title: "Option",
      dataIndex: "option",
      key: "option",
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

  const handleAddBtn = () => {
    setIsModalOpen(true);
  };

  const handleEditBtn = (id: string) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handlFilter = (value: string) => {
    setCategory(value);
    dispatch(filterTable(value));
  };

  function handleFormCloseModal(): void {
    setIsModalOpen(false);
    setId(null);
  }

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div>
      <Row justify="space-between">
        <Button onClick={handleFetchData}>
          <ReloadOutlined />
        </Button>
        <Segmented
          value={category}
          onChange={(value: string) => handlFilter(value)}
          options={[
            {
              label: "Sandwich",
              value: "SANDWICH",
            },
            {
              label: "Chicken",
              value: "CHICKEN",
            },
            {
              label: "Pasta",
              value: "PASTA",
            },
            {
              label: "Drinks",
              value: "DRINKS",
            },
          ]}
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
          refreshTable={handleFetchData}
        />
      </Modal>
      <FloatButton
        onClick={handleAddBtn}
        shape="square"
        type="primary"
        style={{ right: 30 }}
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default InvetoryScreen;
