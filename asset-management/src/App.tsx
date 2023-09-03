import React, { useState } from 'react';
import './App.css';
import Header from './component/Header';
import MainPage from './component/page/MainPage';
import SideBar from './component/SideBar';
import Modal from './component/Modal';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { themeState } from './atom/atom';
import { Outlet } from 'react-router-dom';
import BottomNav from './component/BottomNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
  const theme = useRecoilValue(themeState)
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <SideBar />
          <Outlet />
          <Modal />
          <BottomNav />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
    
  );
}

export default App;
