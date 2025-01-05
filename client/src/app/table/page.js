'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditMode, updateSquare, clearSquare, setSquares } from '@/lib/redux/slices/squaresSlice';
import axios from 'axios';
require('dotenv').config();
import './TableStyles.css';

const SquareGrid = () => {
  const dispatch = useDispatch();
  const { squares, isEditing } = useSelector((state) => state.squares);
  const [selectedType, setSelectedType] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [reservationData, setReservationData] = useState({
    customerName: '',
    reservationTime: '',
    numberOfSeats: '',
    specialRequest: '',
  });
  const [isReserving, setIsReserving] = useState(false);
  const [reservedTableId, setReservedTableId] = useState(null);
  const user = useSelector((state) => state.user);
  const canvasRef = useRef(null);

  const gridSize = 10;
  const squareSize = 60;

  const handleEditClick = () => {
    dispatch(toggleEditMode());
  };

  const handleIconClick = (type) => {
    setSelectedType(type);
  };

  const getSquareIndex = (x, y) => {
    const row = Math.floor(y / squareSize);
    const col = Math.floor(x / squareSize);
    return row * gridSize + col;
  };

  const handleMouseDown = (e) => {
    if (isEditing && (selectedType === 'table' || selectedType === 'bench' || selectedType === 'chair')) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const startIndex = getSquareIndex(x, y);

      setDragging(true);
      setDragStartIndex(startIndex);
      setSelectedSquares([startIndex]);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const index = getSquareIndex(x, y);

      const [startRow, startCol] = [Math.floor(dragStartIndex / gridSize), dragStartIndex % gridSize];
      const [currentRow, currentCol] = [Math.floor(index / gridSize), index % gridSize];

      const rowStart = Math.min(startRow, currentRow);
      const rowEnd = Math.max(startRow, currentRow);
      const colStart = Math.min(startCol, currentCol);
      const colEnd = Math.max(startCol, currentCol);

      const newSelectedSquares = [];
      for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = colStart; col <= colEnd; col++) {
          newSelectedSquares.push(row * gridSize + col);
        }
      }

      setSelectedSquares(newSelectedSquares);
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
      
      if (selectedSquares.length > 0 && selectedType) {
        dispatch(updateSquare({ indexes: selectedSquares, type: selectedType }));
        setSelectedSquares([]);
      }
    }
  };

  const handleClick = async (e) => {
    if (isEditing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const index = getSquareIndex(x, y);

      if (selectedType === 'reserve') {
        const tableId = squares[index];
        if (tableId) {
          setReservedTableId(tableId);
          setIsReserving(true);
        }
      } else {
        if (selectedSquares.length > 0 && selectedType) {
          dispatch(updateSquare({ indexes: selectedSquares, type: selectedType }));
          setSelectedSquares([]);
        } else if (selectedType === 'remove') {
          dispatch(clearSquare({ index }));
        } else {
          dispatch(updateSquare({ indexes: [index], type: selectedType }));
        }
      }
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (reservationData.customerName && reservationData.reservationTime && reservedTableId && reservationData.numberOfSeats) {
      try {
        const userId = user.user_id;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
          user_id: userId,
          table_id: reservedTableId,
          customer_name: reservationData.customerName,
          reservation_time: reservationData.reservationTime,
          number_of_seats: reservationData.numberOfSeats,
          special_request: reservationData.specialRequest,
          status: 'pending',
        });

        alert('Table reserved successfully!');
        setIsReserving(false);
        setReservedTableId(null);
      } catch (error) {
        console.error(error);
        alert('Error reserving the table');
      }
    }
  };

  const renderReservationForm = () => (
    <div className="reservation-form">
      <h3>Reserve Table</h3>
      <form onSubmit={handleReservationSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={reservationData.customerName}
            onChange={(e) => setReservationData({ ...reservationData, customerName: e.target.value })}
            required
          />
        </label>
        <label>
          Reservation Time:
          <input
            type="datetime-local"
            value={reservationData.reservationTime}
            onChange={(e) => setReservationData({ ...reservationData, reservationTime: e.target.value })}
            required
          />
        </label>
        <label>
          Number of Seats:
          <input
            type="number"
            value={reservationData.numberOfSeats}
            onChange={(e) => setReservationData({ ...reservationData, numberOfSeats: e.target.value })}
            required
          />
        </label>
        <label>
          Special Requests:
          <textarea
            value={reservationData.specialRequest}
            onChange={(e) => setReservationData({ ...reservationData, specialRequest: e.target.value })}
          />
        </label>
        <button type="submit">Reserve Table</button>
        <button type="button" onClick={() => setIsReserving(false)}>Cancel</button>
      </form>
    </div>
  );

  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        const x = col * squareSize;
        const y = row * squareSize;

        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, y, squareSize, squareSize);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x, y, squareSize, squareSize);

        if (squares[index]) {
          ctx.fillStyle = '#000';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          if (squares[index] === 'chair') {
            ctx.fillText('🪑', x + squareSize / 2, y + squareSize / 2);
          } else if (squares[index] === 'table') {
            ctx.fillText('🛋️', x + squareSize / 2, y + squareSize / 2);
          } else if (squares[index] === 'bench') {
            ctx.fillText('🪑🪑', x + squareSize / 2, y + squareSize / 2);
          }
        }

        if (selectedSquares.includes(index)) {
          ctx.fillStyle = '#b3d9ff';
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
    }
  };

  const handleSave = async () => {
    // Filter out null values from the squares array
    const validSquares = squares.filter(square => square !== null);
  
    // Map the valid squares to the required data structure
    const squaresData = validSquares.map((type, index) => ({
      type,
      table_id: Math.floor(index / 10) + 1, // Example table_id logic, adjust as needed
      position_x: index % 10, // Example position_x logic, adjust as needed
      position_y: Math.floor(index / 10), // Example position_y logic, adjust as needed
    }));
  
    console.log(squaresData); // Log to ensure it's correct
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/update-layout`, {
        squares: squaresData,
      });
      console.log(response.data); // Check if the save was successful
    } catch (error) {
      console.error('Error saving layout:', error.response.data);
      alert('Failed to save layout: ' + error.response.data.error);
    }
  };
  
  
  
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(ctx);
  }, [squares, selectedSquares]);

  return (
    <div>
      <button onClick={handleEditClick}>
        {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </button>

      <div className='selectSection'>
        <div className='icon' onClick={() => handleIconClick('table')}>
          <span role="img" aria-label="table">🛋️</span> Table
        </div>
        <div className='icon' onClick={() => handleIconClick('bench')}>
          <span role="img" aria-label="bench">🪑🪑</span> Bench
        </div>
        <div className='icon' onClick={() => handleIconClick('chair')}>
          <span role="img" aria-label="chair">🪑</span> Chair
        </div>
        <div className='icon' onClick={() => handleIconClick('remove')}>
          <span role="img" aria-label="remove">❌</span> Remove
        </div>
        <div className='icon' onClick={() => handleIconClick('reserve')}>
          <span role="img" aria-label="reserve">📝</span> Reserve
        </div>
      </div>
            {/* Save Button */}
            <button onClick={handleSave} className="saveButton">Save</button>

      <canvas
        ref={canvasRef}
        width={gridSize * squareSize}
        height={gridSize * squareSize}
        className='canvas'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      />

      {isReserving && renderReservationForm()}

    </div>
  );
};

export default SquareGrid;
