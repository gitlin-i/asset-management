import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import TestingPage from './TestingPage'
import { RecoilRoot } from 'recoil'

const TestingPage2 = () => {
    const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false, 
        staleTime : 1000* 60*5,
        },
    },
    })
  return (
    <QueryClientProvider client={queryClient}>
        <TestingPage />
    </QueryClientProvider>
  )
}

export default TestingPage2