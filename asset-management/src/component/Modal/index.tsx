import React, { PureComponent, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/atom';
import LoginContent from './LoginContent';

interface ModalProps {
    modalTitle?: string;
    children ?: React.ReactNode;
}
const StyledModal = styled.div`
    position: fixed;
    top:5rem;
    height:60vh;

    /* transform: translate(-50%, -50%); */
    z-index: 11;
    width: 50vw;
    @media screen and (min-width: ${props => props.theme.breakPoint.ms}){
        width:80vw;
    }
    @media screen and (min-width: ${props => props.theme.breakPoint.t}){
        width:50vw;
    }
    @media screen and (min-width: ${props => props.theme.breakPoint.ll}){
        width:30vw;
    }
    border-radius:1rem;
    background-color:white;
    border: none;
`
const ModalHeader = styled.header`
    display:block;
    width:100%;
    height: 4rem;
    border-bottom: solid 2px #c9c9c9;
    text-align:center;
`
const ModalFooter = styled.div`
    display:flex;
    width:100%;
    height: 2rem;
    justify-content:center;
    align-items: center;
    border-top: solid 2px gray;
`
const ModalBody = styled.div`
    width:100%;
    display:flex;
    justify-content : center;
    align-items: center;
    height:calc(60vh - 4rem - 1rem);
    margin-bottom:1rem;
    overflow-y:auto;
`
const RestyledButton = styled(Button)`
    display:inline-block;
    position:absolute;
    top:1rem;
    right:1rem;
    text-align:none;
    width:2rem;
    height:2rem;

    padding:0;
    margin-right:1rem;
    border-radius:2rem;
    border: 1px solid #aaaaaa;
    :hover{
        background-color:#dcdcdc;
        box-shadow:none;
    }
    color:black;
`
const H5 = styled.h5`
    display:inline-block;
    vertical-align:middle;
    line-height:4rem;
    margin:0;
`
const Overlay = styled.div`
width:100vw;
height: 100vh;
background-color: rgba(0,0,0,.2);
position:fixed;
top:0;
left:0;
z-index:10;

display:flex;
justify-content:center;
align-content:center;
`
const Modal: React.FC<ModalProps> = (props) => {
    const {children, ...args} = props;
    const [modal, setModal] = useRecoilState(modalState)

    
    const closeModal = (e:React.MouseEvent) => {
        e.stopPropagation()
        setModal((prev) => ({
                ...prev,
                isModalOpen :false,
            }))
    }
  return (
    <React.Fragment>
        { modal.isModalOpen &&
        <Overlay onClick={closeModal} >
            <StyledModal onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <H5>{modal.title}</H5>
                    <RestyledButton onClick={closeModal} >X</RestyledButton>
                </ModalHeader>
                <ModalBody>
                {modal.content === "login" && <LoginContent />}
                </ModalBody>
            </StyledModal>
        </Overlay>
        }
    </React.Fragment>
    
  )
}

export default Modal;