import { createSlice } from "@reduxjs/toolkit";

interface InventoryTableState {
  data: any;
  table: any;
}

const initialState: InventoryTableState = {
  data: [],
  table: [],
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
    filterTable(state, payload) {
      let tableList: any = [];
      state.data.forEach((res: any) => {
        if (res.category === payload.payload) {
          tableList.push(res);
        }
      });
      state.table = tableList;
    },
  },
});

export const { setData, filterTable } = inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;
