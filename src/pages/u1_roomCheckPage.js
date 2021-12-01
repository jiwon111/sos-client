import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';

import NavBarUser from '../components/u_navBar';
import MobileNavBar from '../components/u_m_navBar';
import RoomInfoTable from '../components/u1_roomInfoTable';

import '../assets/styles/u1_roomCheckPage.css';
//회의실 조회 페이지
const RoomCheckPage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  const history = useHistory();

  return (
    <div className="roomCheckPage">
      <div>{isPc ? <NavBarUser /> : null}</div>

      <div className={isPc ? 'roomCheckForm' : 'm_roomCheckForm'}>
        {isPc ? null : (
          <div className="m_checkHeader">
            <div>
              {isMobile ? (
                <FiMenu
                  size={40}
                  onClick={navClick}
                  style={{ color: 'firebrick' }}
                />
              ) : null}
            </div>

            <div className="m_roomCheck_titleTextStyle">회의실 조회</div>
          </div>
        )}

        {open ? <MobileNavBar open={open} /> : null}
        <div className="roomInfoTable">
          <RoomInfoTable />
        </div>
      </div>
    </div>
  );
};

export default RoomCheckPage;
