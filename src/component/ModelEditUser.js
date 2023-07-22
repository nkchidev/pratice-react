import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {putUpdateUser} from '../services/UserService';
import { toast } from 'react-toastify';

const ModelEditUser = ({show, handleClose, dataUserEdit, handleEditUserFromModal}) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    const handlEditUser = async () => {
        let res = await putUpdateUser(name,job);
        if(res && res.updatedAt){
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            });
            handleClose();
            toast.success('Update user succees!');
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
                    <Modal.Title>Edit information user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control"
                                value={name} onChange={e => setName(e.target.value)} 
                                id="name" placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="job">Job</label>
                            <input type="text" className="form-control"
                                value={job} onChange={e => setJob(e.target.value)} 
                                id="job" placeholder="Enter Job" />
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelEditUser;