import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { FallingLinesLoader } from "../../../components/spinners/Spinner";
import { PieChart } from 'react-minimal-pie-chart';
import { EnvelopeIcon, MapPinIcon, UsersIcon, UserIcon } from '@heroicons/react/20/solid'
import { Grid } from '@mui/material';
import WeekendIcon from '@mui/icons-material/Weekend';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const sample = [
  {
    title: "Collected",
    icon: EnvelopeIcon,
    count: 50,
  },
  {
    title: "To Be Collected",
    icon: EnvelopeIcon,
    count: 20,
  },
  {
    title: "Processing",
    icon: EnvelopeIcon,
    count: 30,
  },
]

const stats = [
  {
    title: 'Booking',
    counts: '22',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-[#42424A] to-[#191919]',
    icon: <WeekendIcon></WeekendIcon>
  },
  {
    title: 'Today\'s Users',
    counts: '22,330',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-cyan-500 to-blue-500',
    icon: <TwoWheelerIcon></TwoWheelerIcon>
  },
  {
    title: 'Booking',
    counts: '22',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-[#42424A] to-[#191919]',
    icon: <WeekendIcon></WeekendIcon>
  },
  {
    title: 'Today\'s Users',
    counts: '22,330',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-cyan-500 to-blue-500',
    icon: <TwoWheelerIcon></TwoWheelerIcon>
  },
  {
    title: 'Booking',
    counts: '22',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-[#42424A] to-[#191919]',
    icon: <WeekendIcon></WeekendIcon>
  },
  {
    title: 'Today\'s Users',
    counts: '22,330',
    sub_title: 'than lask week',
    sub_value: '+55%',
    bg_color: 'from-cyan-500 to-blue-500',
    icon: <TwoWheelerIcon></TwoWheelerIcon>
  }
];

const Home = () => {

  const pages = [{ title: "Dashboard", href: "/" }];
  const [countData, setCountData] = useState([])
  
  let users = [
    { title: 'Male', value: 10, color: '#E38627' },
    { title: 'Female', value: 40, color: '#C13C37' },
    { title: 'Transgender', value: 50, color: '#6A2135' },
  ];

  let agents = [
    { title: 'Test-1', value: 30, color: '#E38627' },
    { title: 'Test-2', value: 45, color: '#C13C37' },
    { title: 'Test-3', value: 25, color: '#6A2135' },
  ];

  return (
    <div>
      <Breadcrumb pages={pages} />

      <div className="overflow-hidden bg-white rounded-md shadow-md sm:rounded-lg mt-5">
        <div className="card card-congratulations text-center">
          <div className="card-body h-48">
              <div className='relative'>
                <img src="data:image/png;base64,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" className="congratulations-img-left"></img>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAABTCAMAAAAY2TOcAAABAlBMVEUAAADtj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj50b0aftj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj50b0acb0acb0aftj53tj53tj53tj53/vAEb0af/vAEb0aftj50b0acb0acb0af/vAEb0af/vAEb0af/vAEb0acb0af/vAH/vAH/vAH/vAH/vAH/vAEb0af/vAEb0af4qz7/vAHtj50b0af/vAFW6jjPAAAAU3RSTlMAAvcI/RXta/IF3tfCWUnStU8sIOF86L2ml4LNuHE3EAySU5wpKCQbsY5hRfnIq6Iy5NaxnYiFdz708uBkQQtbTph5IBT56MXw4puXSEY9IpIxHhHzkVEAAAVwSURBVHja7dtpV9pAGAXgmz00gOyL7CKyKWC12s1q7b4vL/3/f6U0CBPizICVWNLj88GPntzhvZkJJ4DsSgShR0SlKsKOJvRiDeGm0x+5GELNpqn8HkLMpitqVkNo2TTn9BFWNnkUDISTTV6mpSCMbFp0MEIIZchHb9QROhm65nAHYZMhjkQa4ZIhHvV0Q4+Ir14+e/Ps0095CsZ5jA30+cmvP558WZKCGRoIELlwM98mIVzvX2GBQ0JmT8HMZqT4+GvmJTzi2CIxPYuZzUjxYZ7iGWaUZIkkKTLZ8s78w9iMFL/m3swyxCYBhCnUQl/BAT2wNExtRAr/ZxHpOUTCFCWrhokhEZnb05JvRIrFXmhWhkiUwmyMMJWdfizFFrAZKbz3qHolR1dyKPkKnY+xGYrRlN5ZunlcHr+4gxRsv6hlTZpLILpQ6O00PEY0dyAv+sV4/HA36BRs7/5xYpPHtieFOoj7rrROzKTodYjsPh2Px0/PcTfaXZsWJOcptio1XHO4WJgTQdFfPxy72FQFKF1Uyac9TWEXR+CJ0iK1mQLH0djFpio4reE++eXcC42yQvs06ZrEGWegHs5ivEOgUgWdrksAhe09CJ0SRykWgc+L47Hr7WsEqNohrm3I7RBXpnKt6Oduv4McqMdlEtiBXIoEzEdtzlRdIDDxKAmlIafpJLI/TPmn6hIB0OKNApIlEjNXeJ6VKPcRsFalrBJZOHsguwwskyepUgyBqe00p2uo1gCtq5PICZYpkpTZHCEISvU0Or/swvQGtSUrt1yFJB7sFCd/ulUFa2XECjnyOIMrklXF5ZaLk5BZiVwdeg8bZ+sKEnl8UtJ9a6XMW3IgLLdciwT0ogHAYKMVj+C20r2BTddkMadYtqDcchFBqcopuDzDag6TGv6a1u86xKO3F4ImyO8RluPe4pw4rnTJyx7E6n93Q02oJJDAopjJLbdcmTOIFhueJPmonV4NN1FPFv0rJb9Io8Art1yDfPa7NTB1nbOrly0DK3tEUjlO3ZKHnHJLWbRo4DsBHxCPHrXakDFS8d5poxB1CrB0Ylab+lqR5vJgVrzVls7gc0IiB6dpf4PT1aS13eyUDvfnA7gHJG0SawkOuA6LuYI0MTnO97Z9kjhxFy7Vj1W6hbxjih4NqjkSiUJAe6SvXm4obNlO6rz/ppKIainAUJXu/tp0qRwS6EFoND3n7mEVDk0V0jc8L26l3ALkSCI5G/Q8cdl1iEVOVSJTwSo60yGvQiBLfA3taoIl5U2wKxoSTxNSe9Hl5Wb7WiYmTlwlnlxc9uzOqj2nbBNHFXKKlcVKLLKlL4hEbN4iG5hTOiSwDa/e/vWhxLqcNduQSvBrzdQeyKrN9G3yqeDOVDi1XjRSZdVmUoe+Q4CBOzPi1NrHklabaW+R1wB3RzF9teYoSKvN1MvkEccdGizWmqfuSKvNRJo0l1Fwh6yFWvOlbHm1mawnZ3CeH73Aopan1kKxJdVmYiq59DQC85zz9f4huboaJIpLqs08Nv3P0+sPMfH0AguGrNZiWmlJtZmWu8HEEJjLsesSXj0i6hhYIm3SqiNvHBCZGoJz8XQ88RxebVZrmeSyajNahxoI0u7DWQhmkLrZI3YSyyiNFAL14ug5/k4kOqt2qLVzbrVD/S74RF93qx122Um1Q/w6+xWlTEmEn1HEvXv37v2P+vmw/lLHw9LJ2cgYu8dHWFGkSBNOG5vm659X3M6xEiNPrjzWp5qP47bO393kvbAEuaLrG6nWYB1HuuPx1DFWYTg00YxgXRo6TWRxS6/fTl80vFhxpLZIr6z1cD2hF28/UpMMR1+xKoNN8TpoDlEnhds7+r6Lfyce3bhftf8GxgHAIi+xyUgAAAAASUVORK5CYII=" className="congratulations-img-right"></img>
              </div>
              <div className=' h-52 pt-20'>
                <h1 className="mb-5 text-3xl text-white tracking-wide font-semibold	"> Congratulations Ajay, </h1>
                <p className="card-text m-auto w-75 text-white "> You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile. </p>
              </div>
          </div>
        </div>
      </div>

      <div className='MuiBox-root css-bq11r7 mt-8'>
        <Grid container spacing={{ xs: 1, md: 4, lg: 3, xl: 3 }} className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb'>

          {/* Loop Card */}
          {
            stats.map((data, index) => (
              <Grid key={index} item lg={3} md={4} sm={12} xs={12} className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-3 css-17cu47x'>
                <div className='MuiBox-root css-rwss59'>
                  <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d'>
                    <div className='MuiBox-root css-p6siio'>
                      <div className={`MuiBox-root flex justify-center align-center items-center w-16 h-16 -mt-6 opacity-100 rounded-xl text-white shadow-md bg-gradient-to-b ${data.bg_color}`}>
                        {data.icon}
                      </div>
                      <div className='MuiBox-root css-8k5edi'>
                        <span className="MuiTypography-root MuiTypography-button css-1dcnter">{data.title}</span>
                        <h4 className="MuiTypography-root MuiTypography-h4 css-rtlgmj ">{data.counts}</h4>
                      </div>
                    </div>
                    <hr className='MuiDivider-root MuiDivider-fullWidth css-2hb8f' />
                    <div className='MuiBox-root css-bln954'>
                    <p className="MuiTypography-root MuiTypography-button css-1fhu5z7">
                      <span className="MuiTypography-root MuiTypography-button css-141aiuc">{data.sub_value}</span>&nbsp;{data.sub_title}</p>
                    </div>
                  </div>
                </div>
              </Grid>
          ))
        }

        </Grid>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-5">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="flex flex-row text-center p-8">
            <div className="basis-1/2">
              <div className="w-1/2 mx-auto">
              {/* <PieChart
                animation
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={userGraphData}
                label={(userGraphData) => userGraphData.dataEntry.code  + " " + userGraphData.dataEntry.value + '%'}
                labelPosition={70}
                labelStyle={{
                  fontSize: "8px",
                  fontColor: "#FFFFFF",
                  fontWeight: "500",
                }}
              /> */}   
              </div>
              <div className="mt-5 flex justify-center">
                <label className="text-base font-medium text-black-900">Users</label>
                
              </div>
            </div>
            <div className="basis-1/2">
            <div className="w-1/2 mx-auto">
                <PieChart
                  animation
                  animationDuration={500}
                  animationEasing="ease-out"
                  center={[50, 50]}
                  data={agents}
                  label={agents.title}
                  labelPosition={70}
                  labelStyle={{
                    fontSize: "8px",
                    fontColor: "#FFFFFF",
                    fontWeight: "500",
                  }}
                />
              </div>
              <div className="mt-5">
                <label className="text-base font-medium text-black-900">Agents</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-5">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Samples</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
          
        </ul>
        </div>
      </div>

      {/* Masters Data */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-5 mb-5">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Masters</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
          
        </ul>
        </div>
      </div>

    </div>
  )
}

export default Home