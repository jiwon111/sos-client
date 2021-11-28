import React, { useState, useEffect } from 'react';

import { Board } from './a5_Board.js';

import { BoardSetting } from './BoardSetting';

<<<<<<< HEAD
import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../const/object-type.const';

export const BoardContainer = ({ floor }) => {
  const [board, setBoard] = useState([]);
  const [originBoard, setOriginBoard] = useState([]);
=======
import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';

import { SELECTION_FIRST } from '../const/selection-type.const';

export const BoardContainer = ({ floor }) => {
  const [board, setBoard] = useState([]);
>>>>>>> develop

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
    width: 0,
    height: 0,
    maxUser: 0,
<<<<<<< HEAD
    stage: 0,
=======
    stage: SELECTION_FIRST,
    type: EMPTY,
>>>>>>> develop
  });

  const [tab, setTab] = useState(0);

  useEffect(() => {
    setBoard(
      Array.from({ length: floor.height }, () =>
        Array.from({ length: floor.width }, () => {
<<<<<<< HEAD
          return { type: EMPTY, id: -1, name: '' };
=======
          return {
            type: EMPTY,
            id: -1,
            name: '',
            width: 1,
            height: 1,
            select: false,
          };
>>>>>>> develop
        }),
      ),
    );

    const fetchSeats = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setSeats(await result.json());
    };

    const fetchRooms = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setRooms(await result.json());
    };

    const fetchFacilities = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setFacilities(await result.json());
    };

    fetchSeats();
    fetchRooms();
    fetchFacilities();
  }, [floor.id]);

  useEffect(() => {
    let newMap = board;

<<<<<<< HEAD
    newMap = newMap.map(row =>
      row.map(col => {
        if (col.type === SELECTION) return { type: EMPTY, id: -1, name: '' };
        return col;
=======
    newMap = Array.from({ length: floor.height }, () =>
      Array.from({ length: floor.width }, () => {
        return {
          type: EMPTY,
          id: -1,
          name: '',
          width: 1,
          height: 1,
          select: false,
        };
>>>>>>> develop
      }),
    );

    for (let seat of seats) {
<<<<<<< HEAD
      newMap[seat.y][seat.x] = { type: SEAT, id: seat.id, name: seat.name };
=======
      newMap[seat.y][seat.x] = {
        type: SEAT,
        id: seat.id,
        name: seat.name,
        width: 1,
        height: 1,
        select: false,
      };
>>>>>>> develop
    }

    for (let room of rooms) {
      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
<<<<<<< HEAD
          if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return {
                type: ROOM,
                id: room.id,
                name: room.name,
=======
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
              id: room.id,
              name: room.name,
              width: room.width,
              height: room.height,
              select: false,
            };
          else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return {
                ...col,
                width: 0,
                height: 0,
>>>>>>> develop
              };

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: facility.type,
<<<<<<< HEAD
=======
        width: 1,
        height: 1,
        select: false,
>>>>>>> develop
      };
    }

    setBoard(newMap);
<<<<<<< HEAD
    setOriginBoard(newMap);
  }, [facilities]);
=======
  }, [seats, rooms, facilities]);
>>>>>>> develop

  return (
    <div
      className="board-container"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
      }}
    >
      <Board
        selection={selection}
        setSelection={setSelection}
        tab={tab}
        setTab={setTab}
        board={board}
        setBoard={setBoard}
<<<<<<< HEAD
        originBoard={originBoard}
=======
>>>>>>> develop
        seats={seats}
        rooms={rooms}
        facilities={facilities}
      />
      <BoardSetting
        selection={selection}
<<<<<<< HEAD
=======
        setSelection={setSelection}
>>>>>>> develop
        tab={tab}
        setTab={setTab}
        floor={floor}
        seats={seats}
        setSeats={setSeats}
        rooms={rooms}
        setRooms={setRooms}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </div>
  );
};
