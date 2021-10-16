/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
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
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.login.profile?.name);

  return (
    <Box
      sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
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
        <Tab label="Предложения для обмена" {...a11yProps(0)} />
        <Tab label="Хочу обменять" {...a11yProps(1)} />
        <Tab label="Хочу получить" {...a11yProps(2)} />
        <Tab label="Активные обмены" {...a11yProps(3)} />
        <Tab label="Архив" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CoincidencesList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WantsRecive />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <WantsExchange />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ActiveOffers />
      </TabPanel>
      <TabPanel value={value} index={5}>
        тут будет архив
      </TabPanel>
    </Box>
  );
}

export default MyExchange;
