import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Ensure this interface matches the one in argumentSlice.ts
export interface DilemmaType {
  id: string;
  description: string;
  importance: number;
  type: string;
  TopicName: string;
  ItemDate: string;
  ItemTime: string;
}

export type ReduxStateType = {
  array1: DilemmaType[];
  removedItems: DilemmaType[];
  updated: DilemmaType[];
};

const initialState: ReduxStateType = {
  array1: [],
  removedItems: [],
  updated: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    PushToArray: (state, action: PayloadAction<DilemmaType>) => {
      state.array1.push(action.payload);
    },
    UpdateArrayItem: (
      state,
      action: PayloadAction<{id: string; TopicName: string}>,
    ) => {
      const {id, TopicName} = action.payload;
      const index = state.array1.findIndex(item => item.id === id);
      if (index !== -1) {
        state.array1[index].TopicName = TopicName;
      }
    },
    DeleteFromArray: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.array1.find(i => i.id === id);
      if (item) {
        state.array1 = state.array1.filter(i => i.id !== id);
        state.removedItems.push(item);
      }
    },
  },
});

export const {PushToArray, UpdateArrayItem, DeleteFromArray} =
  dataSlice.actions;

export default dataSlice.reducer;
