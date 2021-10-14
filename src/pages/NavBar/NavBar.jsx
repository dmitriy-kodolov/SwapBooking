import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Link, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBarRoutes from './routes';

export default function NavBar() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    const exactPath = NavBarRoutes.find((path) => pathname.includes(path.path));
    if (exactPath) {
      setValue(exactPath.id);
    }
  }, []);
  const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <Box sx={{ width: '800px' }}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {NavBarRoutes.map((route) => (
          <Tab
            component={Link}
            label={route.label}
            to={route.path}
            key={route.id}
            value={route.id}
            disabled={route.isLogin && route.isLogin !== isLogin}
          />
        ))}
      </Tabs>
    </Box>
  );
}
