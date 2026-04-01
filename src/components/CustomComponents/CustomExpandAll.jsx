import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography } from '@mui/material';

export const CustomExpandAll = ({
  labelKey,
  rows = [],
  expandedRowKeys = [],
  setExpandedRowKeys,
  loading = false,
}) => {
  if (loading) {
    return <CircularProgress color="primary" size={30} />;
  }

  // Extract all row keys dynamically
  const allRowKeys = rows?.map((row) => row?.[labelKey]);

  // Check if all rows are expanded
  const allExpanded =
    allRowKeys.length > 0 && allRowKeys.every((key) => expandedRowKeys.includes(key));

  const handleToggleExpandAll = () => {
    if (allExpanded) {
      setExpandedRowKeys([]); // collapse all
    } else {
      setExpandedRowKeys(allRowKeys); // expand all
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{ alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      onClick={handleToggleExpandAll}
    >
      <Checkbox
        color="primary"
        checked={allExpanded}
        indeterminate={expandedRowKeys.length > 0 && !allExpanded}
        onChange={handleToggleExpandAll}
        sx={{ pointerEvents: 'none' }} // prevent double triggering
      />
      <Typography variant="small" fontWeight={600}>
        {allExpanded ? 'Collapse All' : 'Expand All'}
      </Typography>
    </Stack>
  );
};

CustomExpandAll.propTypes = {
  rows: PropTypes.array,
  labelKey: PropTypes.string,
  expandedRowKeys: PropTypes.array,
  setExpandedRowKeys: PropTypes.func,
  loading: PropTypes.bool,
};
