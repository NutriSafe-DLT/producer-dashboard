export interface StockItem {
    alarmFlag: boolean;
    amount: number;
    key: string;
    productName: string;
    unit: string;
    attributes: any;
  }
  
 export interface ProductStockRowProps {
    row: StockItem;
    setConfirmDialog;
    setRequestInputDialog;
    handleProductDeletion;
    handleSetReceiver;
    handleSetAlert;
  }