import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CustomPagination = ({
  current,
  total,
  pageSize,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
  onChange,
  onShowSizeChange,
  size = 'default',
  simple = false,
  disabled = false,
  hideOnSinglePage = false,
  responsive = true,
  className = '',
  style = {},
  ...props
}) => {
  console.log();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1.5,
        pb: 1.5,
      }}
    >
      {/* Left side - Entry info and basic pagination */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {total > 0 ? (current - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(current * pageSize, total)} of {total} entries
        </Typography>
      </Box>

      {/* Right side - Custom pagination layout */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Page {current} of {Math.max(1, Math.ceil(total / pageSize))}
        </Typography>

        {/* Custom pagination controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Previous button */}
          <Button
            variant="outlined"
            size="small"
            disabled={current === 1}
            onClick={() => onChange(current - 1, pageSize)}
            sx={{ minWidth: '32px', height: '32px', p: 0 }}
          >
            &lt;
          </Button>

          {/* Next button */}
          <Button
            variant="outlined"
            size="small"
            disabled={current >= Math.ceil(total / pageSize)}
            onClick={() => onChange(current + 1, pageSize)}
            sx={{ minWidth: '32px', height: '32px', p: 0 }}
          >
            &gt;
          </Button>
        </Box>

        {/* Page size selector */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <select
            value={pageSize}
            onChange={(e) => {
              const newPageSize = parseInt(e.target.value, 10);
              onShowSizeChange(current, newPageSize);
            }}
            style={{
              height: '32px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '0 8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white',
            }}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </Box>
      </Box>
    </Box>
  );
};

CustomPagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  showSizeChanger: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  showTotal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  size: PropTypes.oneOf(['default', 'small']),
  simple: PropTypes.bool,
  disabled: PropTypes.bool,
  hideOnSinglePage: PropTypes.bool,
  responsive: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

CustomPagination.defaultProps = {
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: true,
  size: 'default',
  simple: false,
  disabled: false,
  hideOnSinglePage: false,
  responsive: true,
  className: '',
  style: {},
};

export default CustomPagination;
