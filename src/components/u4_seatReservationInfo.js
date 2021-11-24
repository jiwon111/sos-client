import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';

import '../assets/styles/u4_reservationInfo.css';

const SeatReservationInfo = props => {
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

  //예약내역 모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              width: '20%',
            }}
          >
            사용중인 좌석
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
                onClick={handleShow}
              />
            </p>
          </OverlayTrigger>
        </div>
        <div>
          <MDBTable
            hover
            style={{
              width: '90%',
              marginLeft: '5%',
              fontSize: '0.9em',
            }}
          >
            <MDBTableHead>
              <tr>
                <th>이용시작일</th>
                <th>예약정보</th>
                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>2021-11-24</td>
                <td>3층 12번</td>

                <td>
                  <button
                    style={{
                      height: '4vh',
                      width: '5vw',
                      border: '1px solid #c00000',
                      borderRadius: '3px',
                      color: '#c00000',
                      backgroundColor: 'transparent',
                    }}
                  >
                    사용종료
                  </button>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>좌석 사용 내역</Modal.Title>
        </Modal.Header>
        <Modal.Body>불러오기</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
export default SeatReservationInfo;
