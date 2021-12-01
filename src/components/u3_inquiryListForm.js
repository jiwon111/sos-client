import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import InquiryForm from './u3_inquiryForm';
import '../assets/styles/u3_inquiryListForm.css';
import * as moment from 'moment';

const InquiryListForm = ({ user, addInquiryClick }) => {
  const [click, setClick] = useState(0);
  const setterAddInquiryClick = () => {
    setClick(0);
  };
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [cookie] = useCookies('access_token');

  //문의 가져오기
  const [question, setquestion] = useState([]);

  const res = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/questions/search?userId=${user.id}`,
      {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setquestion(json);
      });
  };

  useEffect(() => {
    if (user.id !== 'undefined') {
      res();
    }
  }, [user.id]);

  //문의 답변 삭제 버튼
  const deleteClick = questionId => {
    const deleteHandler = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/questions/${questionId}`,
        {
          method: 'DELETE',
        },
      );
      window.location.href = '/inquire'; //성공이면 바꾸기
      if (response.status === 200) {
        alert('문의가 삭제되었습니다.');
      } else {
        const json = await response.json();
        alert(json.message);
      }
    };
    deleteHandler();
  };
  //모달 관련 합수
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (addInquiryClick) {
      addInquiryClick = 0;
    }
  };
  const handleShow = () => setShow(true);
  console.log(addInquiryClick);
  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };
  const mobileHandleShow = () => {
    if (addInquiryClick) {
      setShowModal(handleShow);
      console.log('보여줘');
    }
  };
  useEffect(() => {
    mobileHandleShow();
  }, [addInquiryClick]);
  return (
    /*전체 문의 리스트 */
    <div>
      <div className="inquiryListTotal">
        {question.length === 0 ? (
          <div className={isPc ? 'noInquiryList' : 'm_noInquiryList'}>
            <div>
              <AiIcon.AiOutlineQuestionCircle
                size={50}
                className="alertStyle"
              />
            </div>
            <div>
              <p className="alertTextStyle">
                문의 내역이 존재하지 않습니다.
                <br />
                상단의 <AiIcon.AiOutlinePlusSquare size={20} />
                버튼을 눌러 새로운 문의를 생성해 주세요.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Accordion className="u3_accordion" defaultActiveKey="0" flush>
              {/*하나의 문의 제목, 내용/답변*/}
              {question &&
                question
                  .slice(0)
                  .reverse()
                  .map((item, idx) => (
                    <Accordion.Item
                      eventKey={item.id}
                      className="inquiryTitleAndAnswer"
                    >
                      {/* 문의 헤더 */}
                      <Accordion.Header className="inquiryTitle">
                        <div className="inquiryTitleMain">
                          <div className="inquiryTitleUpper">
                            {/* 문의 상태 */}
                            {isPc ? (
                              <p
                                className="isReply"
                                style={
                                  item.status === 1
                                    ? { color: 'green' }
                                    : { color: 'gray' }
                                }
                              >
                                {item.status === 1 ? '답변완료' : '답변대기'}
                              </p>
                            ) : (
                              <p
                                className="isReply"
                                style={
                                  item.status === 1
                                    ? { color: 'green' }
                                    : { color: 'gray' }
                                }
                              >
                                ●
                              </p>
                            )}
                            {/* {isPc ? <p className="index">{idx + 1}</p> : null} */}
                            {/* 문의 제목 */}
                            <p
                              key={idx}
                              className={
                                isPc
                                  ? 'inquiryTitleStyle'
                                  : 'm_inquiryTitleStyle'
                              }
                            >
                              {item.title}
                            </p>
                            {/* 문의 날짜 */}
                            <p
                              className={
                                isPc ? 'inquiryDateStyle' : 'm_inquiryDateStyle'
                              }
                            >
                              {moment(item.createdAt).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )}
                            </p>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="inquiryContent">
                        <div className="inquiryMsg">
                          <div className="inquiryAndDeleteButton">
                            <p
                              className={
                                isPc ? 'inquiryBodyTitle' : 'm_inquiryBodyTitle'
                              }
                            >
                              {isPc ? '문의 내용' : '문의'}
                            </p>

                            <div
                              className={
                                isPc ? 'deleteInquiry' : 'm_deleteInquiry'
                              }
                              onClick={() => deleteClick(item.id)}
                            >
                              삭제
                            </div>
                          </div>
                          <div
                            className={
                              isPc
                                ? 'inquiryBodyMessage'
                                : 'm_inquiryBodyMessage'
                            }
                          >
                            {item.message}
                          </div>
                        </div>
                      </Accordion.Body>
                      {/* 답변 */}
                      {item.status === 1 ? (
                        <Accordion.Body className="inquiryAnswer">
                          <div className="inquiryMsg">
                            <div className="inquiryAndDeleteButton">
                              <p
                                className={
                                  isPc
                                    ? 'inquiryBodyTitle'
                                    : 'm_inquiryBodyTitle'
                                }
                              >
                                {isPc ? '답변 내용' : '답변'}
                              </p>
                              <p
                                className={
                                  isPc
                                    ? 'answerDateTextStyle'
                                    : 'm_answerDateTextStyle'
                                }
                              >
                                {moment(item.answer?.createdAt).format(
                                  'YYYY-MM-DD HH:mm:ss',
                                )}
                              </p>
                            </div>
                            <div
                              style={{ width: '70%' }}
                              className={
                                isPc
                                  ? 'inquiryBodyMessage'
                                  : 'm_inquiryBodyMessage'
                              }
                            >
                              {item.answer?.message}
                            </div>
                          </div>
                        </Accordion.Body>
                      ) : null}
                    </Accordion.Item>
                  ))}
            </Accordion>
          </div>
        )}
        {
          isPc ? (
            <div>
              <button
                className="inquiryButton"
                onClick={e => toggleTrueFalse()}
              >
                문의 하기{' '}
              </button>
            </div>
          ) : null
          // <div className="inquiryListUpper">
          //   <p className={isPc ? 'myListText' : 'm_myListText'}>
          //     나의 문의 내역
          //   </p>

          //   <AiIcon.AiOutlinePlusSquare
          //     className="newInquiryIcon"
          //     size={30}
          //     onClick={e => toggleTrueFalse()}
          //   />
          // </div>
        }
      </div>
      {show ? <InquiryForm show={show} handleClose={handleClose} /> : null}
      {addInquiryClick ? (
        <InquiryForm show={show} handleClose={handleClose} />
      ) : null}
    </div>
  );
};
export default InquiryListForm;
