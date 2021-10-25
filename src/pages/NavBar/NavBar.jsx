import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Link, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBarRoutes from './routes';
import { authOpen } from '../../store/slices/loginSlice';

export default function NavBar() {
  const dispatch = useDispatch();
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
  }, [pathname]);
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    if (!isLogin && NavBarRoutes.find((v) => v.id === value)?.isLogin !== isLogin) {
      dispatch(authOpen());
    }
  }, [value, isLogin]);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        {NavBarRoutes.map((route) => (
          <Tab
            component={Link}
            label={route.label}
            to={route.path}
            key={route.id}
            value={route.id}
          />
        ))}
      </Tabs>
    </Box>
  );
}
