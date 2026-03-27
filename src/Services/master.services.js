import jwtAuthAxios, { errorHandler } from './auth/jwtAuth';

export function SelectorsService(params, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/selectors`, { params })
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

export function RoleModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/role/modify`, payload)
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
        if (cb) cb(error?.response?.data);
        errorHandler(error, dispatch);
      });
  };
}

export function RolesListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/roles/list`, { params: payload })
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

export function RolesDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/role/delete`, { params: payload })
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

// Categories Services

export function CategoryModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/category/modify`, payload)
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

export function CategoriesListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/categories/list`, { params: payload })
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

export function CategoryDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/category/delete`, { params: payload })
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

// Brands Services

export function BrandModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/brand/modify`, payload)
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

export function BrandListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/brands/list`, { params: payload })
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

export function BrandDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/brand/delete`, { params: payload })
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
