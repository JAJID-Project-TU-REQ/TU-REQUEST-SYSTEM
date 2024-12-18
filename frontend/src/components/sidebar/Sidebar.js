import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { studentItem, professorItem } from './consts/sidebarItem';
import Box from '@mui/material/Box';
import { styles } from './styles';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../redux/toggleSlice';
import { Grid2, Portal } from '@mui/material';
import logo from '../../assets/images/logo.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MyListItem from '../common/listItem/MyListItem';


const Sidebar = () => {
  const navigate = useNavigate();

  const isToggled = useSelector((state) => state.toggle.value);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggle());
  };

  const role = localStorage.getItem('role');
  const sidebarItem = (role === 'student' ? studentItem : professorItem);

  return (
    <Grid2>
      <SwipeableDrawer
        anchor="left"
        open={isToggled}
        sx={{ width: { sm: 300, }, [`& .MuiDrawer-paper`]: { width: 300, } }}
        onClose={handleToggle}
        variant={"temporary"}
      >
        <Toolbar >
          <Grid2 item sx={{ flexGrow: 1 }}>
            <img src="https://tu.ac.th/uploads/news-tu/banner/banner64/02%20%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%20%E0%B8%82%E0%B8%B2%E0%B8%A7-%E0%B8%94%E0%B8%B3.jpg" alt="Thamasart" style={{ height: '40px' }} />
          </Grid2>
        </Toolbar>
        <Box >
          <Divider />
          <List>
            <ListItemButton

              onClick={() => {
                navigate('/');
              }}
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon
                sx={styles.icons}
              >
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                sx={styles.text}
                primary={role === "student" ? "สถานะ" : "ทั้งหมด"} 
              />
            </ListItemButton>
            <Divider />
            {sidebarItem.map((item, index) => (
              <MyListItem item={item} key={item.id} styles={styles} />
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Grid2>

  );
};

export default Sidebar;