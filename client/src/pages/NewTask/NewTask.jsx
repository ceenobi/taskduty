import { useState } from "react";
import "./newTask.css";
import { createTask } from "../../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Urgent");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createTask(title, description, tags);
      if (res.status === 201) {
        toast.success(res.data.msg);
        navigate("/mytasks");
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
    <div className="newTaskContainer">
      <h1 id="header">
        <span style={{ marginRight: "1rem" }}>
          <a href="/">&lt;</a>
        </span>
        New Task
      </h1>
      {error && <p>{error}</p>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="label">
            Task Title
          </label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            className="input"
            style={{ width: "100%", padding: "15px 25px" }}
            placeholder="E.g Project Defense, Assignment ..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="description" className="label">
            Description
          </label>
          <br />
          <textarea
            name="description"
            id="description"
            className="input"
            rows="8"
            placeholder="Briefly describe your task ..."
            style={{ width: "100%", padding: "15px 25px" }}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <br />

          <label htmlFor="tags" className="label">
            Tags
          </label>
          <br />
          {/* <input
          list="tags"
          name="tags"
          className="input"
          placeholder="Urgent; Important"
          style={{ width: "100%", padding: "15px 25px" }}
        /> */}
          <select
            id="tags"
            onChange={(e) => setTags(e.target.value)}
            className="input"
            style={{ width: "100%", padding: "15px 25px" }}
          >
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
          <br />
          <br />

          <input
            id="submit"
            type="submit"
            value={"Done"}
            disabled={loading}
            style={{
              width: "100%",
              height: "60px",
              color: "white",
              backgroundColor: "#974FD0",
              fontSize: "24px",
              border: "none",
              borderRadius: "8px",
            }}
          />
        </form>
      )}
      <div className="topLink">
        <a href="#">Back to the Top</a>
      </div>
    </div>
  );
};

export default NewTask;
