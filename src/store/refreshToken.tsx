import axios from 'axios';
import config from '../config';
import store from './index';
import {UserInformation, usersActions} from '../features/users';

export interface FetchRefreshTokenResponse {
  data: UserInformation;
}

interface QueueItem {
  resolve: (value?: string | PromiseLike<string> | undefined) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;

// Store requests that waiting for refresh token
let queue: QueueItem[] = [];

const refreshTokenUrl = `${config.apiHost}${config.apiEndPoints.refreshToken}`;

function handleQueue(err: Error | null, token = '') {
  queue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });
  queue = [];
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // If error from refresh token api we immediately return error
    if (originalRequest.url === refreshTokenUrl) {
      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      // If response status 403 no permission for the request we can force user logout
      store.dispatch(usersActions.logout());
      return Promise.reject(error);
    }

    if (error.response.status !== 401) {
      // Other error not 401 we can safely return error
      return Promise.reject(error);
    }

    const state = store.getState();

    if (!state.user.information) {
      store.dispatch(usersActions.logout());
      return Promise.reject(error);
    }

    const accessToken = state.user.information.accessToken;
    const refreshToken = state.user.information.refreshToken;

    // There are no request trying to get the refresh token
    if (!isRefreshing && !originalRequest._retry) {
      originalRequest._retry = true;

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post<FetchRefreshTokenResponse>(
            refreshTokenUrl,
            {
              accessToken,
            },
            {
              headers: {
                Authorization: refreshToken,
              },
            },
          )
          .then((res) => {
            const serializedState = JSON.stringify(res.data.data);

            localStorage.setItem(config.localStoreKeys.user, serializedState);

            store.dispatch(usersActions.set(res.data.data));

            originalRequest.headers.Authorization = res.data.data.accessToken;

            resolve(axios(originalRequest));

            isRefreshing = false;

            handleQueue(null, res.data.data.accessToken);
          })
          .catch((err) => {
            isRefreshing = false;
            handleQueue(err);
            store.dispatch(usersActions.logout());
            reject(err);
          });
      });
    }

    // There are a request trying to get the refresh token
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        queue.push({resolve, reject});
      })
        .then((token) => {
          originalRequest.headers.Authorization = token;
          return axios(originalRequest);
        })
        .catch((err) => {
          return err;
        });
    }
    return Promise.reject(error);
  },
);
