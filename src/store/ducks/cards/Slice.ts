import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '../../../Types/types';

type CardsSliceType = {
  cards: CardType[] | null;
};

const initialState: CardsSliceType = {
  cards: null
};

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<CardType>) {
      if (state.cards) {
        state.cards = [...state.cards, action.payload];
      } else {
        state.cards = [action.payload];
      }
    },
    removeCard(state, action: PayloadAction<number>) {
      if (state.cards) {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      }
    },
    changeCard(state, action: PayloadAction<CardType>) {
      if (state.cards) {
        state.cards = state.cards?.map((card) =>
          card.id === action.payload.id ? action.payload : card
        );
      }
    }
  }
});

export const { reducer, actions } = cardsSlice;
