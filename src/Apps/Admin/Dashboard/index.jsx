import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import OverviewTab from './OverviewTab';
import MoneyPoolTab from './MoneyPoolTab';
import AnalyticsTab from './AnalyticsTab';

export default function Index() {
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Dashboard' });
    dispatch({ type: 'SET_BACKGROUND_COLOR', payload: 'paper' });
  }, []);

  return (
    <Stack spacing={2} direction="column">
      <Typography variant="h6" fontWeight="100">
        Welcome,{' '}
        <Typography component="span" variant="h6" color="primary.main" fontWeight={600}>
          Mark Steave
        </Typography>
      </Typography>

      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        disableRipple
        value={tabValue}
        onChange={handleChange}
      >
        <Tab value={1} label="Money Pool" />
        <Tab value={2} label="Overview" />
        <Tab value={3} label="Analytics" />
      </Tabs>

      <Box mt={2}>
        {tabValue === 1 && <MoneyPoolTab />}
        {tabValue === 2 && <OverviewTab />}
        {tabValue === 3 && <AnalyticsTab />}
      </Box>
    </Stack>
  );
}
