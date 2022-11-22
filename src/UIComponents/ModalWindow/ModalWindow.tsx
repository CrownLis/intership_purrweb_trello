import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import styled from "styled-components";

type modalProps = PropsWithChildren<{
    showPopup?: boolean;
    onClose: () => void;
}>;

const ModalWindow: FC<modalProps> = ({ showPopup, onClose, children }) => {

    const closeOnEscapeKeyDown = useCallback((e: { charCode: any; keyCode: any; }) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();

        }
    }, [showPopup]);
    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);


    return (
        <ModalStyled style={showPopup ? { transform: "scale(1)" } : { transform: "scale(0)" }} onKeyDown={e => closeOnEscapeKeyDown(e)}>
            {showPopup ? children : null}
        </ModalStyled>
    );
};

export default ModalWindow;

const ModalStyled = styled.div`
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
`;