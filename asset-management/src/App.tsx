import React from 'react';
import './App.css';
import Header from './component/Header';
import MainPage from './component/MainPage';
import SideBar from './component/SideBar';
import Modal from './component/Modal';

function App() {
  return (
    <React.Fragment>
      <Header />
      <SideBar />
      <MainPage />
      <Modal />
    </React.Fragment>
    
  );
}

export default App;
