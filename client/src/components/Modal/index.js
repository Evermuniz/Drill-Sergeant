import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rate from "../Rate";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Rate your workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>The Drill Sergeant says:</h4>
       <Rate />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



export default MyVerticallyCenteredModal;
