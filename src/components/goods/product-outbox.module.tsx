export interface OutboxItem {
    receiver: string;
    alarmFlag: boolean;
    amount: number;
    key: string;
    productName: string;
    unit: string;
  }