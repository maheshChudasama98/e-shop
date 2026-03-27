import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

export default function AnalyticsTab() {
  const [financialMonth, setFinancialMonth] = useState('May');
  const [financialYear, setFinancialYear] = useState('2025');
  const [advanceMonth, setAdvanceMonth] = useState('May');
  const [advanceYear, setAdvanceYear] = useState('2025');
  const [profitMonth, setProfitMonth] = useState('May');
  const [profitYear, setProfitYear] = useState('2025');
  const [profitComparisonMonth, setProfitComparisonMonth] = useState('2 month');
  const [employerMonth, setEmployerMonth] = useState('May');
  const [employerYear, setEmployerYear] = useState('2025');
  const [employerComparisonMonth, setEmployerComparisonMonth] = useState('2 month');

  // Chart configurations
  const financialSnapshotOptions = {
    chart: { type: 'pie', height: 300, backgroundColor: 'transparent', spacing: [10, 10, 10, 10] },
    title: { text: null },
    tooltip: { pointFormat: '{series.name}: <b>{point.y:,.0f}</b>', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true },
    accessibility: { point: { valueSuffix: '%' } },
    plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: false, innerSize: '60%', borderWidth: 2, borderColor: '#ffffff' } },
    series: [{ name: 'Amount', colorByPoint: true, data: [{ name: 'Total Given', y: 1200000, color: '#87CEEB' }, { name: 'Recovered', y: 850000, color: '#3AD29F' }, { name: 'Outstanding', y: 350000, color: '#FF4444' }] }]
  };

  const advanceIssuedOptions = {
    chart: { type: 'line', height: 300, backgroundColor: 'transparent', spacing: [20, 20, 20, 20] },
    title: { text: null },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], lineColor: '#e0e0e0', tickColor: '#e0e0e0', labels: { style: { color: '#666', fontSize: '12px' } } },
    yAxis: { title: { text: null }, min: 0, max: 10000, gridLineColor: '#f0f0f0', labels: { style: { color: '#666', fontSize: '12px' } } },
    series: [{ name: 'Advance Issued', data: [2500, 3200, 2800, 4100, 5500, 4800, 5200, 3800, 4200, 4900, 3600, 2400], color: '#FF6B9D', lineWidth: 3, marker: { radius: 4, fillColor: '#FF6B9D', lineColor: '#ffffff', lineWidth: 2 } }],
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true }
  };

  const profitOptions = {
    chart: { type: 'line', height: 300, backgroundColor: 'transparent', spacing: [20, 20, 20, 20] },
    title: { text: null },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], lineColor: '#e0e0e0', tickColor: '#e0e0e0', labels: { style: { color: '#666', fontSize: '12px' } } },
    yAxis: { title: { text: null }, min: 0, max: 10000, gridLineColor: '#f0f0f0', labels: { style: { color: '#666', fontSize: '12px' } } },
    series: [{ name: 'Profit', data: [6500, 7200, 6800, 4100, 2500, 6200, 5800, 6200, 4800, 2200, 2800, 2500], color: '#4CAF50', lineWidth: 3, marker: { radius: 4, fillColor: '#4CAF50', lineColor: '#ffffff', lineWidth: 2 } }],
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true }
  };

  const profitComparisonOptions = {
    chart: { type: 'column', height: 300, backgroundColor: 'transparent', spacing: [20, 20, 20, 20] },
    title: { text: null },
    xAxis: { categories: ['April', 'May'], lineColor: '#e0e0e0', tickColor: '#e0e0e0', labels: { style: { color: '#666', fontSize: '12px' } } },
    yAxis: { title: { text: null }, min: 0, max: 60000, gridLineColor: '#f0f0f0', labels: { style: { color: '#666', fontSize: '12px' } } },
    plotOptions: { column: { borderRadius: 4, borderWidth: 0, pointPadding: 0.2, groupPadding: 0.1 } },
    series: [{ name: 'Profit', data: [40000, 55000], color: '#00D4AA' }],
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true }
  };

  const employerJoinedOptions = {
    chart: { type: 'line', height: 300, backgroundColor: 'transparent', spacing: [20, 20, 20, 20] },
    title: { text: null },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], lineColor: '#e0e0e0', tickColor: '#e0e0e0', labels: { style: { color: '#666', fontSize: '12px' } } },
    yAxis: { title: { text: null }, min: 0, max: 10000, gridLineColor: '#f0f0f0', labels: { style: { color: '#666', fontSize: '12px' } } },
    series: [{ name: 'Employers', data: [7200, 4200, 3800, 2200, 5200, 4800, 1200, 5800, 6800, 6200, 4200, 3800], color: '#6366F1', lineWidth: 3, marker: { radius: 4, fillColor: '#6366F1', lineColor: '#ffffff', lineWidth: 2 } }],
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true }
  };

  const employerComparisonOptions = {
    chart: { type: 'column', height: 300, backgroundColor: 'transparent', spacing: [20, 20, 20, 20] },
    title: { text: null },
    xAxis: { categories: ['April', 'May'], lineColor: '#e0e0e0', tickColor: '#e0e0e0', labels: { style: { color: '#666', fontSize: '12px' } } },
    yAxis: { title: { text: null }, min: 0, max: 20, gridLineColor: '#f0f0f0', labels: { style: { color: '#666', fontSize: '12px' } } },
    plotOptions: { column: { borderRadius: 4, borderWidth: 0, pointPadding: 0.2, groupPadding: 0.1 } },
    series: [{ name: 'Employers', data: [15, 5], color: '#FF69B4' }],
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ccc', borderRadius: 8, shadow: true }
  };

  const CustomSelect = ({ label, value, onChange, options }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      border: '1px solid #e1e5e9',
      padding: '4px 8px',
      minWidth: '85px',
      '&:hover': {
        borderColor: '#d1d7dd',
      }
    }}>
      <Typography variant="body2" sx={{ 
        fontSize: '12px', 
        color: '#666', 
        fontWeight: 500,
        marginRight: '4px',
        whiteSpace: 'nowrap'
      }}>
        {label}:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 40 }}>
        <Select 
          value={value} 
          onChange={onChange} 
          displayEmpty
          variant="standard"
          disableUnderline
          sx={{
            '& .MuiSelect-select': {
              padding: '0',
              paddingRight: '15px !important',
              fontSize: '12px',
              fontWeight: 600,
              color: '#2c2c2c',
              border: 'none',
              '&:focus': {
                backgroundColor: 'transparent',
              }
            },
            '& .MuiSelect-icon': {
              color: '#666',
              right: '-2px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
            },
            '&:before, &:after': {
              display: 'none',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: '12px', fontWeight: 500 }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Stack direction="column">
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={4.8}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Financial Snapshot</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={financialMonth} onChange={(e) => setFinancialMonth(e.target.value)} options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} />
                <CustomSelect label="Year" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} options={['2023', '2024', '2025']} />
              </Stack>
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 250 }}>
              <Box sx={{ flex: 1 }}>
                <HighchartsReact highcharts={Highcharts} options={financialSnapshotOptions} />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: '#87CEEB', borderRadius: '50%', mr: 1 }} />
                    <Typography variant="body2">Total Given: $12,00,000</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: '#3AD29F', borderRadius: '50%', mr: 1 }} />
                    <Typography variant="body2">Recovered: $8,50,000</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: '#FF4444', borderRadius: '50%', mr: 1 }} />
                    <Typography variant="body2">Outstanding: $3,50,000</Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid size={7.2}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Total Advance Issued</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={advanceMonth} onChange={(e) => setAdvanceMonth(e.target.value)} options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} />
                <CustomSelect label="Year" value={advanceYear} onChange={(e) => setAdvanceYear(e.target.value)} options={['2023', '2024', '2025']} />
              </Stack>
            </Stack>
            <HighchartsReact highcharts={Highcharts} options={advanceIssuedOptions} />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="stretch" sx={{ mt: 3 }}>
        <Grid size={7.2}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Total Profit</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={profitMonth} onChange={(e) => setProfitMonth(e.target.value)} options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} />
                <CustomSelect label="Year" value={profitYear} onChange={(e) => setProfitYear(e.target.value)} options={['2023', '2024', '2025']} />
              </Stack>
            </Stack>
            <HighchartsReact highcharts={Highcharts} options={profitOptions} />
          </Card>
        </Grid>
        <Grid size={4.8}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Profit Comparison</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={profitComparisonMonth} onChange={(e) => setProfitComparisonMonth(e.target.value)} options={['1 month', '2 month', '3 month', '6 month']} />
              </Stack>
            </Stack>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="success.main" fontWeight={600}>Difference: +$15,000 (+37.5%) Growth This Month</Typography>
              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Typography variant="body2">Current Month (May): $55,000</Typography>
                <Typography variant="body2">Previous Month (April): $40,000</Typography>
              </Stack>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={profitComparisonOptions} />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="stretch" sx={{ mt: 3 }}>
        <Grid size={7.2}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Total Employer Joined</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={employerMonth} onChange={(e) => setEmployerMonth(e.target.value)} options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} />
                <CustomSelect label="Year" value={employerYear} onChange={(e) => setEmployerYear(e.target.value)} options={['2023', '2024', '2025']} />
              </Stack>
            </Stack>
            <HighchartsReact highcharts={Highcharts} options={employerJoinedOptions} />
          </Card>
        </Grid>
        <Grid size={4.8}>
          <Card sx={{ p: 2, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px', color: '#2c2c2c' }}>Employer Joined Comparison</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CustomSelect label="Month" value={employerComparisonMonth} onChange={(e) => setEmployerComparisonMonth(e.target.value)} options={['1 month', '2 month', '3 month', '6 month']} />
              </Stack>
            </Stack>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="error.main" fontWeight={600}>Difference: -10 (66.7%) Decline This Month</Typography>
              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Typography variant="body2">Current Month (May): 5</Typography>
                <Typography variant="body2">Previous Month (April): 15</Typography>
              </Stack>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={employerComparisonOptions} />
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
} 