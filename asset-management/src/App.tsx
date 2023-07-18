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
function App() {
  const theme = useRecoilValue(themeState)
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Header />
        <SideBar />
        <Outlet />
        <Modal />
      </ThemeProvider>
    </React.Fragment>
    
  );
}

export default App;
