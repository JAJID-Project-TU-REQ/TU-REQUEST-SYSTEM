import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon'; 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, Grid2 } from '@mui/material';
import { useNavigate } from "react-router-dom";


const MyListItem = (props) => {
    const navigate = useNavigate();
    const item = props.item;
    const children = item.children;
    const styles = props.styles;
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
  return (
    <Grid2>
    <ListItemButton
        button
        key={item.id}
        onClick={handleToggle}
        sx={{borderRadius: 2, mt: 1}}
    >
        <ListItemIcon
            sx={styles.icons}
        >
            {item.icon}
        </ListItemIcon>
        <ListItemText
            sx={styles.text}
            primary={item.label}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>  
    <Collapse in={open}  timeout="auto" unmountOnExit>
        {children.map((child, index) => (
            <ListItemButton
                button
                onClick={() => navigate(child.routes)}
                key={child.id}
                sx={{pl: 12, mt: 0.5, borderRadius: 2}}
            >
                <ListItemText
                    sx={props.styles.childernText}
                    primary={child.label}
                />
            </ListItemButton>
        ))}
    </Collapse>
    </Grid2>
    )
}

export default MyListItem