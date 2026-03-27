import jwtAuthAxios, { errorHandler } from './auth/jwtAuth';

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

export function ProductsListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/products/list`, { params: payload })
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

export function VariantModifyService(formData, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`product/variants/modify`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

export function VariantSelectedService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/product/variant/selected`, { params: payload })
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

export function VariantImagesPrimaryService(formData, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/variant/images/primary`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

export function VariantImagesUploadsService(formData, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`/variant/images/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

export function VariantDeleteService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/product/variant/delete`, { params: payload })
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

export function VariantImageDeleteService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/variant/image/delete`, { params: payload })
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

export function VariantDiscountsService(formData, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`variant/discounts`, formData)
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

export function ModifyProductVariantPurchaseService(formData, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .post(`product/variant/purchase`, formData)
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

export function GetInventoryPurchaseListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/product/variant/purchase-list`, { params: payload })
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

export function DeleteInventoryPurchaseService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .delete(`/product/variant/purchase-delete`, { params: payload })
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

export function GetInventoryLogsListService(payload, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios.defaults.headers.common.Authorization = localStorage.getItem('token');
    jwtAuthAxios
      .get(`/product/variant/inventory-log`, { params: payload })
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
