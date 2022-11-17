import { FC } from "react";
import styled from "styled-components";
import useSelector from "../../store/hooks";
import { selectors } from "../../store/store";
import { CardType, ColumnType, CommentType } from "../../Types/types";
import Column from "../Column/Column";


const Body: FC = () => {

    const columns = useSelector(selectors.columns.selectColumns())
    return (
        <StyledDesk>
            {columns?.map(item =>
                <Column
                    key={item.id}
                    name={item.name}
                    id={item.id}
                />)}
        </StyledDesk>
    )
}

export default Body

const StyledDesk = styled.main`
display:flex;
margin:40px 100px;
gap:30px;
`