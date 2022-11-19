import { FC } from "react"
import styled from "styled-components"
import { getUser } from "../../store/ducks/user/selectors"
import { useAppSelector } from "../../store/hooks"

const Header: FC = () => {

const user = useAppSelector(getUser)

    return (
        <Root>
            <StyledTitle>
               {user? `Приветствую ${user.name}` : 'Авторизуйтесь'}
            </StyledTitle>
        </Root>
    )
}

export default Header

const Root = styled.header`
width:100%;
max-height:40px;
background:#cfe2b0;
`
const StyledTitle = styled.h1`
font-size:24px;
color:white;
text-align:center;
padding:6px;
`
