import { FC, useContext, useState } from "react";
import styled from "styled-components";
import useSelector from "../../store/hooks";
import { actions, selectors } from "../../store/store";
import Button from "../../UIComponents/Button";
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";

type ColumnProps = {
    columnId: number,
    show: boolean,
    setShow: (arg1: boolean) => void,
}

const AddCard: FC<ColumnProps> = ({ columnId, show, setShow }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onSubmit = (e: any) => {
        e.preventDefault()
        let card = {
            columnId: columnId,
            name: title,
            description: description,
        }
        if (card.name.length > 0) {
            actions.cards.addCard(card)
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