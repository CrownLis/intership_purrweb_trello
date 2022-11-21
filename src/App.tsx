import { FC, useEffect, useState } from 'react';
import Header from './Components/Header';
import Body from './Components/Body';
import Popup from './Components/Popup/Popup';
import { useAppSelector } from './store/hooks';
import { getUser } from './store/ducks/user/selectors';
import styled from 'styled-components';

const App:FC = () => {

  const [showPopup, setShowPopup] = useState<boolean>(false)
  const user = useAppSelector(getUser)

  useEffect(() => {
    if (!user) {
      setShowPopup(true)
    }
  }, [user])

  return (
      <Root>
        <Header />
        <Body />
        <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
      </Root >
  );
}

export default App;

const Root = styled.div`

`