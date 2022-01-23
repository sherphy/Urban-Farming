import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {Drawer,List,ListItemButton,ListItemIcon,ListItemText} from "@mui/material";

const Navbar = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false)
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
              Name
            </Typography>
            <Button variant="contained">Logout</Button>
          </Toolbar>
          <Drawer open={OpenDrawer} onClose={()=>setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>test</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
        </AppBar>
      </Box>
    )
}

export default Navbar;