import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Typography } from '@mui/material';

export const CustomSelect = ({
  defaultValue,
  label,
  field,
  menuList,
  valueKey,
  labelKey,
  required = true,
  callBackAction,
  customMenuList,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  useEffect(() => {
    setSelectedValue(defaultValue || '');
  }, [defaultValue]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedValue(selectedId);

    if (typeof callBackAction === 'function') {
      callBackAction(selectedId);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      bgcolor="#F7F8FA"
      height="38px"
      px="10px"
      py="5px"
      borderRadius="5px"
    >
      <Typography fontSize={14} color="text.dark" fontWeight={400}>
        {label}:
      </Typography>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
          sx={{
            //   height: '40px',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': {
              padding: '0px 15px 0 0px',
              fontSize: '12px',
              fontWeight: 600,
            },
          }}
          {...props}
        >
          {customMenuList && customMenuList.length > 0
            ? customMenuList
            : menuList?.map((item) => (
                <MenuItem key={item[valueKey]} value={item[valueKey]}>
                  {item[labelKey]}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
  );
};

CustomSelect.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  field: PropTypes.string,
  customMenuList: PropTypes.array,
  menuList: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  callBackAction: PropTypes.func,
};
