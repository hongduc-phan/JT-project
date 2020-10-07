import axios from 'axios';
import {UserInformation} from './models';
import config from '../../config';

export interface FetchSiginResponse {
  data: UserInformation;
}

export function fetchSigin(
  username: string,
  password: string,
  company: string,
) {
  return axios.post<FetchSiginResponse>(
    `${config.apiHost}${config.apiEndPoints.usersSession}`,
    {
      userName: username,
      password,
      companyUsername: company,
    },
    {
      headers: {Authorization: 'na'},
    },
  );
}
