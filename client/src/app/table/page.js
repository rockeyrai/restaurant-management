'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditMode, updateSquare, clearSquare } from '@/lib/redux/slices/squaresSlice';

const SquareGrid = () => {
  const dispatch = useDispatch();
  const { squares, isEditing } = useSelector((state) => state.squares);
  const [selectedType, setSelectedType] = useState(null);  // To hold selected type (chair, table, bench)
  const [dragging, setDragging] = useState(false);  // For drag selection
  const [dragStartIndex, setDragStartIndex] = useState(null); // Start index for drag selection
  const [selectedSquares, setSelectedSquares] = useState([]);  // To track the selected squares during drag
  const canvasRef = useRef(null);  // Reference for the canvas

  const gridSize = 10;  // For 10x10 grid
  const squareSize = 60;  // Size of each small square (60px)

  // Handle entering/exiting edit mode
  const handleEditClick = () => {
    dispatch(toggleEditMode());
  };

  // Handle selecting an icon (table, chair, bench, or remove)
  const handleIconClick = (type) => {
    setSelectedType(type);
  };

  // Helper function to get the index of a square from the (x, y) position on the canvas
  const getSquareIndex = (x, y) => {
    const row = Math.floor(y / squareSize);
    const col = Math.floor(x / squareSize);
    return row * gridSize + col;
  };

  // Handle mouse down to start dragging (for table/bench)
  const handleMouseDown = (e) => {
    if (isEditing && (selectedType === 'table' || selectedType === 'bench' || selectedType === 'chair')) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const startIndex = getSquareIndex(x, y);

      setDragging(true);
      setDragStartIndex(startIndex);
      setSelectedSquares([startIndex]); // Initially, the start square is selected
    }
  };

  // Handle mouse move to update dragged squares
  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const index = getSquareIndex(x, y);

      // Update the selected squares as the mouse moves
      const [startRow, startCol] = [Math.floor(dragStartIndex / gridSize), dragStartIndex % gridSize];
      const [currentRow, currentCol] = [Math.floor(index / gridSize), index % gridSize];

      // Determine all squares between the start and current positions
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

      setSelectedSquares(newSelectedSquares);  // Update the selected squares during drag
    }
  };

  // Handle mouse up to stop dragging and place the selected item
  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
      
      // Ensure that selectedSquares is not empty and selectedType is valid
      if (selectedSquares.length > 0 && selectedType) {
        // Dispatch the action to update all selected squares with the selected type
        dispatch(updateSquare({ indexes: selectedSquares, type: selectedType }));
        setSelectedSquares([]); // Reset selected squares
      }
    }
  };

  // Handle mouse click to place/remove item
  const handleClick = (e) => {
    if (isEditing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const index = getSquareIndex(x, y);
  
      // Ensure selectedSquares is not empty and selectedType is valid
      if (selectedSquares.length > 0 && selectedType) {
        // Dispatch the action to update all selected squares with the selected type
        dispatch(updateSquare({ indexes: selectedSquares, type: selectedType }));
        setSelectedSquares([]); // Reset selected squares
      } else if (selectedType === 'remove') {
        // If remove is selected, remove the square at the index
        dispatch(clearSquare({ index }));
      } else {
        // If only one square is clicked, update it
        dispatch(updateSquare({ indexes: [index], type: selectedType }));
      }
    }
  };
  

  // Draw the grid and items on the canvas
  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);  // Clear canvas

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        const x = col * squareSize;
        const y = row * squareSize;

        // Draw the square background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, y, squareSize, squareSize);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x, y, squareSize, squareSize);

        // If the square has a type (table, bench, chair), draw it
        if (squares[index]) {
          ctx.fillStyle = '#000';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          if (squares[index] === 'chair') {
            ctx.fillText('🪑', x + squareSize / 2, y + squareSize / 2);
          } else if (squares[index] === 'table') {
            ctx.fillText('🪑🪑', x + squareSize / 2, y + squareSize / 2);
          } else if (squares[index] === 'bench') {
            ctx.fillText('🛋️', x + squareSize / 2, y + squareSize / 2);
          }
        }

        // Highlight selected squares during drag
        if (selectedSquares.includes(index)) {
          ctx.fillStyle = '#b3d9ff';
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
    }
  };

  // Setup canvas when squares or selected squares change
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(ctx);
  }, [squares, selectedSquares]);

  return (
    <div>
      <button onClick={handleEditClick}>
        {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </button>

      <div style={styles.selectSection}>
        <div
          style={styles.icon}
          onClick={() => handleIconClick('table')}
        >
          <span role="img" aria-label="table">🪑</span> Table
        </div>
        <div
          style={styles.icon}
          onClick={() => handleIconClick('bench')}
        >
          <span role="img" aria-label="bench">🛋️</span> Bench
        </div>
        <div
          style={styles.icon}
          onClick={() => handleIconClick('chair')}
        >
          <span role="img" aria-label="chair">🪑</span> Chair
        </div>
        <div
          style={styles.icon}
          onClick={() => handleIconClick('remove')}
        >
          <span role="img" aria-label="remove">❌</span> Remove
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={gridSize * squareSize}
        height={gridSize * squareSize}
        style={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      />
    </div>
  );
};

const styles = {
  selectSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    marginBottom: '10px',
  },
  icon: {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#ddd',
    marginBottom: '5px',
    textAlign: 'center',
    borderRadius: '4px',
  },
  canvas: {
    border: '1px solid #ccc',
    marginTop: '20px',
    cursor: 'pointer',
  },
};

export default SquareGrid;
