import React from 'react';

const dataOrg = {
    menus: [
        { 
            text: 'Overview', 
            icon: <div style={{ cursor: 'pointer', paddingLeft: '30px' }}> 
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule ="evenodd" htmlFor="evenodd" d="M4.39835 19.7995C1.65046 17.735 0 14.5037 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 14.5037 20.3495 17.735 17.6017 19.7995L17.3348 20H4.66522L4.39835 19.7995ZM16.6575 18C18.753 16.305 20 13.757 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 13.757 3.24698 16.305 5.34253 18H16.6575ZM16.3192 5.57346L14.6808 4.42654L12.0477 8.18803C11.7216 8.06645 11.3685 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14C12.6569 14 14 12.6569 14 11C14 10.4445 13.849 9.92435 13.5859 9.4782L16.3192 5.57346ZM12 11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11C10 10.4477 10.4477 10 11 10C11.5523 10 12 10.4477 12 11Z" fill="white"/>
                    </svg> 
                    </div>, 
            link: 'overview',
            titletxt: 'Dashboard',
            redtxt: '', 
        },
        { 
            text: 'Trainings', 
            icon: <div style={{ cursor: 'pointer', paddingLeft: '30px' }}> 
                   <svg width="22" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 13.8508H5.08063V21.7016L16.1612 7.85078H11.0806V0L0 13.8508ZM7.08062 11.8508H4.16125L9.08062 5.70156V9.85078H12L7.08062 16V11.8508Z" fill="white"/>
                    </svg>
                    </div>, 
            link: 'trainings',
            titletxt: 'Trainings',
            redtxt: 'Add Tranining',            
        },
        { 
            text: 'Candidates', 
            icon: <div style={{ cursor: 'pointer', paddingLeft: '30px' }}> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM19.3995 17.1246C20.4086 15.6703 21 13.9042 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9042 3.59138 15.6703 4.6005 17.1246C5.72595 15.6381 8.3706 15 12 15C15.6294 15 18.274 15.6381 19.3995 17.1246ZM17.9647 18.7398C17.672 17.6874 15.5694 17 12 17C8.43062 17 6.328 17.6874 6.03532 18.7398C7.6233 20.1462 9.71194 21 12 21C14.2881 21 16.3767 20.1462 17.9647 18.7398ZM12 15C9.76086 15 8 13.4274 8 10C8 7.75576 9.5791 6 12 6C14.4142 6 16 7.92158 16 10.2C16 13.4796 14.2181 15 12 15ZM10 10C10 12.2693 10.8182 13 12 13C13.1777 13 14 12.2984 14 10.2C14 8.95042 13.2157 8 12 8C10.7337 8 10 8.81582 10 10Z" fill="white"/>
                    </svg>
                    </div>, 
            link: 'candidates',
            titletxt: 'Candidates',
            redtxt: 'Add Candidate',            
        },
        { 
            text: 'Reports', 
            icon: <div style={{ cursor: 'pointer', paddingLeft: '30px' }}> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 3H21C22.1046 3 23 3.89543 23 5V19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3ZM3 5V19H21V5H3ZM7 17H9V11H7V17ZM13 17H11V7H13V17ZM15 17H17V10H15V17Z" fill="white"/>
                    </svg>

                    </div>, 
            link: 'reports',
            titletxt: 'Reports',
            redtxt: '',   
        },
        { 
            text: 'My Account', 
            icon: <div style={{ cursor: 'pointer', paddingLeft: '30px' }}> 
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule ="evenodd" htmlFor="evenodd" d="M17.6562 19.897L19.8733 17.6798L19.0925 14.843L19.4327 14.0305L22 12.5818V9.44645L19.44 7.99173L19.1055 7.18067L19.8961 4.34235L17.6774 2.12683L14.8403 2.90748L14.0296 2.56758L12.5808 0H9.44544L7.99072 2.56004L7.17985 2.89446L4.34198 2.10281L2.1267 4.31809L2.90748 7.15567L2.56758 7.96634L0 9.41514V12.5496L2.55774 14.0076L2.89252 14.8193L2.10197 17.6572L4.31809 19.8733L7.15567 19.0925L7.96644 19.4325L9.41527 21.999H12.5498L14.0067 19.4412L14.8183 19.1065L17.6562 19.897ZM17.8527 12.6256L16.9809 14.7078L17.6362 17.0886L17.0678 17.657L14.692 16.9951L12.609 17.8542L11.3873 19.999H10.5829L9.37141 17.8529L7.29155 16.9808L4.90947 17.6362L4.34203 17.0688L5.00385 14.693L4.14482 12.6101L2 11.3876V10.583L4.1471 9.3715L5.0192 7.29155L4.36375 4.90947L4.93001 4.34321L7.30576 5.00595L9.38955 4.14655L10.6093 2H11.4129L12.6245 4.1471L14.7044 5.0192L17.087 4.36362L17.6558 4.93166L16.9941 7.30696L17.8534 9.39056L20 10.6103V11.4139L17.8527 12.6256ZM11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11C15 13.2091 13.2091 15 11 15ZM13 11C13 12.1046 12.1046 13 11 13C9.89543 13 9 12.1046 9 11C9 9.89543 9.89543 9 11 9C12.1046 9 13 9.89543 13 11Z" fill="white"/>
                    </svg>
                    </div>, 
            link: 'myaccount',
            titletxt: 'My Account',
            redtxt: '', 
        }
    ],
    browserUsage: [
        {name: 'Chrome', value: 800},
        {name: 'Firefox', value: 300},
        {name: 'Safari', value: 300}
    ],
    circleColor: [
        {
            color: 1, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#FFA800"/>
                    </svg>
                </div>,
            svgColor: "#FFA800"
        },
        {
            color: 2, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#FF475B"/>
                    </svg>
                </div>, 
            svgColor: "#FF475B"
        },
        {
            color: 3, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#551ECB"/>
                    </svg>
                </div>,
            svgColor: "#551ECB"
        },
        {
            color: 4, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#009FFA"/>
                    </svg>
                </div>,
            svgColor: "#009FFA"
        },
        {
            color: 5, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#00B187"/>
                    </svg>
                </div>,
            svgColor: "#00B187"
        },
        {
            color: 6, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#CF6BE8"/>
                    </svg>
                </div>,
            svgColor: "#CF6BE8"
        },
        {
            color: 7, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#962010"/>
                    </svg>
                </div>,
            svgColor: "#962010"
        },
        {
            color: 8, 
            svg: 
                <div style={{ cursor: 'pointer', margin: '5px' }}> 
                   <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#FF6B00"/>
                    </svg>
                </div>,
            svgColor: "#FF6B00"
        }
    ],
    country: [
        'Trial',
        'Logic',
        'knowledge',
    ],
        
    
  // tablePage: {
  //   items: [
  //     {id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1'},
  //     {id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2'},
  //     {id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3'},
  //     {id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4'},
  //     {id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5'},
  //     {id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6'},
  //     {id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7'},
  //     {id: 8, name: 'Product 8', price: '$750.00', category: 'Category 8'}
  //   ]
  // },
  // dashBoardPage: {
  //   recentProducts: [
  //     {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
  //     {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
  //     {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 22GB Factory Unlocked GSM 4G '},
  //     {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
  //   ],
  //   monthlySales: [
  //     {name: 'Jan', uv: 3700},
  //     {name: 'Feb', uv: 3000},
  //     {name: 'Mar', uv: 2000},
  //     {name: 'Apr', uv: 2780},
  //     {name: 'May', uv: 2000},
  //     {name: 'Jun', uv: 1800},
  //     {name: 'Jul', uv: 2600},
  //     {name: 'Aug', uv: 2900},
  //     {name: 'Sep', uv: 3500},
  //     {name: 'Oct', uv: 3000},
  //     {name: 'Nov', uv: 2400},
  //     {name: 'Dec', uv: 2780}
  //   ],
  //   newOrders: [
  //     {pv: 2400},
  //     {pv: 1398},
  //     {pv: 9800},
  //     {pv: 3908},
  //     {pv: 4800},
  //     {pv: 3490},
  //     {pv: 4300}
  //   ],
  //   browserUsage: [
  //     {name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore/>},
  //     {name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight/>},
  //     {name: 'Safari', value: 300, color: purple600, icon: <ExpandLess/>}
  //   ]
  // }
};

export default dataOrg;
