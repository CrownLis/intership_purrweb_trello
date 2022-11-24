import React, { FC, useEffect, useState } from 'react';
import Header from './Components/Header';
import Body from './Components/Body';
import Popup from './Components/Popup/Popup';
import { useAppSelector } from './store/hooks';
import { rootSelectors } from './store/ducks';
import styled from 'styled-components';

const App:FC = () => {

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const user = useAppSelector(rootSelectors.user.selectUser);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    }
  }, [user]);

  return (
      <Root>
        <Header />
        <Body />
        <Popup isShowPopup={showPopup} setShowPopup={setShowPopup} />
      </Root >
  );
};

export default App;

const Root = styled.div`

`;