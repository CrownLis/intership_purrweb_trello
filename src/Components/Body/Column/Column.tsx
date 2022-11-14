import { FC, useState } from "react";
import styled from "styled-components";
import { ICard, IComment } from "../../../Types/types";
import { Button } from "../../../UIComponents/Button/Button";
import { StyledTextArea } from "../../../UIComponents/TextArea/TextArea";
import AddCard from "./AddCard/AddCard";
import Card from "./Card/Card";

const StyledColumn = styled.div`
display:flex;
flex-direction:column;
align-items:center; 
border:2px solid black;
border-radius:6px;
background:#0ac2ff;
width:100%
`
export const TitleDiv = styled.div`
background-color:blue;
width:100%;
max-height:30px;
text-align:center;
`
const CardsDiv = styled.div`
display:flex;
flex-direction:column;
min-height:120px;
`
const StyledCard = styled.div`

`

const StyledInput = styled.input`
font-size:18px;
font-weight:bold;
color:lightgray;
padding:3px;
border:0;
background-color:transparent;
text-align:center;
outline:none;
`

const ButtonDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
text-align:center;
background-color:blue;
height:30px;
`

const StyledButton = styled(Button)`
background-color:transparent;
color:white;
border:2px solid transparent;
padding:2px;
&:hover {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow:0 0 0;
    border:2px solid white;
}
`
const StyledCardInfo = styled.div`

`

const StyledCardContent = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`


type ColumnProps = {
    id: number,
    name: string
    cards: ICard[],
    comments: IComment[],
}

const Column: FC<ColumnProps> = ({ id, name, cards, comments }) => {

    const [showAddCard, setShowAddCard] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [columnName, setColumnName] = useState(name)
    const [showCardInfo, setShowCardInfo] = useState(false)

    const filterComments = (cardId: ICard['id']) => {
        return comments.filter(item => item.cardId === cardId)
    }

    const filterCards = () => {
        return cards.filter(item => item.columnId === id)
    }

    return (
        <StyledColumn>
            <TitleDiv>
                <StyledInput onChange={e => setColumnName(e.target.value)} onClick={() => setIsEdit(!isEdit)} readOnly={!isEdit} value={columnName} />
            </TitleDiv>
            <CardsDiv>
                {filterCards().map(item => {
                    const filteredComments = filterComments(item.id)
                    return (
                        <StyledCard key={item.id}>
                            <StyledCardContent>
                                <StyledTextArea onClick={() => setShowCardInfo(true)} value={item.name} readOnly/>
                                <StyledCardInfo>
                                    Количество комментариев:{filteredComments.length}
                                </StyledCardInfo>
                            </StyledCardContent>
                            <Card
                                name={name}
                                show={showCardInfo}
                                data={item}
                                setShowCardInfo={setShowCardInfo}
                                comments={filteredComments} />
                        </StyledCard>
                    )
                }

                )}
            </CardsDiv>
            <ButtonDiv>
                <StyledButton onClick={() => setShowAddCard(true)}>
                    Добавить карточку
                </StyledButton>
            </ButtonDiv>
            <AddCard show={showAddCard} setShow={setShowAddCard} columnId={id} />
        </StyledColumn>
    )
}

export default Column