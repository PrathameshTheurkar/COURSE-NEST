import {Typography, Link} from '@mui/material'

const CopyRight = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/login">
          Course Nest
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default CopyRight