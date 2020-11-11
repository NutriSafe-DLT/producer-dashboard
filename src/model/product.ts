interface Product extends DTO {
  id: string;
  pdc?: string;
  product: string;
  amount: string;
  unit: string;
  attributes: string[];
  attrValues: string[];
  pArgs?: {};
}

interface AddPredecessor extends DTO {
  preIds: string;
  id: string;
  amountDif: number;
}

interface SetReciever extends DTO {
  id: string;
  receiver: string;
}

interface ChangeOwner extends DTO {
  id: String;
}

interface ActivateAlarm extends DTO {
  id: String;
}

interface UpdateAttribute extends DTO {
  id: string;
  attribute: string;
  attrValue: string;
}

interface DTO {}

// interface UpdatePrivateAttribute
