import { FC, useState } from "react";
import styled from "styled-components";
import Button from "../../UIComponents/Button";
import AddCard from "../AddCard/AddCard";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCardsByColumnId } from "../../store/ducks/cards/selectors";
import { useForm } from "react-hook-form";
import { CardType, ColumnType } from "../../Types/types";
import { changeColumn } from "../../store/ducks/columns/columnsSlice";
import EditIcon from "./../../assets/editIcon.png";
import SaveIcon from "./../../assets/saveIcon.png";
import CardInfo from "./CardInfo/CardInfo";

type ColumnProps = {
    data: ColumnType
}

type ButtonProps = {
    hidden: boolean
}

const Column: FC<ColumnProps> = ({ data }) => {

    const [showAddCard, setShowAddCard] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useAppDispatch();
    const [activeCard, setActiveCard] = useState<CardType | null>(null);
    const { register, handleSubmit } = useForm<ColumnType>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            id: data.id,
            name: data.name
        },
    });

    const cards = useAppSelector((state) => getCardsByColumnId(state, data.id));
    const onSubmit = (d: ColumnType) => {
        dispatch(changeColumn(d));
        setIsEdit(false);
    };

    return (
        <StyledColumn>
            <TitleColumn onSubmit={handleSubmit(onSubmit)}>
                <StyledInput {...register("name",
                    {
                        required: "Please enter the column name",
                        minLength: {
                            value: 3,
                            message: "minimum column name must be 3 symbols"
                        }
                    }
                )} readOnly={!isEdit} />
                <IconButton hidden={!isEdit} type='submit'><SaveImage src={SaveIcon} /> </IconButton>
                <IconButton hidden={isEdit} type='button'><ImageTitle src={EditIcon} onClick={() => setIsEdit(true)} /></IconButton>
            </TitleColumn>
            <CardsDiv>
                {activeCard ?
                    <Card
                        columnName={data.name}
                        data={activeCard}
                        onClose={() => setActiveCard(null)}
                    /> : null}

                {cards?.map(item => {
                    return (
                        <StyledCard key={item.id}>
                            <CardInfo onClick={() => setActiveCard(item)} data={item} />
                        </StyledCard>
                    );
                }
                )}
            </CardsDiv>
            <ButtonDiv>
                <StyledButton onClick={() => setShowAddCard(true)}>
                    Добавить карточку
                </StyledButton>
            </ButtonDiv>
            <AddCard show={showAddCard} setShow={setShowAddCard} columnId={data.id} />
        </StyledColumn>
    );
};

export default Column;

const IconButton = styled(Button) <ButtonProps>`
max-width:100%;
max-height:100%;
background-color:transparent;
padding:0;
margin:0;
border:0px;
display:${props => props.hidden ? "none" : "block"};
&:hover {
    box-shadow:0 0 0;
}
`;

const StyledButton = styled(Button)`
background-color:transparent;
color:var(--lightest-color);
border:2px solid transparent;
padding:4px;
&:hover {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow:0 0 0;
    border:2px solid var(--lightest-color);
}
`;
const ButtonDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
text-align:center;
background-color:var(--darkest-color);
height:30px;
`;
const StyledInput = styled.input`
font-size:18px;
font-weight:bold;
color:var(--darkest-color);
padding:3px;
border:0;
background-color:transparent;
text-align:center;
outline:none;
`;
const ImageTitle = styled.img`
    max-width:40px;
`;
const SaveImage = styled(ImageTitle)`
max-height:20px;
max-width:20px;
margin:5px 10px;
`;

const TitleColumn = styled.form`
display:flex;
justify-content:center;
background-color:var(--light-color);
width:100%;
max-height:30px;
text-align:center;
`;
const CardsDiv = styled.div`
display:flex;
flex-direction:column;
min-height:120px;
`;
const StyledCard = styled.div`

`;
const StyledColumn = styled.div`
display:flex;
flex-direction:column;
align-items:center; 
border:2px solid var(--darkest-color);
border-radius:6px;
background-color:var(--dark-color);
width:100%;
height:100%;
`;