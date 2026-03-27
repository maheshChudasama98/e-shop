import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

export default function MoneyPoolTab() {
  const router = useRouter();
  return (
    <Stack direction="column" spacing={2}>
      <Grid
        container
        sx={{
          borderRadius: 1.5,
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        <Grid
          size={4}
          sx={{
            borderRight: (theme) => `1px dashed ${theme.palette.grey[400]}`,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant="body2" color="text.dark">
                Total Profit
              </Typography>
              <Button
                variant="body2"
                onClick={() => router.push(ADMIN_ROUTES.PROFIT)}
                sx={{
                  textDecoration: 'underline',
                  padding: '0',
                }}
              >
                View All
              </Button>
            </Stack>
            <Typography variant="h6" fontWeight={700}>
              $4,00,000
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={4}
          sx={{
            borderRight: (theme) => `1px dashed ${theme.palette.grey[400]}`,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.dark">
              This Month (May)
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              $1,20,000
            </Typography>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.dark">
              This Year (2025)
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              $2,50,000
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        sx={{
          borderRadius: 1.5,
          justifyContent: 'space-between',
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        <Box sx={{ width: '60%', borderRight: (theme) => `1px dashed ${theme.palette.grey[400]}` }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.dark">
              Total Given to Employers
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              $12,00,000
            </Typography>
          </Box>

          <Stack
            direction="row"
            sx={{
              borderTop: (theme) => `1px dashed ${theme.palette.grey[400]}`,
            }}
          >
            <Box
              sx={{
                p: 2,
                width: '50%',
                backgroundColor: 'rgba(58,210,159,5%)',
                borderRight: (theme) => `1px dashed ${theme.palette.grey[400]}`,
              }}
            >
              <Typography variant="body2" color="text.dark">
                Recovered amount from Employers
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                $10,00,000
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                width: '50%',
                backgroundColor: 'rgba(255,0,0,5%)',
              }}
            >
              <Typography variant="body2" color="text.dark">
                Outstanding Amount
              </Typography>
              <Typography variant="h6" fontWeight={700} color="error.main">
                $2,00,000
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            width: '40%',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Typography variant="body2" color="primary.main" fontWeight={600}>
            80% Repaid
          </Typography>
          <LinearProgress
            variant="determinate"
            value={80}
            sx={{ height: 10, borderRadius: 5, width: '100%' }}
          />
          <Typography variant="caption" color="text.dark">
            $10,00,000 of $12,00,000 Repaid
          </Typography>
        </Box>
      </Stack>

      <Grid container>
        <Grid
          size={6}
          sx={{
            borderRadius: 1.5,
            border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Stack direction="row" alignItems="center">
              <Stack direction="column" flexGrow={1}>
                <Typography variant="body2" color="text.dark" fontWeight={600}>
                  Total Given to Employers this month
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  $1,50,000
                </Typography>
              </Stack>
              <Button
                variant="body2"
                sx={{
                  textDecoration: 'underline',
                  padding: '0',
                }}
              >
                View All
              </Button>
            </Stack>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.dark"
                  fontWeight={400}
                  sx={{ flexGrow: '1' }}
                >
                  TechNova Solutions Ltd
                </Typography>
                <Typography variant="subtitle1">$50,000</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.dark"
                  fontWeight={400}
                  sx={{ flexGrow: '1' }}
                >
                  MedCare Pharma Pvt Ltd
                </Typography>
                <Typography variant="subtitle1">$70,000</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.dark"
                  fontWeight={400}
                  sx={{ flexGrow: '1' }}
                >
                  GreenLeaf Manufacturing
                </Typography>
                <Typography variant="subtitle1">$15,000</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.dark"
                  fontWeight={400}
                  sx={{ flexGrow: '1' }}
                >
                  UrbanBuild Constructions
                </Typography>
                <Typography variant="subtitle1">$15,000</Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
