import jwtAuthAxios, { errorHandler } from './auth/jwtAuth';

export function OrdersListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/admin/orders/list`, { params: payload })
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

export function ProductModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/product/modify`, payload)
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

export function ProductSelectedService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/product/selected`, { params: payload })
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

export function ProductDeleteService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/product/delete`, { params: payload })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res.data);
        }
        if (cb) cb(res.data);
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}
export function AdminOrderDetailsService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/admin/orders/details`, { params: payload })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res?.data);
        } else {
          if (cb) cb(res?.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}

export function AdminOrderUpdateStatusService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .put(`/admin/orders/status`, payload)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res?.data);
        } else {
          if (cb) cb(res?.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}

export function AdminOrderUpdatePaymentStatusService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .put(`/admin/orders/payment-status`, payload)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res?.data);
        } else {
          if (cb) cb(res?.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}

export function AdminOrderDeleteService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/admin/orders/delete`, { params: payload })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: 'FETCH_SUCCESS' });
          if (cb) cb(res?.data);
        } else {
          if (cb) cb(res?.data);
          dispatch({ type: 'FETCH_ERROR', payload: res.data.message });
        }
      })
      .catch((error) => {
        errorHandler(error, dispatch);
      });
  };
}
