//components of the navbar
import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer,List} from "@mui/material";
// import {Drawer,List,ListItemButton,ListItemIcon,ListItemText,Badge} from "@mui/material";
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => {
  return {    
  drawerPaper: {
    background:
      "linear-gradient(0deg, rgba(104,176,171,0.8) 0%, #DE7E5D 100%)", //edited on 3/1/22 used to be "linear-gradient(180deg, rgba(104,176,171,0.8) 0%, rgba(200,213,185,0.8) 100%)"
    width: '15%',
    [theme.breakpoints.down("md")]: {
      width: 250,
    },
  },
}
})


const Navbar = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false)
    const handleDrawerClose = () => {setOpenDrawer(false);};
    const classes = useStyles()
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{background: '#FFA500'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=> setOpenDrawer(!OpenDrawer)}
            >
             <MenuIcon/>
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Fun Farm
            </Typography>

            {/*<IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={2} color="secondary">
            <ShoppingCartIcon/>
            </Badge>
            </IconButton>*/}

          </Toolbar>
          <Drawer classes={{paper: classes.drawerPaper,}} open={OpenDrawer} onClose={()=>setOpenDrawer(false)}>
                <List>
                <Stack spacing={12}>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/dashboard">Home</Button>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/quiz">Quiz</Button>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/rewards">Rewards</Button>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/cart">Cart</Button>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/guides">Guides</Button>
                  <Button variant="contained" size="large" onClick={handleDrawerClose} component={Link} to="/video">Video</Button>
                </Stack>
                </List>
            </Drawer>


        </AppBar>
      </Box>
    )
}

export default Navbar;