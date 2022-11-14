import { FC } from "react";
import styled from "styled-components";
import { ICard, IColumn, IComment } from "../../Types/types";
import Column from "./Column/Column";

const StyledDesk = styled.main`
display:flex;
margin:40px 100px;
gap:30px;
`
type BodyProps = {
    cards: ICard[],
    columns?: IColumn[],
    comments: IComment[],
}

const Body: FC<BodyProps> = ({ comments, columns, cards }) => {
    return (
        <StyledDesk>
            {columns?.map(item =>
                <Column
                    key={item.id}
                    name={item.name}
                    cards={cards}
                    id={item.id}
                    comments={comments}
                />)}
        </StyledDesk>
    )
}

export default Body