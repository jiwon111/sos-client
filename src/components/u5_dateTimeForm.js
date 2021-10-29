import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { addDays, getDate, getHours, getMinutes, getYear } from 'date-fns';
import ButtonForm from '../components/u5_confirmButton';

import '../assets/styles/u5_dateTimeForm.css';
import '../assets/styles/u2_calendar.css';
import getMonth from 'date-fns/getMonth';
//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = () => {
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="dateTimeForm">
      <div className="seatNameTextStyle">[ 좌석 18 ]</div>
      <div className="reservationDatePicker">
        <div className="reservationDatePicker_start">
          <p className="startTimeTextStyle">사용 일시(시작)</p>
          <DatePicker
            ClassName="startPicker" //시작 시간
            selected={startDate}
            onChange={date => {
              setStartDate(date);
            }}
            locale={ko}
            dateFormat="yyyy-MM-dd h:mm"
            minDate={new Date()} //오늘 이전 날짜 선택 안되게
            maxDate={addDays(new Date(), 6)} //일주일 뒤는 예약 못함
            placeholderText="예약 날짜 선택"
            showTimeInput
            closeOnScroll={true} //스크롤 했을 때 닫힘
            //customInput={<MyCustom />}
          />
        </div>
        <div>
          {getYear(startDate)}년{getMonth(startDate)}월{getDate(startDate)}일
          {getHours(startDate)}시{getMinutes(startDate)}분
        </div>
        <div className="reservationDatePicker_end">
          <p className="startTimeTextStyle">사용 일시(종료)</p>
          <DatePicker
            ClassName="endPicker" //끝 시간
            selected={endDate}
            onChange={date => setEndDate(date)}
            locale={ko}
            dateFormat="yyyy-MM-dd h:mm"
            minDate={startDate} //오늘 이전 날짜 선택 안되게
            maxDate={startDate} //앞에 선택된 날짜 고정
            placeholderText="예약 날짜 선택"
            showTimeInput
            closeOnScroll={true} //스크롤 했을 때 닫힘
            //customInput={<MyCustom />}
          />
        </div>
        <div>
          {getYear(endDate)}년{getMonth(endDate)}월{getDate(endDate)}일
          {getHours(endDate)}시{getMinutes(endDate)}
        </div>
      </div>
      <ButtonForm />
    </div>
  );
};
export default DateTimeForm;
