import React from 'react';
import ReactDOM from 'react-dom/client';
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
import JoinPage from './component/page/JoinPage';
import TestingPage from './component/page/TestingPage';
import TestingPage2 from './component/page/TestingPage2';

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
        path: "/setting",
        element: <EditPage />
      }
    ]
  },
  {
    path: "/join",
    element: <JoinPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/test",
    element: <TestingPage2 />
  }
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
