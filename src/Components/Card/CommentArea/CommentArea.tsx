import { FC, useState } from "react";
import styled from "styled-components";
import useSelector from "../../../store/hooks";
import { actions, selectors } from "../../../store/store";
import { CommentType } from "../../../Types/types";
import Button from "../../../UIComponents/Button";
import TextArea from "../../../UIComponents/TextArea";

type CommentProps = {
    comment: CommentType,
}

const CommentArea: FC<CommentProps> = ({ comment }) => {

    const [textComment, setTextComment] = useState(comment.text)
    const [isEdit, setIsEdit] = useState(false)
    const user = useSelector(selectors.user.selectUser())

    const endEdit = () => {
        const editedComment = { ...comment, text: textComment }
        if (textComment.length > 0) {
            actions.comments.changeComment(editedComment)
        }
        setIsEdit(!isEdit)
    }


    return (
        <StyledComment>
            <StyledTitle>{user!.name}</StyledTitle>
            <TextArea
                value={textComment}
                onChange={e => setTextComment(e.target.value)}
                readOnly={isEdit ? false : true} />
            {user?.name === comment.author ?
                <ButtonDiv>
                    {isEdit ? <Button onClick={() => endEdit()}>Сохранить</Button> :
                        <Button onClick={() => setIsEdit(true)}>Изменить</Button>}
                    <Button onClick={() => actions.comments.removeComment(comment.id)}>Удалить</Button>
                </ButtonDiv> : null}
        </StyledComment>
    )
}

export default CommentArea

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