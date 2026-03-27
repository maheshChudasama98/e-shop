import jwtAuthAxios, { errorHandler } from './auth/jwtAuth';

export function UsersModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/user/modify`, payload)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res.data);
        }
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data);
        errorHandler(error, dispatch);
      });
  };
}

export function UsersListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/users/list`, { params: payload })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res.data);
        } else {
          if (cb) cb(res.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}

export function UsersDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/user/delete`, { params: payload })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res.data);
        } else {
          if (cb) cb(res.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}
