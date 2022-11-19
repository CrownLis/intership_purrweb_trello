import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setUser } from "../../store/ducks/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import Button from "../../UIComponents/Button";
import Input from '../../UIComponents/Input'
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";

type PopupProps = {
    showPopup?: boolean;
    setShowPopup: (arg1: boolean) => void;
};

type FormInputs = {
    name: string;
};

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup }) => {

    const [inputName, setInputName] = useState<string>('')
    const dispatch = useAppDispatch()



    const { register,handleSubmit } = useForm<FormInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            name:''
        },
    })

    // const checkForm = (e: any) => {
    //     e.preventDefault()
    //     const isName = inputName.split('').some(item => Number.isInteger(Number(item)))
    //     if (inputName.length > 0 && !isName) {
    //         setShowPopup(false)
    //         actions.user.changeUser({ name: inputName })
    //     } else {
    //         alert('Введите корректное имя')
    //     }
    // }

    const onCloseModal = () => {
        alert('Please enter the name')
    }

    return (
        <ModalWindow showPopup={showPopup} onClose={onCloseModal}>
            <FormStyled onSubmit={handleSubmit((data) => dispatch(setUser(data))) }>
                <LabelStyled htmlFor="firstName">Введите ваше имя</LabelStyled>
                <input {...register('name',
                    {
                        required: 'Please enter the name',
                        minLength: {
                            value: 2,
                            message: 'Пожалуйста,введите корректное имя'
                        }
                    }
                )} name="firstName" type='text' autoFocus />
                <Button type="submit">
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