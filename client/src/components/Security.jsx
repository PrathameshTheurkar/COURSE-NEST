import { Box, Button, TextField, Typography } from "@mui/material";

const Security = () => {
    return <>
    <Box sx={{
        width: {xs: '100%', sm: '45%'},

    }}>
        <Typography variant='h7' sx={{fontWeight: 545}}>Current Password <span aria-hidden='true' style={{color: 'red', fontWeight: 'bold'}}>*</span> </Typography>
        <TextField fullWidth variant='outlined' size='small' margin="normal"/>

        <Typography variant='h7' sx={{fontWeight: 545}}>New Password <span aria-hidden='true' style={{color: 'red', fontWeight: 'bold'}}>*</span></Typography>
        <TextField fullWidth variant='outlined' size='small' margin="normal"/>

        <Typography variant='h7' sx={{fontWeight: 545}}>Confirm New Password <span aria-hidden='true' style={{color: 'red', fontWeight: 'bold'}}>*</span> </Typography>
        <TextField fullWidth variant='outlined' size='small' margin="normal"/>

        <Box sx={{      
            display: 'flex',
            justifyContent: 'center',
        }}>
        <Button variant='contained' sx={{
            borderRadius: 5,
            mt: 5
        }}>Change Password</Button>
        </Box>
    </Box>
    </>
}

export default Security;