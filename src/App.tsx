import { FC, useEffect, useState } from 'react';
import Header from './Components/Header';
import Popup from './Components/Popup/Popup';
import { CardType, ColumnType, CommentType, UserType } from './Types/types';
import Body from './Components/Body/Body';
import useLocalStorage from './Hooks/useLocalStorage';
import StoreContext from './store/StoreContext';

const App:FC = () => {

  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [user] = useLocalStorage<UserType | null>('user')
  const [columns] = useLocalStorage<ColumnType[]>('columns')
  const [cards] = useLocalStorage<CardType[]>('cards')
  const [comments] = useLocalStorage<CommentType[]>('comments')

  useEffect(() => {
    if (!user) {
      setShowPopup(true)
    }
  }, [user])

  return (
    <StoreContext.Provider value={{ user,cards,columns,comments }}>
      <div className="App">
        <Header />
        <Body />
        <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
      </div >
    </StoreContext.Provider>
  );
}

export default App;
