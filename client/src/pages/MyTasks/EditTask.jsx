import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { updateMyTask, getMyTask } from "../../config/api";
import toast from "react-hot-toast";

export default function EditTask({ item, setData }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(item.title || "");
  const [description, setDescription] = useState(item.description || "");
  const [tags, setTags] = useState(item.tags || "Urgent");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateMyTask(item._id, title, description, tags);
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const resp = await getMyTask();
        setData(resp.data);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response?.data?.error);
      } else {
        setError(error.response?.data || error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <p className="small" onClick={handleShow} style={{ cursor: "pointer" }}>
        Edit task
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>{error}</p>}
          <Form onSubmit={updateTask}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="give a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Tags</Form.Label>
              <Form.Select
                size="lg"
                className="mb-4"
                onChange={(e) => setTags(e.target.value)}
                defaultValue={item.tags}
              >
                <option value="Urgent">Urgent</option>
                <option value="Important">Important</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" /> : "Update"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
