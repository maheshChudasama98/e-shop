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

// Certificate Services

export function CertificateModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/certificate/modify`, payload)
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

export function CertificatesListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/certificates/list`, { params: payload })
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

export function CertificateDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/certificate/delete`, { params: payload })
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

// Color Services
export function ColorModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/color/modify`, payload)
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

export function ColorsListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/colors/list`, { params: payload })
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

export function ColorDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/color/delete`, { params: payload })
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

// Tabs Services
export function TabModifyService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/tab/modify`, payload)
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

export function TabsListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/tabs/list`, { params: payload })
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

export function TabDeleteService(payload, cb) {
  console.log('payload,', payload);
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/tab/delete`, { params: payload })
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
