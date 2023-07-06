import React from 'react';
import { Modal } from 'antd';
import './Styles/ModalView.css';

interface IModalProps{
    title?: string | React.ReactNode
    children?: React.ReactNode 
    isOpen: boolean

}
const ModalView: React.FC<IModalProps> = (props) => {
    
    const { title, children, isOpen } = props;
    
    return (
        <Modal open={isOpen} title={title} okButtonProps={{style: {display: 'none'}}} cancelButtonProps={{style: {display: 'none'}}} closable={false} centered={false}>
            { children }
        </Modal>
    )
}

export default ModalView;