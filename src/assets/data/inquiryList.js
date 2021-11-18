//임의로 만든 문의 데이터t

const InquiryData = {
  listData: [
    {
      id: 1,
      status: 0, //답변대기
      title: '좌석 예약이 안돼요', //db엔 없음
      message: '3층 11번 예약하기 눌렀는데 예약이 안돼요',
      created_at: '21.10.30',
      reply: '',
      replied_at: '',
    },
    {
      id: 2,
      status: 1, //답변완료
      title: 'ESL 연동이 안돼요', //db엔 없음
      message: 'ESL 연동이 왜 안되는 거죠',
      created_at: '21.10.28',
      reply:
        '안녕하세요 관리자입니다. esl은 어쩌곤이ㅏ러정보가 ESL 화면에 출력된다. 관리자는 회원 관리(조회, 삭제) 뿐만 아니라 좌석과 회의실을 관리(등록,  수정)하여 회원이 좌석, 회의실을 예약할 수 있도록 한다. 좌석 조회는 각 층의 등록된 좌석을 조회하고 선택할 수 있는 과정이며, 좌석 예약은 선택된 좌석을 원하는 날짜와 시간에 예약하여 좌석을 사용할 수 있는 기능이다. 문의하기는 회원과 관리자간의 메세지를 통한 커뮤니케이션을 할 수 있는 기능이다.',
      replied_at: '21.10.29',
    },
  ],
};

export default InquiryData;