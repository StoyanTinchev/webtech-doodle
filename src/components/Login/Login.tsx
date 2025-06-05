import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, authError } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLocalError(null);

        try {
            await login(credentials);
            navigate("/dashboard");
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login to Doodle Calendar</h2>

                {authError && <div className="error-message">{authError}</div>}
                {localError && <div className="error-message">{localError}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="login-button">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="login-footer">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="login-link">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
