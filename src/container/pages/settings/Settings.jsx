import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {Box, Paper, Button, Grid, Avatar} from '@mui/material';
/* import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'; */
//import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
//import {TwoWheelerIcon, FavoriteIcon, PersonPinIcon, PhoneMissedIcon, PhoneIcon} from '@mui/icons-material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import AboutApp from "./components/AboutApp";
import AdmobAds from "./components/AdmobAds";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";


const tabs = [
  { name: 'Account & App', href: '#', current: true },
  { name: 'Admob Ads', href: '#', current: false },
  { name: 'Terms & Condition', href: '#', current: false },
  { name: 'Privacy Policy', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Settings() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const showTab = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="">

      <div>
        <Box component="span" className="relative opacity-100 bg-transparent shadow-sm mb-4">
            <Box className="flex relative items-center bg-cover bg-center overflow-hidden min-h-[21.75rem] rounded-xl  bg-center bg-[url(https://demos.creative-tim.com/material-dashboard-react/static/media/bg-profile.af1219a742e09fc7b612.jpeg)]"></Box>
            <Paper elevation={1} className="py-4 px-4 rounded-xl mr-6 ml-6 -mt-12 flex relative mb-4">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid container spacing={{ xs: 3 }}>
                    <Grid item lg={1} md={4} sm={12} xs={12}>
                        <Avatar
                            alt="Ajay Chauhan"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 60, height: 60 }}
                        />
                    </Grid>
                    <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Box className='mt-1'>
                            <h5>Ajay Chauhan</h5>
                            <span className="text-gray-300">COE & Co-Founder of MaQueenSoft</span>
                        </Box>
                    </Grid>
                </Grid>
                <hr className='w-full css-2hb8f' />
                <Box className='w-full mt-2 pt-2'>

                    <div className="border-b border-gray-200 pb-5 sm:pb-0">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">Manage Account & Settings</h3>
                      <div className="mt-3 sm:mt-4">
                        <div className="sm:hidden">
                          <label htmlFor="current-tab" className="sr-only">
                            Select a menu
                          </label>
                          <select
                            id="current-tab"
                            name="current-tab"
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue={tabs[0].name}
                          >
                            {tabs.map((tab) => (
                              <option key={tab.name}>{tab.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="hidden sm:block">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab, index) => (
                              <a
                                key={index}
                                href="#"
                                className={classNames(
                                  activeTab === index
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                )}
                                aria-current={activeTab === index ? 'page' : undefined}
                                onClick={() => showTab(index)}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>
                    
                    <div className="m-2 p-2">
                      {(() => {
                        if (activeTab === 0) {
                          return (
                            <AboutApp />
                          )
                        } else if (activeTab === 1) {
                          return (
                            <AdmobAds />
                          )
                        } else if (activeTab === 2) {
                          return (
                            <TermsConditions />
                          )
                        } else if (activeTab === 3) {
                          return (
                            <PrivacyPolicy />
                          )
                        } else {
                          return (
                            <div>catch all</div>
                          )
                        }
                      })()}
                    </div>


                </Box>
            </Grid>
            </Paper>
            
        </Box>
      </div>
      
    </div>
  );
}
export default Settings;