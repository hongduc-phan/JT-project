import React from 'react';

import ListingGradingsContainer from './containers/ListGradingsContainer';

import styles from './SettingsGeneralGradings.module.css';

const SettingsGeneralGradings = () => {
  return (
    <div className={styles.wrapper}>
      <ListingGradingsContainer />
    </div>
  );
};

export default SettingsGeneralGradings;
