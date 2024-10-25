import { useEffect, useState } from "react";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { getMyTask, deleteMyTask } from "../../config/api";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import EditTask from "./EditTask";

const MyTasks = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await getMyTask();
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response?.data?.error);
        } else {
          setError(error.response?.data || error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await deleteMyTask(id);
      toast.success(res.data);
      setData(data.filter((existingTasks) => existingTasks._id !== id));
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response?.data?.error);
      } else {
        setError(error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="mt-5 px-3">
      <h1 className="fs-4 mb-3">Your Tasks</h1>
      {error && <p>{error}</p>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {data?.length > 0 ? (
            <Row>
              {data.map((item, index) => (
                <Col xs={12} md={4} key={item._id}>
                  <Card className="text-center mb-3">
                    <Card.Header>#{index}</Card.Header>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Button
                        variant={item.tags === "Urgent" ? "primary" : "warning"}
                      >
                        {item.tags}
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {format(item.createdAt)}
                      <span
                        className="ms-4 text-black"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteTask(item._id)}
                      >
                        Delete
                      </span>
                      <EditTask item={item} index={index} setData={setData}/>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No task created yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyTasks;
