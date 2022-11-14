import { FC, useContext, useState } from "react";
import styled from "styled-components";
import DeskContext from "../../../../Context/DeskContext";
import { CancelButton, PrimaryButton } from "../../../../UIComponents/Button/Button";
import ModalWindow from "../../../../UIComponents/ModalWindow/ModalWindow";

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

type ColumnProps = {
    columnId: number,
    show: boolean,
    setShow: (arg1: boolean) => void,
}

const AddCard: FC<ColumnProps> = ({ columnId, show, setShow }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {addCard} = useContext(DeskContext)

    const onSubmit = (e: any) => {
        e.preventDefault()
        let card = {
            columnId: columnId,
            name: title,
            description: description,
        }
        if (card.name.length > 0) {
            addCard(card)
            setShow(false)
            setTitle('')
            setDescription('')
        } else {
            alert('Введите название карточки')
        }
    }
    
const onCloseModal = () => {
    setTitle('')
    setDescription('');
    setShow(false)
}

    return (
        <ModalWindow showPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <StyledForm onSubmit={onSubmit}>
                    <StyledInput onChange={e => setTitle(e.target.value)} value={title} />
                    <StyledDescription onChange={e => setDescription(e.target.value)} value={description} />
                    <ButtonDiv>
                        <PrimaryButton type='submit'>
                            Submit
                        </PrimaryButton>
                        <CancelButton type='button' onClick={() => setShow(false)}>
                            Cancel
                        </CancelButton>
                    </ButtonDiv>
                </StyledForm>
            </StyledContainer>
        </ModalWindow>
    )
}

export default AddCard