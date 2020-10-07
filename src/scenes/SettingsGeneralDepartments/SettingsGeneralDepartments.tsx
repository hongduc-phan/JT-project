import React from 'react';

import ListingDepartmentsContainer from './containers/ListDepartmentsContainer';

import styles from './SettingsGeneralDepartments.module.css';

const SettingsGeneralDepartments = () => {
  return (
    <div className={styles.wrapper}>
      <ListingDepartmentsContainer />
    </div>
  );
};

export default SettingsGeneralDepartments;
