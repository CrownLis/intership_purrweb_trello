import { FC, useContext, useState } from "react";
import styled from "styled-components";
import Button from "../../UIComponents/Button";
import Input from '../../UIComponents/Input'
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";
import { actions } from "../../store/store";

type PopupProps = {
    showPopup?: boolean;
    setShowPopup: (arg1: boolean) => void;
};

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup }) => {

    const [inputName, setInputName] = useState<string>('')



    const checkForm = (e: any) => {
        e.preventDefault()
        const isName = inputName.split('').some(item => Number.isInteger(Number(item)))
        if (inputName.length > 0 && !isName) {
            setShowPopup(false)
            actions.user.changeUser({ name: inputName})
        } else {
            alert('Введите корректное имя')
        }
    }

const onCloseModal = () => {
    alert('Please enter the name')
}

    return (
        <ModalWindow showPopup={showPopup} onClose={onCloseModal}>
            <FormStyled>
                <LabelStyled htmlFor="firstName">Введите ваше имя</LabelStyled>
                <Input value={inputName} name="firstName" type='text' autoFocus required onChange={e => setInputName(e.target.value)} />
                <Button onClick={e => checkForm(e)}>
                    Submit
                </Button>
            </FormStyled>
        </ModalWindow>
    )
}

export default Popup

const LabelStyled = styled.label`
font-size:18px;
`

const FormStyled = styled.form`
display:flex;
flex-direction:column;
background-color:white;
align-items:center;
padding:10px 20px;
gap:10px;
border: 2px solid gray;
        transition: 0.6s all;
        border-radius:10px;

`