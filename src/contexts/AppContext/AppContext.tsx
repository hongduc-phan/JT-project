import {createContext, ReactNode} from 'react';
import {SnackbarVariant} from '../../components/Snackbar';

export interface AppContextValue {
  snackAdd: (msg: ReactNode, variant?: SnackbarVariant) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
