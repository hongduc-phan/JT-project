import 'normalize.css';
import * as React from 'react';
import '../../src/index.css';
import './demo.css';

export interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({children}: IWrapperProps) => <div>{children}</div>;

export default Wrapper;
