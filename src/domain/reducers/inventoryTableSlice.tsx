import { createSlice } from "@reduxjs/toolkit";
import { IdNameType } from "../types/id-name-type";

export interface InventoryTableState {
  data: any;
  table: any;
  category: IdNameType[];
}

const initialState: InventoryTableState = {
  data: [],
  table: [],
  category: [],
};

const inventoryTableSlice = createSlice({
  name: "inventoryTable",
  initialState,
  reducers: {
    setData(state, payload) {
      const data = payload.payload;
      const parse = Object.keys(data).map((res) => {
        return {
          ...data[res],
          id: res,
          key: res,
        };
      });
      state.data = parse;
    },
    setCategory(state, payload) {
      const data = payload.payload;
      const parse = Object.keys(data).map((res) => {
        return {
          id: res,
          name: data[res].name,
        };
      });
      state.category = parse;
    },
    filterTable(state, payload) {
      let tableList: any = [];
      state.data.forEach((res: any) => {
        if (res.categoryId === payload.payload) {
          tableList.push(res);
        }
      });
      state.table = tableList;
    },
  },
});

export const { setData, filterTable, setCategory } =
  inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;
