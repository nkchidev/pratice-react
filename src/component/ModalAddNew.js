import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreaetUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalAddNew = ({show, handleClose,handleUpdateTable}) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreaetUser(name,job);
        if(res && res.id){ 
            handleClose();
            setName('');
            setJob('');
            toast.success("A user is created succeed!");
            handleUpdateTable({first_name: name, id: res.id});
        }else{
            toast.error("An error");
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;