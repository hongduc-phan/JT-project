import axios from 'axios';

import config from '../../config';

import {Grading} from './models';

export interface FetchGetGradingsResponse {
  data: Grading[];
  meta: {total: number};
}

export interface FetchCreateGradingResponse {
  data: Grading;
}

export interface FetchDetailGradingResponse {
  data: Grading;
}

export interface FetchCreateGradingBody {
  gradingName: string;
}

export function fetchGetGradings(page: number, limit: number, name: string) {
  return axios.get<FetchGetGradingsResponse>(
    `${config.apiHost}${config.apiEndPoints.getGradings(page, limit, name)}`,
  );
}

export function fetchCreategrading(data: FetchCreateGradingBody) {
  return axios.post<FetchCreateGradingResponse>(
    `${config.apiHost}${config.apiEndPoints.createGrading}`,
    data,
  );
}

export function fetchEditGrading(
  id: number,
  data: Partial<FetchCreateGradingBody>,
) {
  return axios.put<Partial<FetchCreateGradingBody>>(
    `${config.apiHost}${config.apiEndPoints.editGrading(id)}`,
    data,
  );
}

export function fetchDeleteGrading(id: number) {
  return axios.delete(
    `${config.apiHost}${config.apiEndPoints.deleteGrading(id)}`,
  );
}
