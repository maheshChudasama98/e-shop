import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { shadows } from 'src/theme/shadows';

import { Empty } from 'antd';

export const AutoCompleteSelectMenu = ({
  formik,
  label,
  field,
  menuList,
  valueKey,
  labelKey,
  required = true,
  unitType,
  startUnitType,
  callBackAction,
  ...props
}) => {
  const handleChange = (e, value) => {
    const selectedPesticideId = value?.[valueKey] || '';
    formik.setFieldValue(field, selectedPesticideId);

    if (typeof callBackAction === 'function') {
      callBackAction(selectedPesticideId);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Custom Label */}
      <Typography
        sx={{
          fontSize: 13,
          padding: '0px',
          marginBottom: '0px',
          color:
            formik.touched[field] && Boolean(formik.errors[field])
              ? (theme) => theme.palette.error.main
              : (theme) => theme.palette.grey[1000],
        }}
      >
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>

      {/* Autocomplete Field */}
      <Autocomplete
        fullWidth
        id={field}
        name={field}
        options={menuList}
        getOptionLabel={(option) => option?.[labelKey] || ' '}
        value={menuList.find((option) => option[valueKey] === formik.values[field]) || null}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={formik.handleBlur}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field] ? formik.errors[field] : ''}
            InputProps={{
              ...params.InputProps,
              readOnly: true,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {unitType && <InputAdornment position="end">{unitType}</InputAdornment>}
                </>
              ),
              startAdornment: (
                <>
                  {params.InputProps.startAdornment}
                  {startUnitType && (
                    <InputAdornment position="start">{startUnitType}</InputAdornment>
                  )}
                </>
              ),
            }}
          />
        )}
        componentsProps={{
          popper: {
            sx: {
              '& .MuiAutocomplete-paper': {
                boxShadow: shadows()[10],
              },
            },
          },
        }}
        noOptionsText={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Not Data Found!" />}
        disableClearable={required}
        {...props}
      />
    </Box>
  );
};

AutoCompleteSelectMenu.propTypes = {
  formik: PropTypes.object,
  label: PropTypes.string,
  field: PropTypes.string,
  menuList: PropTypes.array,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  required: PropTypes.bool,
  unitType: PropTypes.string,
  callBackAction: PropTypes.func,
};
