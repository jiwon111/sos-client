import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../assets/styles/u4_reservationInfo.css';

const RoomReservationInfo = props => {
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //예약내역 불러오기
  const [reservation, setReservation] = useState([]);
  const res = async () => {
    const id = Number(props.user.id);
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setReservation(json);
      });
  };

  //예외처리
  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);

  return (
    <div className="reservationInfo">
      <div>
        <div className="reservationInfo-header">
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1.4em',
              marginLeft: '3%',
              marginTop: '1%',
              width: '24%',
            }}
          >
            회의실 예약 내역
          </p>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip
                id="tooltip-right"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginLeft: '1%',
                }}
              >
                이용내역 조회하기
              </Tooltip>
            }
          >
            <p>
              <ai.AiOutlineHistory
                size={25}
                className="reservation-history-icon"
              />
            </p>
          </OverlayTrigger>
        </div>
        <div>
          <MDBTable hover style={{ width: '90%', marginLeft: '5%' }}>
            <MDBTableHead style={{ fontSize: '0.9em' }}>
              <tr>
                <th style={{ width: '20%' }}>이용날짜</th>
                <th style={{ width: '20%' }}>예약정보</th>
                <th style={{ width: '20%' }}>시작시간</th>
                <th style={{ width: '20%' }}>종료시간</th>
                <th style={{ width: '20%' }}></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody></MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};
export default RoomReservationInfo;
