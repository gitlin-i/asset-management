
export interface MyCashAPI {
    user_id: string
    currency : string
    balance: number
    
  }
  
export const isMyCashAPI = (obj : object) : obj is MyCashAPI => {
    if (typeof obj ==='object' &&
    'currency' in obj &&
    'balance' in obj &&
    'user_id' in obj 
    ) return true
    return false
  }