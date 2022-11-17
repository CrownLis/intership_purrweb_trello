import { FC, useState } from "react";
import styled from "styled-components";
import Button from "../../UIComponents/Button";
import AddCard from "../AddCard/AddCard";
import TextArea from "../../UIComponents/TextArea";
import Card from "../Card/Card";
import useSelector from "../../store/hooks";
import { selectors } from "../../store/store";

type ColumnProps = {
    id: number,
    name: string
}

const Column: FC<ColumnProps> = ({ id, name }) => {

    const [showAddCard, setShowAddCard] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [columnName, setColumnName] = useState(name)
    const [showCardInfo, setShowCardInfo] = useState(false)

    const cards = useSelector(selectors.cards.selectCardByColumnId(id))

    return (
        <StyledColumn>
            <TitleDiv>
                <StyledInput onChange={e => setColumnName(e.target.value)} onClick={() => setIsEdit(!isEdit)} readOnly={!isEdit} value={columnName} />
            </TitleDiv>
            <CardsDiv>
                {cards.map(item => {
                    return (
                        <StyledCard key={item.id}>
                            <StyledCardContent>
                                <TextArea onClick={() => setShowCardInfo(true)} value={item.name} readOnly />
                                <StyledCardInfo>
                                    Количество комментариев:{item.commentCount}
                                </StyledCardInfo>
                            </StyledCardContent>
                            <Card
                                columnName={name}
                                show={showCardInfo}
                                data={item}
                                setShowCardInfo={setShowCardInfo}
                                />
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

const StyledCardInfo = styled.div`

`

const StyledCardContent = styled.div`
display:flex;
flex-direction:column;
text-align:center;
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
const ButtonDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
text-align:center;
background-color:blue;
height:30px;
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
const StyledColumn = styled.div`
display:flex;
flex-direction:column;
align-items:center; 
border:2px solid black;
border-radius:6px;
background:#0ac2ff;
width:100%
`