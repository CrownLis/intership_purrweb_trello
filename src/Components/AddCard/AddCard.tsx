import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { addCard } from "../../store/ducks/cards/cardsSlice";
import { getUser } from "../../store/ducks/user/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CardType } from "../../Types/types";
import Button from "../../UIComponents/Button";
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";

type ColumnProps = {
    columnId: number,
    show: boolean,
    setShow: (arg1: boolean) => void,
}

const AddCard: FC<ColumnProps> = ({ columnId, show, setShow }) => {
 
    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch()
    const { register, handleSubmit, resetField } = useForm<CardType>({

        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            description:'',
            name:''
        },
    })

    const onSubmit = (data:CardType) => {
        dispatch(addCard({...data,id:Number(new Date()),author:user!.name,columnId:columnId}))
        resetField('name')
        resetField('description')
        setShow(false)
    }
    
const onCloseModal = () => {
    setShow(false)
}

    return (
        <ModalWindow showPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledInput {...register('name',
                    {
                        required: 'Please enter the card name',
                        minLength: {
                            value: 1,
                            message: 'Please enter the correct card name'
                        }
                    }
                )}/>
                    <StyledDescription {...register('description',
                    {
                        required: 'Please enter the description',
                        minLength: {
                            value: 1,
                            message: 'Please enter the correct description'
                        }
                    }
                )}
                    />
                    <ButtonDiv>
                        <Button type='submit'>
                            Submit
                        </Button>
                        <Button type='button' onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                    </ButtonDiv>
                </StyledForm>
            </StyledContainer>
        </ModalWindow>
    )
}

export default AddCard

const StyledContainer = styled.div`
width:400px;
height:300px;
border:2px solid black;
border-radius:16px;
background-color:white;
`
const StyledForm = styled.form`
display:flex;
flex-direction:column;
`

const ButtonDiv = styled.div`
display:flex;
justify-content:space-around;
`

const StyledInput = styled.input`
border:2px solid black;
border-radius:6px;
margin:20px;
font-size:20px;
outline:none;
`

const StyledDescription = styled.textarea`
border:0px;
border-radius:10px;
background-color: rgba(0, 0, 0, 0.2);
resize:none;
margin:20px;
padding:6px;
height:100px;
outline:none;
`