import {Country} from '../options';

export interface BankAccount {
  bankAccountId: number;
  bankId: number;
  companyId: string;
  accountName: string;
  branchCode: string;
  accountNumber: string;
  deletedAt: null | string | 0;
  updatedAt: null | string;
  createdAt: null | string;
}

export enum Day {
  Mon = 'mon',
  Tue = 'tue',
  Wed = 'wed',
  Thu = 'thu',
  Fri = 'fri',
  Sat = 'sat',
  Sun = 'sun',
}

export interface RestDay {
  restDayId: string;
  day: Day;
  isFullDay: boolean;
}

export interface Company {
  companyId: string;
  companyName: string;
  businessRegNo: string;
  companyLogoPath: null | string;
  countryId: number;
  address1: string;
  address2: string;
  postalCode: string | null;
  weekStart: Day | null;
  halfDayHour: string | null;
  deletedAt: number;
  updatedAt: null;
  createdAt: string;
  companyUsername: string;
  groupId: string | null;
  country: Country;
  bankDetails: BankAccount[];
  restDays: RestDay[];
}

export interface AddBank {
  bankId: number;
  accountName: string;
  accountNumber: string;
  branchCode: string;
}
