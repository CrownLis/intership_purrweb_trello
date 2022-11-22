import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setUser } from "../../store/ducks/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { UserType } from "../../Types/types";
import Button from "../../UIComponents/Button";
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";

type PopupProps = {
    showPopup?: boolean;
    setShowPopup: (arg1: boolean) => void;
};

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup }) => {

    const dispatch = useAppDispatch();



    const { register, handleSubmit } = useForm<UserType>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            name: ""
        },
    });  

    const onSubmit = (data: UserType) => {
        dispatch(setUser(data));
        setShowPopup(false);
    };

    const onCloseModal = () => {
        alert("Please enter the name");
    };

    return (
        <ModalWindow showPopup={showPopup} onClose={onCloseModal}>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
                <LabelStyled htmlFor="name">Введите ваше имя</LabelStyled>
                <StyledInput {...register("name",
                    {
                        required: "Please enter the name",
                        minLength: {
                            value: 2,
                            message: "Пожалуйста,введите корректное имя"
                        }
                    }
                )} name="name" type='text' autoFocus />
                <StyledButton type="submit">
                    Submit
                </StyledButton>
            </FormStyled>
        </ModalWindow>
    );
};

export default Popup;

const FormStyled = styled.form`
display:flex;
flex-direction:column;
min-width:300px;
min-height:120px;
background-color:var(--light-color);
align-items:center;
padding:10px 20px;
gap:10px;
border: 2px solid gray;
        transition: 0.6s all;
        border-radius:10px;

`;
const LabelStyled = styled.label`
font-size:24px;
color:var(--darkest-color);
`;

const StyledInput = styled.input`
    font-size:20px;
    color:var(--dark-color);
    border:1px solid var(--darkest-color);
    border-radius:6px;
    outline:none;
`;

const StyledButton = styled(Button)`
    font-size:18px;
    background-color:var(--darkest-color);
    color:var(--lightest-color);
    border:1px solid var(--light-color)
`;