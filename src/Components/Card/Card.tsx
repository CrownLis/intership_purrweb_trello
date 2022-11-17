import { FC, useState } from "react";
import styled from "styled-components";
import useSelector from "../../store/hooks";
import { actions, selectors } from "../../store/store";
import { CardType, ColumnType, CommentType } from "../../Types/types";
import Button from "../../UIComponents/Button";
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";
import TextArea from "../../UIComponents/TextArea";
import CommentArea from "./CommentArea/CommentArea";

type CardProps = {
    columnName: ColumnType['name']
    data: CardType,
    setShowCardInfo: (arg1: boolean) => void,
    show: boolean
}

const Card: FC<CardProps> = ({ data, show, setShowCardInfo, columnName }) => {
    const comments = useSelector(selectors.comments.selectCommentByCardId(data.id))
    const [cardName, setCardName] = useState(data.name);
    const [cardDescription, setCardDescription] = useState(data.description);
    const [commentText, setCommentText] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector(selectors.user.selectUser())

    const createComment = (e: any) => {
        e.preventDefault();
        let comment = {
            cardId: data.id,
            text: commentText
        }
        if (commentText.length > 0) {
            actions.comments.addComment(comment)
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
            actions.cards.changeCard(editedCard)
        }
        setIsEdit(false)
    }


    return (
        <ModalWindow showPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <CancelButton onClick={() => setShowCardInfo(false)}>
                    X
                </CancelButton>
                <TitleDiv>
                    <StyledInput value={cardName} onChange={e => setCardName(e.target.value)} readOnly={!isEdit} />
                    <StyledTitle>
                        author: {data.author}
                    </StyledTitle>
                    <StyledTitle>
                        Имя колонки: {columnName}
                    </StyledTitle>
                </TitleDiv>
                <DescriptionDiv>
                    <StyledTitle>Description</StyledTitle>
                    <StyledDescription value={cardDescription} onChange={e => setCardDescription(e.target.value)} readOnly={!isEdit} />
                    {user?.name === data.author ? <Button
                        onClick={isEdit ? () => endEdit() : () => setIsEdit(true)}>
                        {isEdit ? 'Сохранить изменения' : 'Изменить карточку'}
                    </Button> : null}
                </DescriptionDiv>
                <CommentsDiv>
                    <StyledForm onSubmit={createComment}>
                        <TextArea value={commentText} onChange={e => setCommentText(e.target.value)} />
                        <Button type='submit'>Добавить комментарий</Button>
                    </StyledForm>
                    <StyledTitle>Comments</StyledTitle>
                    {comments.map(item =>
                        <CommentArea key={item.id} comment={item} />
                    )}
                </CommentsDiv>
                <ButtonDiv>
                    <Button onClick={() => actions.cards.removeCard(data.id)}>
                        Удалить карточку
                    </Button>
                </ButtonDiv>
            </StyledContainer>
        </ModalWindow>
    )
}

export default Card

const StyledContainer = styled.div`
display:flex;
flex-direction:column;
position:relative;
min-height:200px;
min-width:500px;
max-height:600px;
overflow:auto;
border:2px solid black;
border-radius:10px;
background-color:white;
`
const CancelButton = styled(Button)`
position:absolute;
right:0px;
top:0px;
height:30px;
width:30px;
background-color:red;
border:2px solid black;
border-radius:50%;
`

const TitleDiv = styled.div`
display:flex;
flex-direction:column;
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
const StyledDescription = styled.textarea`
flex-grow:1;
resize:none;
margin:0 20px;
border:2px solid blue;
border-radius:10px;
min-height:60px;
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
max-width:80%;
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