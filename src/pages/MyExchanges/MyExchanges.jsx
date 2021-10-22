/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WantsExchange from 'components/WantsExchange';
import WantsRecive from 'components/WantsRecive/WantsRecive';
import CoincidencesList from './components/CoincidencesList/CoincidencesList';
import ActiveOffers from 'components/ActiveOffers';
import Profile from 'components/Profile';
import Archive from 'components/Archive';
import { setTab } from '../../store/slices/exchangesSlice';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function MyExchange() {
  const dispatch = useDispatch();
  const { selectedTab, disabledTabs } = useSelector((state) => state.exchanges);

  const handleChange = (event, newValue) => {
    dispatch(setTab(newValue));
  };

  const user = useSelector((state) => state.profileInfo.userProfile?.[0]?.user_name);

  return (
    <Box
      sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        scrollButtons={false}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          height: 'max-content',
          minWidth: 300,
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 100,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          onClick={(e) => handleChange(e, 0)}
        >
          <Typography align="center">
            {user}
          </Typography>
        </Box>
        <Tab label="Предложения для обмена" {...a11yProps(0)} disabled={disabledTabs?.includes(1)} />
        <Tab label="Хочу обменять" {...a11yProps(1)} disabled={disabledTabs?.includes(2)} />
        <Tab label="Хочу получить" {...a11yProps(2)} disabled={disabledTabs?.includes(3)} />
        <Tab label="Активные обмены" {...a11yProps(3)} />
        <Tab label="Архив" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <CoincidencesList />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <WantsExchange />
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <WantsRecive />
      </TabPanel>
      <TabPanel value={selectedTab} index={4}>
        <ActiveOffers />
      </TabPanel>
      <TabPanel value={selectedTab} index={5}>
        <Archive />
      </TabPanel>
    </Box>
  );
}

export default MyExchange;
