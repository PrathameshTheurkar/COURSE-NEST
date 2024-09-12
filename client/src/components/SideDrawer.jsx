import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, MenuItem } from '@mui/material';
import toast from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const drawerWidth = 270;

function SideDrawer(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const navigate = useNavigate()

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{
        zIndex: 0,
    }}>
      <Toolbar />
      <Divider />

      <List sx={{p: 3}}>
        <ListItem>
        <ListItemText primary={'Main Menu'} />
        </ListItem>

          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/courses')}>
              <ListItemIcon>
                <SchoolIcon sx={{color: '#424242'}}/>
              </ListItemIcon>
              <ListItemText primary={'Courses'} />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/purchases')}>
              <ListItemIcon>
                <ShoppingCartIcon sx={{color: '#424242'}}/>
              </ListItemIcon>
              <ListItemText primary={'Purchases'} />
            </ListItemButton>
          </ListItem>
      </List>
      </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [auth, setAuth] = React.useState(false)
  const [user, setUser] = React.useState({})
  async function handleAuth(){
      const {data} = await axios.get('http://localhost:3000/users/me', {
          headers: {
              "Content-Type" : "application/json",
              "Authorization" : "Bearer "+localStorage.getItem('token')
          }
      }) 
      if(data.auth){
          setAuth(data.auth)
          setUser(data.user)
      }     
  }

  React.useEffect(() => {
    handleAuth()
    console.log(user)
    console.log(auth)
  }, [user, auth]) 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' sx={{backgroundColor: '#fff', color: '#000'}}>
        <Toolbar>
          <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            CourseNest
          </Typography>

          <Box sx={{display: 'flex', alignItems: 'center'}}>
          <IconButton onClick={handleMenu}>
          <AccountCircleIcon fontSize='large' sx={{color: '#2196f3'}}/>
          </IconButton>
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{user.username}</MenuItem>
                <MenuItem onClick={()=>{
                  handleClose()
                  localStorage.setItem('token', null)
                  toast.success('Logout Successfully')
                  navigate('/login')
                }}
                className='flex gap-x-2'
                >Logout<LogoutIcon /> </MenuItem>
              </Menu>
          </Box>
          </div>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 0 }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            zIndex: 0
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{  p: '30px', width: {xs: '100%', sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

SideDrawer.propTypes = {
  window: PropTypes.func,
  children: React.ReactNode
};

export default SideDrawer;
