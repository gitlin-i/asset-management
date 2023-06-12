import React from 'react';
import './App.css';
import Header from './component/Header';
import MainPage from './component/MainPage';
import SideBar from './component/SideBar';

function App() {
  return (
    <React.Fragment>
      <Header />
      <SideBar />
      <MainPage />
    </React.Fragment>
    
  );
}

export default App;
