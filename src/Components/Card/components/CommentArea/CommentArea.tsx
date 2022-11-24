import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { rootActions,rootSelectors } from '../../../../store/ducks/index';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { CommentType } from '../../../../Types/types';
import Button from '../../../../UIComponents/Button';

type CommentProps = {
    comment: CommentType,
}

const CommentArea: FC<CommentProps> = ({ comment }) => {

    const [isEdit, setIsEdit] = useState(false);
    const user = useAppSelector(rootSelectors.user.selectUser);
    const isAuthor = user?.name === comment.author;
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<CommentType>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            author: comment.author,
            cardId: comment.cardId,
            id: comment.id,
            text: comment.text
        },
    });

    const onSubmit = (data: CommentType) => {
        console.log(data);
        dispatch(rootActions.comments.changeComment(data));
        setIsEdit(false);
    };

    return (
        <Root>
            <TitleComment>{user?.name}</TitleComment>
            <CommentForm onSubmit={handleSubmit(onSubmit)}>
                <StyledTextComment $isEdit={isEdit} {...register('text',
                    {
                        required: 'Please enter the comment',
                        minLength: {
                            value: 1,
                            message: 'Please enter the comment'
                        }
                    }
                )}

                   name='text' readOnly={isEdit ? false : true} />
                {isAuthor ?
                    <ButtonContainer>
                        <StyledButton $isHidden={isEdit} onClick={() => setIsEdit(true)} type='button'>
                            Редактировать комментарий
                        </StyledButton>
                        <StyledButton $isHidden={!isEdit} type='submit'>
                            Сохранить изменения
                        </StyledButton>
                        <StyledButton onClick={() => dispatch(rootActions.comments.removeComment(comment.id))}>
                            Удалить комментарий
                        </StyledButton>
                    </ButtonContainer> : null}
            </CommentForm>

        </Root>
    );
};

export default CommentArea;

type TextAreaProps = {
    $isEdit: boolean
}


type ButtonProps = {
    $isHidden?: boolean
}

const Root = styled.div`
display:flex;
flex-direction:column;
`;

const TitleComment = styled.h3`
font-size:18px;
padding:10px;
margin:0 20px;
`;

const CommentForm = styled.form`
    display:flex;
    flex-direction:column;
`;

const ButtonContainer = styled.div`
display:flex;
justify-content:space-around;
`;

const StyledTextComment = styled.textarea<TextAreaProps>`
background-color:var(--lightest-color);
color:var(--darkest-color);
border-radius:10px;
min-height:60px;
padding:4px;
outline:none;
margin:0 20px;
resize:none;
border: ${props => props.$isEdit ? '2px solid var(--dark-color)' : '2px solid transparent'};
`;

const StyledButton = styled(Button) <ButtonProps>`
    margin:10px 20px;
    display:${props => props.$isHidden ? 'none' : 'block'}
`;