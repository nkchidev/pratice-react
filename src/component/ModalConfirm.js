import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({show, handleClose,dataUserDelete}) => {

    const handleConfirm = () => {

    }

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}  
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action can't be undone!
                    Do you want to delete this user? 
                    <br />
                    <b>Email: {dataUserDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;