import React, { FC } from 'react';
import styled from 'styled-components';
import { rootSelectors } from '../../../store/ducks';
import { useAppSelector } from '../../../store/hooks';
import { CardType } from '../../../Types/types';
import TextArea from '../../../UIComponents/TextArea';

type CardProps = {
    onClick: () => void,
    data: CardType
}

const CardInfo: FC<CardProps> = ({ onClick, data }) => {

    const comment = useAppSelector((state) => rootSelectors.comments.selectorGetCommentsByCardId(state, data.id));

    return (
        <StyledCardContent>
            <CardDescription onClick={onClick} value={data.name} readOnly />
            <StyledCardInfo>
               Количество комментариев:{comment? comment.length : 0}
            </StyledCardInfo>
        </StyledCardContent>
    );
};

export default CardInfo;

const StyledCardContent = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`;

const CardDescription = styled(TextArea)`
color:var(--lightest-color);
`;

const StyledCardInfo = styled.span`
font-size:18px;
color:var(--lightest-color);
`;