export interface Country {
  countryId: number;
  countryName: string;
  countryCode: string;
}

export interface State {
  stateId: number;
  countryId: number;
  stateName: string;
}

export interface Bank {
  bankId: number;
  bankName: string;
}

export interface BankWithState extends Bank {
  stateId: number;
  lastUpdated: number;
}
