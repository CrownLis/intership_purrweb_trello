import { FC, useContext } from "react"
import styled from "styled-components"
import useSelector from "../../store/hooks"
import { selectors } from "../../store/store"

const Header: FC = () => {

const user = useSelector(selectors.user.selectUser())

    return (
        <StyledHeader>
            <StyledTitle>
               {user? `Приветствую ${user.name}` : 'Авторизуйтесь'}
            </StyledTitle>
        </StyledHeader>
    )
}

export default Header

const StyledHeader = styled.header`
width:100%;
max-height:40px;
background:#0ac2ff;
`
const StyledTitle = styled.h1`
font-size:24px;
color:white;
text-align:center;
padding:6px;
`
