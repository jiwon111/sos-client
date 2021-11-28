import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Button from 'react-bootstrap/Button';

import UserDetailModalContent from './a4_userDetailModal';
import tableHeadertoKR from './a4_tableHeadertoKR';
import UsePagination from './a4_usePagination';

import '../assets/styles/a4_userTable.css';
export default function UserTable({ data }) {
  //헤더들
  const columns = data[0] && Object.keys(data[0]);

  //모달 관련 함수
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  useEffect(() => {
    console.log(modalInfo);
  }, [modalInfo]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
        {/* 헤더 */}
        <MDBTableHead>
          <tr style={{ fontSize: '0.8em' }}>
            {data[0] &&
              columns.map(heading =>
                heading === 'role' ? '' : <th>{tableHeadertoKR(heading)}</th>,
              )}
          </tr>
        </MDBTableHead>
        {/* 바디 */}
        <MDBTableBody>
          {currentUsers.map((row, idx) => (
            <tr style={{ fontSize: '0.8em' }}>
              <td>{idx + 1}</td>
              {columns.map(column =>
                column === 'role' || column === 'id' ? (
                  ''
                ) : column === 'createdAt' || column === 'updatedAt' ? (
                  <td>{row[column].slice(0, 10)}</td>
                ) : (
                  <td>{row[column]}</td>
                ),
              )}
              <td style={{ fontSize: '0.7em' }}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  animation="false"
                  onClick={e => {
                    setModalInfo(row);
                    toggleTrueFalse();
                  }}
                >
                  조회하기
                </Button>
                {show ? (
                  <UserDetailModalContent
                    show={show}
                    handleClose={handleClose}
                    modalInfo={modalInfo}
                    data={data}
                    columns={columns}
                  />
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <UsePagination
        totalUsers={data.length}
        usersPerPage={userPerPage}
        paginate={paginate}
      />
    </div>
  );
}
