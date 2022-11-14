import { FC, useContext, useState } from "react";
import styled from "styled-components";
import DeskContext from "../../../../Context/DeskContext";
import { ICard, IColumn, IComment } from "../../../../Types/types";
import { Button, CancelButton, PrimaryButton } from "../../../../UIComponents/Button/Button";
import ModalWindow from "../../../../UIComponents/ModalWindow/ModalWindow";
import { StyledTextArea } from "../../../../UIComponents/TextArea/TextArea";
import CommentArea from "./CommentArea/CommentArea";

const StyledContainer = styled.div`
display:flex;
flex-direction:column;
min-height:200px;
min-width:400px;
border:2px solid black;
border-radius:10px;
background-color:white;
`
const TitleDiv = styled.div`
display:flex;
justify-content:space-between;
width:100%;
height:10%;
background-color:blue;
border-bottom:2px solid black;
border-radius:6px 6px 0 0;
`

const DescriptionDiv = styled.div`
width:100%;
height:40%;
display:flex;
flex-direction:column;
`
const StyledDescription = styled(StyledTextArea)`
flex-grow:1
`

const CommentsDiv = styled.div`
width:100%;
height:50%;
`

const StyledInput = styled.input`
border:2px solid black;
border-radius:6px;
margin:20px;
font-size:20px;
outline:none;
`

const StyledTitle = styled.h3`
font-size:22px;
padding:10px;
`
const ButtonDiv = styled.div`
display:flex;
justify-content:space-around;
`
const StyledForm = styled.form`
display:flex;
flex-direction:column;
`

type CardProps = {
    name:IColumn['name']
    data: ICard,
    setShowCardInfo: (arg1: boolean) => void,
    show: boolean,
    comments: IComment[]
}

const Card: FC<CardProps> = ({ data, show, comments, setShowCardInfo, name }) => {
    const { user, addComment, changeCard, removeCard } = useContext(DeskContext)
    const [cardName, setCardName] = useState(data.name);
    const [cardDescription, setCardDescription] = useState(data.description);
    const [commentText, setCommentText] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const createComment = (e: any) => {
        e.preventDefault();
        let comment = {
            cardId: data.id,
            text: commentText
        }
        if (commentText.length > 0) {
            addComment(comment)
            setCommentText('')
        }
    }

const onCloseModal = () => {
    setCommentText('')
    setCardName(data.name)
    setCardDescription(data.description)
    setShowCardInfo(false)
}

    const endEdit = () => {
        const editedCard = { ...data, name: cardName, description: cardDescription }
        if (cardName.length > 0 && cardDescription.length > 0) {
            changeCard(editedCard)
        }
        setIsEdit(false)
    }


    return (
        <ModalWindow showPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <TitleDiv>
                    <StyledInput value={cardName} onChange={e => setCardName(e.target.value)} readOnly={!isEdit} />
                    <StyledTitle>
                        author: {data.author}
                    </StyledTitle>
                    <StyledTitle>
                        Имя колонки: {name}
                    </StyledTitle>
                </TitleDiv>
                <DescriptionDiv>
                    <StyledTitle>Description</StyledTitle>
                    <StyledDescription value={cardDescription} onChange={e => setCardDescription(e.target.value)} readOnly={!isEdit} />
                    {user?.name === data.author ? <Button
                        onClick={!isEdit ? () => setIsEdit(true) : () => endEdit()}>
                        {!isEdit ? 'Изменить карточку' : 'Сохранить изменения'}
                    </Button> : null}
                </DescriptionDiv>
                <CommentsDiv>
                    <StyledTitle>Comments</StyledTitle>
                    {comments.map(item =>
                        <CommentArea comment={item} />
                    )}
                    <StyledForm onSubmit={createComment}>
                        <StyledTextArea value={commentText} onChange={e => setCommentText(e.target.value)} />
                        <Button type='submit'>Добавить комментарий</Button>
                    </StyledForm>
                </CommentsDiv>
                <ButtonDiv>
                    <PrimaryButton onClick={() => setShowCardInfo(false)}>
                        Закрыть
                    </PrimaryButton>
                    <CancelButton onClick={() =>removeCard(data.id)}>
                        Удалить карточку
                    </CancelButton>
                </ButtonDiv>
            </StyledContainer>
        </ModalWindow>
    )
}

export default Card