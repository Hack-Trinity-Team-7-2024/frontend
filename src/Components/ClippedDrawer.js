import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from './TaskIcon';
import TypingPopup from './TypingPopup';
import LogoTextBeside from './LogoTextBeside';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function ClippedDrawer({ drawerWidth, addTask }) {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h6" noWrap component="div">
            <LogoTextBeside sx={{width: 150}}/>
          </Typography>

          <div style={{flexGrow: 1}}>
            <TypingPopup addTask={addTask}/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText primary={"To-Do"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentTurnedInIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Completed"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}