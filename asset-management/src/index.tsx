import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './component/page/MainPage';
import NotFoundPage from './component/page/NotFoundPage';
import EditPage from './component/page/EditPage';
import StockPage from './component/page/StockPage';
import CoinPage from './component/page/CoinPage';
import CashPage from './component/page/CashPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element:  <MainPage />
      },
      {
        path: "/stock",
        element:  <StockPage />
      },
      {
        path: "/coin",
        element:  <CoinPage/>
      },
      {
        path: "/cash",
        element:  <CashPage />
      },
      {
        path: "/deposit",
        element:  <EditPage/>
      },
      {
        path: "/withdraw",
        element:  <EditPage/>
      },
    ]
  },
]);

root.render(
  <React.StrictMode>

    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
      

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
