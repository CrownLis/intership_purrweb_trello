import { FC, useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../UIComponents/Button/Button";
import { Input } from '../../UIComponents/Input/Input'
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";
import { IUser } from "../../Types/types";

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
const LabelStyled = styled.label`
font-size:18px;
`

type PopupProps = {
    showPopup?: boolean;
    setShowPopup: (arg1: boolean) => void;
    setUser:(arg1:IUser) => void
};

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, setUser }) => {

    const [inputName, setInputName] = useState<string>('')

    const checkForm = (e: any) => {
        e.preventDefault()
        const isName = inputName.split('').some(item => Number.isInteger(Number(item)))
        if (inputName.length > 0 && !isName) {
            setShowPopup(false)
            setUser({ name: inputName})
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
                <PrimaryButton onClick={e => checkForm(e)}>
                    Submit
                </PrimaryButton>
            </FormStyled>
        </ModalWindow>
    )
}

export default Popup