import React, { FC, KeyboardEvent, PropsWithChildren, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';

type modalProps = PropsWithChildren<{
    isShowPopup: boolean;
    onClose: () => void;
}>;

const ModalWindow: FC<modalProps> = ({ isShowPopup, onClose, children }) => {
    const closeOnEscapeKeyDown = useCallback(
        (e: (KeyboardEvent<HTMLDivElement>)) => {
            if ((e.charCode || e.keyCode) === 27) {
                onClose();
            }
        }, [isShowPopup]);

    useEffect(() => {
        const listener = closeOnEscapeKeyDown as unknown as EventListener;
        document.body.addEventListener('keydown', listener);
        return () => {
            document.body.removeEventListener('keydown', listener);
        };
    }, [closeOnEscapeKeyDown]);


    return (
        <ModalStyled $isShowPopup={isShowPopup} onKeyDown={e => closeOnEscapeKeyDown(e)}>
            {isShowPopup ? children : null}
        </ModalStyled>
    );
};

export default ModalWindow;

const ModalStyled = styled.div<{ $isShowPopup: boolean }>`
height: 100vh;
width: 100vw;
background-color: rgba(0, 0, 0, 0.6);
top: 0;
left: 0;
position: fixed;
display: flex;
justify-content: center;
align-items: center;
transform: scale(1);
opacity: 1;
${({ $isShowPopup }) =>
        $isShowPopup ?
            css`
    transform:scale(1);
` :
            css`
    transform:scale(0)
`
    }
`;