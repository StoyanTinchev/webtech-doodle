import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import "./Register.css";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const {register, isAuthenticated, authError, clearError} = useAuth();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/dashboard";
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    // Clear errors when component mounts (only once)
    useEffect(() => {
        if (clearError) {
            clearError();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Clear error when user starts typing
        if (authError && clearError) {
            clearError();
        }

        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(credentials);
            navigate("/dashboard");
        } catch (err: any) {
            // Error is handled in AuthContext
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Join Doodle Calendar</h2>

                {authError && <div className="error-message">{authError}</div>}

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