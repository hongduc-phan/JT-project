import {createContext} from 'react';
import {DeepReadonly} from 'utility-types';
import {Country} from '../../../../features/options';

export interface SettingFormContextValue {
  deleteBankAccount: (
    bankId: number,
    done?: (success: boolean) => void,
  ) => void;
  countries: DeepReadonly<Country[]>;
}

export const SettingFormContext = createContext<SettingFormContextValue | null>(
  null,
);
