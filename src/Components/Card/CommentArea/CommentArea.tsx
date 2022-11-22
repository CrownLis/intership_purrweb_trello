import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { removeComment } from "../../../store/ducks/comments/commentsSlice";
import { getUser } from "../../../store/ducks/user/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CommentType } from "../../../Types/types";
import { changeComment } from "./../../../store/ducks/comments/commentsSlice";
import Button from "../../../UIComponents/Button";

type CommentProps = {
    comment: CommentType,
}

type TextAreaProps = {
    isEdit: boolean
}


type ButtonProps = {
    hidden?: boolean
}

const CommentArea: FC<CommentProps> = ({ comment }) => {

    const [isEdit, setIsEdit] = useState(false);
    const hidden = !isEdit;
    const user = useAppSelector(getUser);
    const isAuthor = user?.name === comment.author;
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<CommentType>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            author: comment.author,
            cardId: comment.cardId,
            id: comment.id,
            text: comment.text
        },
    });

    const onSubmit = (data: CommentType) => {
        dispatch(changeComment(data));
        setIsEdit(false);
    };

    return (
        <Root>
            <TitleComment>{user!.name}</TitleComment>
            <CommentForm onSubmit={handleSubmit(onSubmit)}>
                <StyledTextComment isEdit={isEdit} {...register("text",
                    {
                        required: "Please enter the comment",
                        minLength: {
                            value: 1,
                            message: "Please enter the comment"
                        }
                    }
                )}

                    readOnly={isEdit ? false : true} />
                {isAuthor ?
                    <ButtonDiv>
                        <StyledButton hidden={!hidden} onClick={() => setIsEdit(true)} type='button'>
                            Редактировать комментарий
                        </StyledButton>
                        <StyledButton hidden={hidden} type='submit'>
                            Сохранить изменения
                        </StyledButton>
                    </ButtonDiv> : null}
            </CommentForm>

        </Root>
    );
};

export default CommentArea;

const Root = styled.div`
display:flex;
flex-direction:column;
`;
const TitleComment = styled.h3`
font-size:18px;
padding:10px;
`;
const CommentForm = styled.form`
    display:flex;
    flex-direction:column;
`;

const ButtonDiv = styled.div`
display:flex;
justify-content:space-around;
`;
const StyledTextComment = styled.textarea<TextAreaProps>`
    margin:0 20px;
    resize:none;
    border: ${props => props.isEdit ? "2px solid #d8e49b" : "2px solid white"};
`;

const StyledButton = styled(Button) <ButtonProps>`
    margin:10px 20px;
    display:${props => props.hidden ? "none" : "block"}
`;