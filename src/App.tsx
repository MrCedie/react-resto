import "./App.css";
import { Provider } from "react-redux";
import store from "./presentation/redux/store";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InvetoryScreen from "./presentation/inventory/screens/InvetoryScreen";
import CashierScreen from "./presentation/cashier/cashier";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <InvetoryScreen />,
    },
    {
      path: "/cashier",
      element: <CashierScreen />,
    },
  ]);

  return (
    <Provider store={store}>
      <Layout style={{ height: "100vh" }}>
        <Header className="main-header"></Header>
        <Content className="main-content">
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
