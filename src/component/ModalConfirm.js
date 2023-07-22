import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from '../services/UserService'
import { toast } from 'react-toastify';

const ModalDelete = ({show, handleClose,dataUserDelete,handleDeleteUserFromMoal}) => {

    const handleConfirm = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if(res && +res.statusCode === 204){
            handleClose();   
            toast.success("Delete a user succeed!");
            handleDeleteUserFromMoal(dataUserDelete);
        }else{
            toast.error("Error delete a user");
        }
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