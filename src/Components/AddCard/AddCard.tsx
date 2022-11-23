import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { rootActions,rootSelectors } from '../../store/ducks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CardType } from '../../Types/types';
import Button from '../../UIComponents/Button';
import ModalWindow from '../../UIComponents/ModalWindow/ModalWindow';

type ColumnProps = {
    columnId: number,
    show: boolean,
    setShow: (arg1: boolean) => void,
}

const AddCard: FC<ColumnProps> = ({ columnId, show, setShow }) => {

    const user = useAppSelector(rootSelectors.user.selectorGetUser);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset } = useForm<CardType>({

        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            description: '',
            name: ''
        },
    });

    const onSubmit = (data: CardType) => {
        dispatch(rootActions.cards.addCard({ ...data, id: Number(new Date()), author: user!.name, columnId: columnId }));
        reset();
        setShow(false);
    };

    const onCloseModal = () => {
        setShow(false);
    };

    return (
        <ModalWindow isShowPopup={show} onClose={onCloseModal}>
            <StyledContainer>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledInput {...register('name',
                        {
                            required: 'Please enter the card name',
                            minLength: {
                                value: 1,
                                message: 'Please enter the correct card name'
                            }
                        }
                    )} />
                    <StyledDescription {...register('description',
                        {
                            required: 'Please enter the description',
                            minLength: {
                                value: 1,
                                message: 'Please enter the correct description'
                            }
                        }
                    )}
                    />
                    <ButtonContainer>
                        <StyledButton type='submit'>
                            Submit
                        </StyledButton>
                        <StyledButton type='button' onClick={() => setShow(false)}>
                            Cancel
                        </StyledButton>
                    </ButtonContainer>
                </StyledForm>
            </StyledContainer>
        </ModalWindow>
    );
};

export default AddCard;

const StyledContainer = styled.div`
width:400px;
height:300px;
border:2px solid var(--darkest-color);
border-radius:16px;
background-color:var(--dark-color);
`;

const StyledForm = styled.form`
display:flex;
flex-direction:column;
`;

const ButtonContainer = styled.div`
display:flex;
justify-content:space-around;
`;

const StyledButton = styled(Button)`
    background-color:var(--darkest-color);
    border:2px solid var(--lightest-color);
    color:var(--lightest-color);
`;

const StyledInput = styled.input`
border:2px solid var(--darkest-color);
color:var(--lightest-color);
border-radius:6px;
margin:20px;
font-size:20px;
outline:none;
background-color:rgba(0, 0, 0, 0.2);
`;

const StyledDescription = styled.textarea`
border:0px;
border-radius:10px;
background-color: rgba(0, 0, 0, 0.2);
color:var(--lightest-color);
resize:none;
margin:20px;
padding:6px;
height:100px;
outline:none;
`;