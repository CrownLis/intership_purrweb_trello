import { CardType } from '../../../Types/types';
import storage from '../../../Service/storage';
import { StorageKeys } from '../../storageKeys';
import BaseAction from '../../baseAction';

const initialCardsState = {
  cards: []
};

type AddCardDto = Omit<CardType, 'id' | 'author'>;

class CardActions extends BaseAction {
  constructor() {
    super();
    const cards = this.cards;

    if (!cards) {
      this.cards = initialCardsState.cards;
    }
  }

  addCard(card: AddCardDto) {
    const cards = [
      ...this.cards,
      { id: Number(new Date()), author: this.user!.name, ...card }
    ];
    this.cards = cards;
  }

  removeCard(cardId: number) {
    const cards = this.cards.filter((item) => item.id !== cardId);
    this.cards = cards;
  }

  changeCard = (changedCard: CardType) => {
    storage.setItem(
      StorageKeys.CARDS,
      this.cards.map((item) => {
        return item.id === changedCard.id ? changedCard : item;
      })
    );
  };
}

export const cardsActions = new CardActions();
