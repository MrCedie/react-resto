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
import { TableInventoryColumn } from "../../../domain/interfaces/tableInventoryColumn";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import InventoryForm from "../components/form";
import { useDispatch, useSelector } from "react-redux";
import { filterTable } from "../../redux/slices/inventoryTableSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Status } from "../../../data/enum/status";
import { getProduct, getProducts } from "../../redux/thunks/productsThunks";
import { initializeTable } from "../../redux/thunks/inventoryThunks";
import { clearProduct } from "../../redux/slices/productsSlice";

type ProductsState = RootState["products"];
type InventoryState = RootState["inventory"];

const InvetoryScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { getProductsStatus: status, product } = useSelector<
    RootState,
    ProductsState
  >((state) => state.products);

  const { inventory, category, loading, selectedCategory } = useSelector<
    RootState,
    InventoryState
  >((state) => state.inventory);

  const handleRefetchFetchData = async () => {
    dispatch(getProducts());
  };

  const tableInventoryColumn: TableProps<TableInventoryColumn>["columns"] = [
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
          <div onClick={() => handleEditBtn(record.id)}>EDIT</div>
        </Space>
      ),
    },
  ];

  const handleEditBtn = (id: string) => {
    dispatch(getProduct(id));
    setIsModalOpen(true);
  };

  const handlFilter = (value: string) => {
    dispatch(filterTable(value));
  };

  const handleFormCloseModal = (): void => {
    setIsModalOpen(false);
    if (product != null) {
      dispatch(clearProduct());
    }
  };

  useEffect(() => {
    dispatch(initializeTable());
  }, [dispatch]);

  return (
    <div>
      <Row justify="space-between">
        <Button onClick={handleRefetchFetchData}>
          <ReloadOutlined />
        </Button>
        <Segmented
          value={selectedCategory ?? undefined}
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
        dataSource={inventory.map(
          (res, i) =>
            ({
              key: res.id ?? `product-${i}`,
              id: res.id ?? "",
              name: res.name,
              price: res.price,
              cost: res.cost,
              stock: res.stock,
            } as TableInventoryColumn)
        )}
        loading={status === Status.LOADING || loading}
        pagination={false}
      />
      <Modal
        title=""
        open={isModalOpen}
        footer=""
        onCancel={() => handleFormCloseModal()}
        destroyOnClose={true}
      >
        <InventoryForm
          closeModal={handleFormCloseModal}
          refreshTable={handleRefetchFetchData}
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
