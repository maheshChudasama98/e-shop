import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';import Typography from '@mui/material/Typography';

export default function OverviewTab() {
	return (
		<Stack direction="column">
			<Grid
				container
				spacing={3}
				alignItems="stretch"
			>
				<Grid
					size={6}
				>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
					}}
				>
					<Stack direction="row" gap="25px">
						<Box
							sx={{
								border: '1px solid rgba(58, 210, 159, 0.50) ',
								p: 2,
								borderRadius: 2,
								width: '100%',
								background:
									'linear-gradient(180deg, rgba(58, 210, 159, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
							}}
						>
							<Typography
								variant="body2"
								fontSize={16}
								color="text.dark"
								fontWeight={600}
								textAlign="center"
							>
								Total Employers
							</Typography>
							<Typography
								mt={2}
								mb={1}
								variant="h5"
								fontSize={16}
								color="text.dark"
								fontWeight={600}
								textAlign="center"
							>
								18
							</Typography>
						</Box>
						<Box
							sx={{
								border: '1px solid rgba(58, 210, 159, 0.50) ',
								p: 2,
								borderRadius: 2,
								width: '100%',
								background:
									'linear-gradient(180deg, rgba(118, 94, 255, 25%) 0%, rgba(255, 255, 255, 0) 100%)',
							}}
						>
							<Typography
								variant="body2"
								fontSize={16}
								color="text.dark"
								fontWeight={600}
								textAlign="center"
							>
								Total Employees
							</Typography>
							<Typography
								mt={2}
								mb={1}
								variant="h5"
								fontSize={16}
								color="text.dark"
								fontWeight={600}
								textAlign="center"
							>
								52
							</Typography>
						</Box>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						sx={{
							background: 'linear-gradient(90deg, rgba(255, 143, 68, 25%) 0%, rgba(255, 255, 255, 0) 100%)',
							p: '25px 20px',
							border: '1px solid rgba(255, 143, 68, 50%) ',
							borderRadius: 2,
						}}
					>
						<Typography
							variant="body2"
							fontSize={16}
							color="text.dark"
							fontWeight={600}
							flexGrow='1'
						>
							New Advance Requests
						</Typography>
						<Typography
							variant="h5"
							fontSize={16}
							color="text.dark"
							fontWeight={600}>
							14
						</Typography>
					</Stack>
					<Stack
						direction="column"
						spacing={2}
						sx={{
							background: 'linear-gradient(90deg, rgba(212, 244, 31, 25%) 50%, rgba(255, 255, 255, 0) 100%)',
							p: '25px 20px',
							border: '1px solid rgba(212, 244, 31, 50%) ',
							borderRadius: 2,
						}}
					>
						<Typography
							variant="body2"
							fontSize={16}
							color="text.dark"
							fontWeight={600}
							flexGrow='1'
						>
							Recent Activities
						</Typography>
						<List
							sx={{
								display: 'flex',
								flexDirection: 'column',
								p: 0,
								'& > li:not(:last-child)' : {
									borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
								}
							}}
						>
							<ListItem
								sx={{
									display: 'flex',
									flexDirection: 'row',
									gap: '10px',
									padding: '8px 0',
								}}
							>
								<Typography
									variant="body2" color="text.dark" fontWeight={400} sx={{ flexGrow: '1' }}>
									Employer signups
								</Typography>
								<Typography variant="subtitle1">
									08
								</Typography>
							</ListItem>
							<ListItem
								sx={{
									display: 'flex',
									flexDirection: 'row',
									gap: '10px',
									padding: '8px 0',
								}}
							>
								<Typography
									variant="body2" color="text.dark" fontWeight={400} sx={{ flexGrow: '1' }}>
									Advance request Approved
								</Typography>
								<Typography variant="subtitle1">
									06
								</Typography>
							</ListItem>
						</List>
					</Stack>
				</Box>
				</Grid>
				<Grid
					
					size={6}
				>
					<Box
						sx={{
							border: '1px solid rgba(255, 65, 189, 0.50) ',
							background:' linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, rgba(255, 65, 189, 0.15) 100%)',
							borderRadius: 2,
							height: '100%',
							padding: '20px',
						}}
					>
						<Stack
						
					>
						<Typography
							variant="body2"
							fontSize={16}
							color="text.dark"
							fontWeight={600}
							textAlign="center"
						>
							Total companies given advances: <strong>15</strong>
						</Typography>

						<Stack
							divider={<Divider orientation="vertical" flexItem />}
							direction="row"
							mt={5}
							mb={2}
						>
							<Box width="100%">
								<Typography
									variant="body2"
									fontSize={16}
									color="text.dark"
									fontWeight={400}
									textAlign="center"
								>
									Ongoing
								</Typography>
								<Typography textAlign="center" my={1.8}>
									10
								</Typography>
							</Box>
							<Box width="100%">
								<Typography
									variant="body2"
									fontSize={16}
									color="text.dark"
									fontWeight={400}
									textAlign="center"
								>
									Closed
								</Typography>
								<Typography textAlign="center" my={1.8}>
									05
								</Typography>
							</Box>
						</Stack>
						</Stack>
						<Stack
							direction="column"
							spacing={2}
							sx={{
								backgroundColor: '#fff',
								p: '20px',
								border: '1px solid #E6E6E6 ',
								borderRadius: 2,
							}}
						>
							<Typography
								variant="body2"
								fontSize={16}
								color="text.dark"
								fontWeight={600}
								flexGrow='1'
							>
								This Month (may): <strong>06</strong>
							</Typography>
							<List
								sx={{
									display: 'flex',
									flexDirection: 'column',
									p: 0,
									'& > li:not(:last-child)' : {
										borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
									}
								}}
							>
								<ListItem
									sx={{
										display: 'flex',
										flexDirection: 'row',
										gap: '10px',
										padding: '8px 0',
									}}
								>
									<Typography
										variant="body2" color="text.dark" fontWeight={400} sx={{ flexGrow: '1' }}>
										Ongoing
									</Typography>
									<Typography variant="subtitle1">
										04
									</Typography>
								</ListItem>
								<ListItem
									sx={{
										display: 'flex',
										flexDirection: 'row',
										gap: '10px',
										padding: '8px 0',
									}}
								>
									<Typography
										variant="body2" color="text.dark" fontWeight={400} sx={{ flexGrow: '1' }}>
										Closed
									</Typography>
									<Typography variant="subtitle1">
										02
									</Typography>
								</ListItem>
							</List>
						</Stack>
					</Box>
				</Grid>
			</Grid>
		</Stack>
	)
};
