export interface Payment {
  id: number;
  user_id: number;
  user_login: string;            
  subscription_id?: number;
  amount: number;
  currency: string;
  status: string;                 
  method: string;                 
  transaction_id: string;         
  wallet_address: string;         
  created_at: string;             
  timestamp: string;
  subscription_status: 'free' | 'plus' | 'premium';
}
