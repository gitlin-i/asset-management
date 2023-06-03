import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Body from './component/Body';
import MainLayout from './layout/MainLayout';
import TestingLayout from './layout/TestingLayout';

function App() {
  return (
    <React.Fragment>
      <Header />
      <TestingLayout />
      {/* <Body /> */}
    </React.Fragment>
    
  );
}

export default App;
