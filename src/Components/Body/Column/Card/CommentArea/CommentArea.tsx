import { FC, useContext, useState } from "react";
import styled from "styled-components";
import DeskContext from "../../../../../Context/DeskContext";
import { IComment } from "../../../../../Types/types";
import { Button } from "../../../../../UIComponents/Button/Button";
import { StyledTextArea } from "../../../../../UIComponents/TextArea/TextArea";

const StyledTitle = styled.h3`
font-size:18px;
padding:10px;
`
const ButtonDiv = styled.div`
display:flex;
justify-content:space-around;
`
const StyledComment = styled.div`
display:flex;
flex-direction:column;
`
type CommentProps = {
    comment: IComment,
}

const CommentArea: FC<CommentProps> = ({ comment }) => {

    const { user, changeComment, removeComment } = useContext(DeskContext)
    const [textComment, setTextComment] = useState(comment.text)
    const [isEdit, setIsEdit] = useState(false)

    const endEdit = () => {
        const editedComment = { ...comment, text: textComment }
        if (textComment.length > 0) {
            changeComment(editedComment)
        }
        setIsEdit(!isEdit)
    }


    return (
        <StyledComment>
            <StyledTitle>{user!.name}</StyledTitle>
            <StyledTextArea
                value={textComment}
                onChange={e => setTextComment(e.target.value)}
                readOnly={isEdit ? false : true} />
            {user?.name === comment.author ?
                <ButtonDiv>
                    {isEdit ? <Button onClick={() => endEdit()}>Сохранить</Button> :
                        <Button onClick={() => setIsEdit(true)}>Изменить</Button>}
                    <Button onClick={() => removeComment(comment.id)}>Удалить</Button>
                </ButtonDiv> : null}
        </StyledComment>
    )
}

export default CommentArea