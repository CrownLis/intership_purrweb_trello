import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { rootActions, rootSelectors } from '../../store/ducks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CardType, ColumnType, CommentType } from '../../Types/types';
import Button from '../../UIComponents/Button';
import ModalWindow from '../../UIComponents/ModalWindow/ModalWindow';
import {CommentArea} from './components';

type CardProps = {
    columnName: ColumnType['name']
    data: CardType,
    onClose: () => void,
}

const Card: FC<CardProps> = ({ data, onClose, columnName }) => {

    const [isEdit, setIsEdit] = useState(false);
    const comments = useAppSelector((state) => rootSelectors.comments.selectCommentsByCardId(state, data.id));
    const user = useAppSelector(rootSelectors.user.selectUser);
    const isAuthor = user?.name === data.author;
    const dispatch = useAppDispatch();

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
    });

    const { register: commentRegister, handleSubmit: handleCommentSubmit, resetField: resetCommentValues } = useForm<CommentType>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            author: user?.name,
            cardId: data.id,
            text: ''
        },
    });

    const onSubmit = (data: CommentType) => {
        dispatch(rootActions.comments.addComment({ ...data, id: Number(new Date()) }));
        resetCommentValues('id');
        resetCommentValues('text');
    };

    const endEdit = (data: CardType) => {
        console.log(data);
        dispatch(rootActions.cards.changeCard(data));
        setIsEdit(false);
    };

    const deleteCard = () => {
        dispatch(rootActions.comments.removeComment(data.id));
        dispatch(rootActions.cards.removeCard(data.id));
        onClose();
    };

    return (
        <ModalWindow isShowPopup={Boolean(data)} onClose={onClose}>
            <StyledContainer>
                <CancelButton onClick={onClose}>
                    X
                </CancelButton>
                <CardForm onSubmit={handleCardSubmit(endEdit)}>
                    <CardHeader>
                        <StyledInput $isEditNow={isEdit} {...cardRegister('name',
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
                        <StyledDescription $isEditNow={isEdit} {...cardRegister('description',
                            {
                                required: 'Please enter the card description',
                                minLength: {
                                    value: 1,
                                    message: 'Please enter the card description'
                                }
                            }
                        )} name="description" readOnly={!isEdit} />
                        {isAuthor ?
                            <ButtonContainer>
                                <StyledButton $isHidden={isEdit} onClick={() => setIsEdit(true)} type='button'>
                                    Изменить карточку
                                </StyledButton>
                                <StyledButton $isHidden={!isEdit} type='submit'>
                                    Сохранить изменения
                                </StyledButton>
                                <StyledButton onClick={() => deleteCard()}>
                                    Удалить карточку
                                </StyledButton>
                            </ButtonContainer> : null}
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
                    {comments?.map(comment =>
                        <CommentArea key={comment.id} comment={comment} />
                    )}
                </CommentsContainer>
            </StyledContainer>
        </ModalWindow>
    );
};

export default Card;

type ButtonProps = {
    $isHidden?: boolean
}

type EditProps = {
    $isEditNow: boolean
}

const StyledContainer = styled.div`
display:flex;
flex-direction:column;
position:relative;
min-height:200px;
min-width:500px;
max-height:600px;
overflow:auto;
border:2px solid var(--darkest-color);
border-radius:10px;
background-color:var(--light-color);
`;

const CancelButton = styled(Button)`
position:absolute;
right:0px;
top:0px;
height:30px;
width:30px;
background-color:red;
border:2px solid black;
border-radius:50%;
`;

const CardForm = styled.form`
    
`;

const CardHeader = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:100%;
height:10%;
background-color:var(--lightest-color);
border-bottom:2px solid var(--darkest-color);
border-radius:6px 6px 0 0;
`;

const CardDescription = styled.div`
width:100%;
height:40%;
display:flex;
flex-direction:column;
`;

const StyledDescription = styled.textarea<EditProps>`
flex-grow:1;
resize:none;
margin:0 20px;
border: ${props => props.$isEditNow ? '2px solid var(--darkest-color)' : '2px solid transparent'};
color:var(--darkest-color);
background-color:${props => props.$isEditNow ? 'var(--light-color)' : 'transparent'};
border-radius:10px;
min-height:60px;
outline:none;
`;

const CommentsContainer = styled.div`
width:100%;
height:50%;
`;

const StyledInput = styled.input<EditProps>`
border: ${props => props.$isEditNow ? '2px solid var(--darkest-color)' : '2px solid transparent'};
background-color:${props => props.$isEditNow ? 'var(--light-color)' : 'transparent'};
font-weight:bold;
border-radius:6px;
margin:20px;
font-size:20px;
color:var(--darkest-color);
outline:none;
max-width:80%;
`;

const StyledTitle = styled.h3`
font-size:22px;
padding:10px;
color:var(--darkest-color);
`;

const StyledComment = styled.textarea`
flex-grow:1;
resize:none;
margin:0 20px;
border:'2px solid #d8e49b';
background-color:var(--lightest-color);
color:var(--darkest-color);
border-radius:10px;
min-height:60px;
padding:4px;
outline:none;
`;

const ButtonContainer = styled.div`
display:flex;
justify-content:space-around;
`;

const StyledButton = styled(Button) <ButtonProps>`
    margin:10px 20px;
    background-color:var(--dark-color);
    border:2px solid var(--darkest-color);
    color: var(--primary-color);
    display:${props => props.$isHidden ? 'none' : 'block'};
`;

const StyledForm = styled.form`
display:flex;
flex-direction:column;
`; 