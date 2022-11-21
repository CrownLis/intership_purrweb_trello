import { FC } from "react";
import styled from "styled-components";
import { getColumns } from "../../store/ducks/columns/selectors";
import { useAppSelector } from "../../store/hooks";
import Column from "../Column/Column";


const Body: FC = () => {

    const columns = useAppSelector(getColumns)
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