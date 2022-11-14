import { FC } from "react"
import styled from "styled-components"


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

type HeaderProps = {
    userName?: string;
}

const Header: FC<HeaderProps> = ({ userName }) => {
    return (
        <StyledHeader>
            <StyledTitle>
               {userName? `Приветствую ${userName}` : 'Авторизуйтесь'}
            </StyledTitle>
        </StyledHeader>
    )
}

export default Header