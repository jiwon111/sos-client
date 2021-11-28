import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import * as moment from 'moment';

import '../assets/styles/u4_reservationInfo.css';

const SeatReservationInfo = props => {
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);
  //예약내역 불러오기
  const [reservation, setReservation] = useState([]);

  //예약내역 모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //좌석 사용 종료
  const [seatshow, setseatShow] = useState(false);
  const seathandleClose = () => setseatShow(false);
  const seathandleShow = () => setseatShow(true);
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
  /*좌석 사용 종료 */
  const finishClick = reservationId => {
    seathandleClose();
<<<<<<< HEAD
    console.log(reservationId);
=======
>>>>>>> develop
    const finishHandler = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/${reservationId}/seat`,
        {
          method: 'PATCH',
        },
      );
      if (res.status === 200) {
        alert('정상적으로 처리 되었습니다.');
      } else {
        const json = await res.json();
        alert(json.message);
      }
    };
    finishHandler();
  };

  //예외처리
  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);

  const sortedReservation =
    reservation !== null &&
    reservation.sort((a, b) =>
      a.startTime
        .split('-')
        .join()
        .localeCompare(b.startTime.split('-').join()),
    );
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
            사용 중인 좌석
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
                <th>이용 시작일</th>
                <th>예약 정보</th>
                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {reservation.length !== 0 &&
                reservation.map(item =>
                  item.status === 1 &&
                  item.seat !== null &&
                  item.endTime === null ? (
                    <tr>
                      <td>
                        {moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                      <td>
                        {item.seat.floor.name} {item.seat.name}
                      </td>

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
                          onClick={seathandleShow}
                        >
                          사용종료
                        </button>
                        <Modal show={seatshow} onHide={seathandleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>좌석 {item.seat.name}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>사용을 종료하시겠습니까?</Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={seathandleClose}
                            >
                              취소
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => finishClick(item.id)}
                            >
                              확인
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  ) : null,
                )}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>좌석 사용 내역</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <th>이용 날짜</th>
                <th>예약 정보</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {reservation.length !== 0 &&
                sortedReservation
                  .slice(0)
                  .reverse()
                  .map(item =>
                    item.status === 2 &&
                    item.seat !== null &&
                    item.endTime !== null ? (
                      <tr>
                        <td>
                          {moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}
                          -{moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}
                        </td>
                        <td>
                          {item.seat.floor.name} {item.seat.name}
                        </td>
                      </tr>
                    ) : null,
                  )}
            </MDBTableBody>
          </MDBTable>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SeatReservationInfo;
