// components/SquareGrid.js
'use client'
import { toggleEditMode, updateSquare, clearSquare } from '@/lib/redux/slices/squaresSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleEditMode, updateSquare, clearSquare } from '../redux/slices/tableSlice';

const SquareGrid = () => {
  const dispatch = useDispatch();
  const { squares, isEditing } = useSelector((state) => state.squares);

  const handleEditClick = () => {
    dispatch(toggleEditMode());
  };

  const handleSquareClick = (index) => {
    if (isEditing) {
      const currentType = squares[index];
      const newType = prompt('Enter type (table, bench, chair):', currentType || '');
      if (newType === 'table' || newType === 'bench' || newType === 'chair') {
        dispatch(updateSquare({ index, type: newType }));
      }
    }
  };

  return (
    <div>
      <button onClick={handleEditClick}>
        {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </button>
      <div style={styles.gridContainer}>
        {squares.map((square, index) => (
          <div
            key={index}
            style={styles.square}
            onClick={() => handleSquareClick(index)}
            className={square ? `square ${square}` : 'square'}
          >
            {square}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Adjust for a 5x5 grid
    gridGap: '5px',
    marginTop: '20px',
  },
  square: {
    width: '60px',
    height: '60px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    textAlign: 'center',
    lineHeight: '60px',
    cursor: 'pointer',
  },
};

export default SquareGrid;
