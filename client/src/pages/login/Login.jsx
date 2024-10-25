import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../config/api";
import toast from "react-hot-toast";

export default function Login({ loggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (loggedInUser) {
      navigate(from, { replace: true });
    }
  }, [from, loggedInUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(username, password);
      if (res.status === 200) {
        localStorage.setItem(
          "accesstoken",
          JSON.stringify(res.data.access_token)
        );
        toast.success(res.data.msg);
        window.location.replace("/");
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
    <div className="p-5 d-flex flex-column justify-content-center align-items-center min-vh-100">
      {error && <p>{error}</p>}
      <Form
        className="formBox border rounded-3 p-3 mb-3"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="johndoe"
            size="lg"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="password"
            size="lg"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          className="w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" /> : "Log in"}
        </Button>
      </Form>
      <div>
        <p className="mb-1">Not registered with us?</p>
        <Link className="text-center text-secondary" to="/signup">
          <p>Sign up</p>
        </Link>
      </div>
    </div>
  );
}
