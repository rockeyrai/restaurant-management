// squaresSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  squares: Array(100).fill(null), // 10x10 grid, initially empty
  isEditing: false,
  tableGroups: [], // To track grouped tables and their seating capacity
};

const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing;
    },
    // Add the setSquares action to update the squares state
    setSquares: (state, action) => {
      state.squares = action.payload;
    },
    updateSquare: (state, action) => {
      const { indexes, type } = action.payload;
      if (Array.isArray(indexes)) {
        indexes.forEach((index) => {
          state.squares[index] = type;
        });
      } else {
        console.error("Error: indexes is not an array", indexes);
      }
    },
    clearSquare: (state, action) => {
      const { index } = action.payload;
      state.squares[index] = null;
    },
    groupTablesAndCalculateSeats: (state) => {
      const groups = [];
      let currentGroupId = 1;

      const findAdjacentTables = (index, visited) => {
        const stack = [index];
        const group = [];
        while (stack.length) {
          const currentIndex = stack.pop();
          if (!visited[currentIndex]) {
            visited[currentIndex] = true;
            group.push(currentIndex);

            const adjacentIndices = [
              currentIndex - 1, // left
              currentIndex + 1, // right
              currentIndex - 10, // top
              currentIndex + 10, // bottom
            ];

            adjacentIndices.forEach((adjIndex) => {
              if (
                adjIndex >= 0 &&
                adjIndex < state.squares.length &&
                !visited[adjIndex] &&
                state.squares[adjIndex] === "table"
              ) {
                stack.push(adjIndex);
              }
            });
          }
        }
        return group;
      };

      const visited = Array(state.squares.length).fill(false);
      for (let i = 0; i < state.squares.length; i++) {
        if (state.squares[i] === "table" && !visited[i]) {
          const group = findAdjacentTables(i, visited);
          const seatingCapacity = group.reduce((acc, idx) => {
            // Count the seats in surrounding squares (chairs and benches)
            const adjSeats = [
              group[idx - 1],
              group[idx + 1],
              group[idx - 10],
              group[idx + 10],
            ];
            return (
              acc +
              adjSeats.filter((item) => item === "chair" || item === "bench")
                .length
            );
          }, 0);
          groups.push({
            groupId: currentGroupId++,
            seats: seatingCapacity,
            tableIndexes: group,
          });
        }
      }
      state.tableGroups = groups;
    },
  },
});

export const {
  toggleEditMode,
  updateSquare,
  clearSquare,
  groupTablesAndCalculateSeats,
  setSquares,
} = squaresSlice.actions;

export default squaresSlice.reducer;
