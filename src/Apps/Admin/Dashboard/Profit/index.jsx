import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ADMIN_ROUTES } from 'src/routes/routes';

import { CustomBackButton, CustomSelect, CustomSearchInput } from 'src/components/CustomComponents';

import { Table, Space, Button as AntdButton } from 'antd';

const profitData = [
  {
    key: '1',
    companyName: 'TechNova Solutions Ltd',
    totalGiven: '$5,00,000',
    totalRecovered: '$5,50,000',
    interestProfit: '$50,000',
    paymentDate: '04-02-2025',
  },
  {
    key: '2',
    companyName: 'MedCare Pharma Pvt Ltd',
    totalGiven: '$3,00,000',
    totalRecovered: '$3,30,000',
    interestProfit: '$30,000',
    paymentDate: '04-02-2025',
  },
  {
    key: '3',
    companyName: 'GreenLeaf Manufacturing',
    totalGiven: '$6,00,000',
    totalRecovered: '$6,60,000',
    interestProfit: '$60,000',
    paymentDate: '03-02-2025',
  },
  {
    key: '4',
    companyName: 'UrbanBuild Constructions',
    totalGiven: '$4,00,000',
    totalRecovered: '$4,40,000',
    interestProfit: '$40,000',
    paymentDate: '02-02-2025',
  },
];

const monthOptions = [
  { value: 'All', label: 'All' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

const yearOptions = [
  { value: 'All', label: 'All' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
];

export default function Index() {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Total Given',
      dataIndex: 'totalGiven',
      key: 'totalGiven',
    },
    {
      title: 'Total Recovered',
      dataIndex: 'totalRecovered',
      key: 'totalRecovered',
    },
    {
      title: 'Interest (Profit)',
      dataIndex: 'interestProfit',
      key: 'interestProfit',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: () => (
        <Space>
          <AntdButton
            icon={<i className="fa-regular fa-eye" />}
          />
        </Space>
      ),
    },
  ];

  const handleExportToExcel = () => {
    console.log('Exporting to Excel...');
  };

  const filteredData = profitData.filter((item) => {
    const matchesSearch = item.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header with Back Button */}
      <Box>
        <CustomBackButton routerSrt={ADMIN_ROUTES.DASHBOARD} />
      </Box>

      <Box mt={2}>
        <Card>
          <Box sx={{ p: 2, justifyContent: 'space-between', alignItems: 'end', display: 'flex' }}>
            <CustomSearchInput 
              callBack={(value) => setSearchQuery(value)} 
              placeholder="Search by company name..."
            />
            <Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#000',
                    marginRight: '16px'
                  }}
                >
                  Total: {String(filteredData.length).padStart(2, '0')}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  backgroundColor='#F7F8FA'
                  height='40px'
                  p='10px 0 10px 10px'
                  borderRadius='5px'
                >
                  <Typography
                    fontSize={14}
                    color="text.dark"
                    fontWeight={400}
                    flexGrow='1'
                  >
                    Month:
                  </Typography>
                  <CustomSelect
                    menuList={monthOptions}
                    valueKey="value"
                    labelKey="label"
                    defaultValue={selectedMonth}
                    callBackAction={setSelectedMonth}
                    sx={{
                      height: '40px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiSelect-select': {
                        padding: '0px 15px 0 0px',
                        fontSize: '14px',
                        fontWeight: '600', 
                      },
                    }}
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  backgroundColor='#F7F8FA'
                  height='40px'
                  p='10px 0 10px 10px'
                  borderRadius='5px'
                >
                  <Typography
                    fontSize={14}
                    color="text.dark"
                    fontWeight={400}
                    flexGrow='1'
                  >
                    Year:
                  </Typography>
                  <CustomSelect
                    menuList={yearOptions}
                    valueKey="value"
                    labelKey="label"
                    defaultValue={selectedYear}
                    callBackAction={setSelectedYear}
                    sx={{
                      height: '40px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiSelect-select': {
                        padding: '0px 15px 0 0px',
                        fontSize: '14px',
                        fontWeight: '600', 
                      },
                    }}
                  />
                </Box>

                <Button variant="outlined" onClick={handleExportToExcel}>
                  Export To Excel
                </Button>
              </Box>
            </Box>
          </Box>

          <Box>
            <Table
              className="custom-ant-table"
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Box>
        </Card>
      </Box>
    </div>
  );
} 