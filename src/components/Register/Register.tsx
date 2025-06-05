import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register, isAuthenticated, authError } = useAuth();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [localError, setLocalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
            await register(credentials);
            navigate("/dashboard");
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Join Doodle Calendar</h2>

                {authError && <div className="error-message">{authError}</div>}
                {localError && <div className="error-message">{localError}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

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
                            placeholder="Password (min 6 characters)"
                            value={credentials.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                            className="form-input"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="register-button">
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="register-link">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
