import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class DeleteModal extends Component {
  render() { 
    const {isOpen, toggle, title, doDelete} = this.props; 

   
    return (
      <Modal isOpen={isOpen} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Delete {title} ?</ModalHeader>
          <ModalBody>
            This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={doDelete}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}
 
export default DeleteModal;