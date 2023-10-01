import React from 'react';
import './App.css';
import Header from './component/Header';

import SideBar from './component/SideBar';
import Modal from './component/Modal';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { themeState } from './atom/atom';
import { Outlet } from 'react-router-dom';
import BottomNav from './component/BottomNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


function App() {
  const theme = useRecoilValue(themeState)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, 
      },
    },
  })
  const cookie = document.cookie
  
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Header />
            <SideBar />
            <Outlet />
            <Modal />
            <BottomNav />
          </QueryClientProvider>
        </ChakraProvider>
      </ThemeProvider>
    </React.Fragment>
    
  );
}

export default App;
