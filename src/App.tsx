import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Popup from './Components/Popup/Popup';
import { defaultColumns } from './Constants/Constant';
import { ICard, IColumn, IComment, IUser } from './Types/types';
import Body from './Components/Body/Body';
import useLocalStorage from './Hooks/useLocalStorage';
import DeskContext from './Context/DeskContext';

function App() {

  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [user, setUser] = useLocalStorage<IUser | null>('user', null)
  const [columns, setColumns] = useLocalStorage<IColumn[]>('columns', defaultColumns)
  const [cards, setCards] = useLocalStorage<ICard[]>('cards', [])
  const [comments, setComments] = useLocalStorage<IComment[]>('comments', [])

  useEffect(() => {
    if (!user) {
      setShowPopup(true)
    }
  }, [user])

  const addCard = (newCard: Omit<ICard, 'id' | 'author'>) => {
    setCards([...cards, { id: Number(new Date()), author: user!.name, ...newCard }])
  }

  const addComment = (newComment: Omit<IComment, 'id' | 'author'>) => {
    setComments([...comments, { id: Number(new Date()), author: user!.name, ...newComment }])
  }

  const removeCard = (cardId: ICard['id']) => {
    setCards(cards.filter(item => item.id !== cardId))
    setComments(comments.filter(item => item.cardId !== cardId))
  }

  const removeComment = (commentId: IComment['id']) => {
    setComments(comments.filter(item => item.id !== commentId))
  }

  const changeCard = (changedCard: ICard) => {
    setCards(cards.map(item => {
      if (item.id !== changedCard.id) {
        return item
      } else {
        return changedCard
      }
    }))
  }

  const changeComment = (changedComment: IComment) => {
    setComments(comments.map(item => {
      if (item.id !== changedComment.id) {
        return item
      } else {
        return changedComment
      }
    }))
  }

  return (
    <DeskContext.Provider value={{user, addCard, addComment, changeCard, changeComment, removeCard, removeComment }}>
      <div className="App">
        <Header userName={user?.name} />
        <Body columns={columns} cards={cards} comments={comments} />
        <Popup showPopup={showPopup} setShowPopup={setShowPopup} setUser={setUser} />
      </div >
    </DeskContext.Provider>
  );
}

export default App;
