import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { changeCard, removeCard } from "../../store/ducks/cards/cardsSlice";
import { addComment, removeAllCommentsCard } from "../../store/ducks/comments/commentsSlice";
import { getCommentsByCardId } from "../../store/ducks/comments/selectors";
import { getUser } from "../../store/ducks/user/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CardType, ColumnType, CommentType } from "../../Types/types";
import Button from "../../UIComponents/Button";
import ModalWindow from "../../UIComponents/ModalWindow/ModalWindow";
import CommentArea from "./CommentArea/CommentArea";

type CardProps = {
    columnName: ColumnType['name']
    data: CardType,
    setShowCardInfo: (arg1: boolean) => void,
    show: boolean
}

type TextAreaProps = {
    editNow:boolean
}

type ButtonProps = {
    hidden?:boolean
}

const Card: FC<CardProps> = ({ data, show, setShowCardInfo, columnName }) => {

    const [isEdit, setIsEdit] = useState(false);
    const comments = useAppSelector((state) => getCommentsByCardId(state, data.id))
    const user = useAppSelector(getUser)
    const isAuthor = user?.name === data.author
    const hidden = !isEdit
    const dispatch = useAppDispatch()

    const { register: cardRegister, handleSubmit: handleCardSubmit } = useForm<CardType>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            author: data.author,
            columnId: data.columnId,
            id: data.id,
            name: data.name,
            description: data.description
        },
    })

    const { register: commentRegister, handleSubmit: handleCommentSubmit, resetField: resetCommentValues } = useForm<CommentType>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            author: user?.name,
            cardId: data.id,
            text: ''
        },
    })

    const onCloseModal = () => {
        setShowCardInfo(false)
    }

    const onSubmit = (data: CommentType) => {
        dispatch(addComment({ ...data, id: Number(new Date()) }))
        resetCommentValues('id')
        resetCommentValues('text')
    }

    const endEdit = (data: CardType) => {
        dispatch(changeCard(data))
        setIsEdit(false)
    }

    const deleteCard = () => {
        dispatch(removeCard(data.id))
        dispatch(removeAllCommentsCard(data.id))
    }

    return (
        <ModalWindow showPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <CancelButton onClick={() => setShowCardInfo(false)}>
                    X
                </CancelButton>
                <CardForm onSubmit={handleCardSubmit(endEdit)}>
                    <CardHeader>
                        <StyledInput {...cardRegister('name',
                            {
                                required: 'Please enter the card name',
                                minLength: {
                                    value: 1,
                                    message: 'Please enter the card name'
                                }
                            }
                        )} name="name" type='text' readOnly={!isEdit} />
                        <StyledTitle>
                            author: {data.author}
                        </StyledTitle>
                        <StyledTitle>
                            Имя колонки: {columnName}
                        </StyledTitle>
                    </CardHeader>
                    <CardDescription>
                        <StyledTitle>Description</StyledTitle>
                        <StyledDescription editNow={isEdit} {...cardRegister('description',
                            {
                                required: 'Please enter the column description',
                                minLength: {
                                    value: 1,
                                    message: 'Please enter the column description'
                                }
                            }
                        )} name="firstName" readOnly={!isEdit} />
                        {isAuthor ?
                            <ButtonDiv>
                                <StyledButton hidden={!hidden} onClick={() => setIsEdit(true)} type='button'>
                                    Изменить карточку
                                </StyledButton>
                                <StyledButton hidden={hidden} type='submit'>
                                  Сохранить изменения
                                </StyledButton>
                            </ButtonDiv> : null}
                    </CardDescription>
                </CardForm>
                <CommentsContainer>
                    <StyledTitle>Comments</StyledTitle>
                    <StyledForm onSubmit={handleCommentSubmit(onSubmit)}>
                        <StyledComment {...commentRegister('text',
                            {
                                required: 'Please enter the comment',
                                minLength: {
                                    value: 1,
                                    message: 'Please enter the comment'
                                }
                            }
                        )} />
                        <StyledButton type='submit'>Добавить комментарий</StyledButton>
                    </StyledForm>
                    {comments?.map(item =>
                        <CommentArea key={item.id} comment={item} />
                    )}
                </CommentsContainer>
                <ButtonDiv>
                    <RemoveButton onClick={() => deleteCard()}>
                        Удалить карточку
                    </RemoveButton>
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
const CardForm = styled.form`
    
`

const CardHeader = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:100%;
height:10%;
background-color:#eef7bf;
border-bottom:2px solid black;
border-radius:6px 6px 0 0;
`

const CardDescription = styled.div`
width:100%;
height:40%;
display:flex;
flex-direction:column;
`
const StyledDescription = styled.textarea<TextAreaProps>`
flex-grow:1;
resize:none;
margin:0 20px;
border: ${props => props.editNow ? '2px solid #d8e49b' : '2px solid white'};
border-radius:10px;
min-height:60px;
outline:none;
`
const CommentsContainer = styled.div`
width:100%;
height:50%;
`

const StyledInput = styled.input`
border:1px solid black;
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
const StyledButton = styled(Button)<ButtonProps>`
    margin:10px 20px;
    display:${props => props.hidden? 'none' : 'block'};
`
const RemoveButton = styled(Button)`
    background-color:var(--primary-color);
    border:1px solid black;
    padding:6px;
    color:lightgray;
`

const StyledForm = styled.form`
display:flex;
flex-direction:column;
`
const StyledComment = styled.textarea`
    margin:0 20px;
    resize:none;
`