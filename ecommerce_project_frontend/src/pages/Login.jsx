import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, recaptcha_token: recaptchaToken }),
            });

            const data = await response.json();

            if (response.ok) {
                const { loginToken, is_admin } = data;
                localStorage.setItem("loginToken", loginToken);
                localStorage.setItem("isAdmin", is_admin);

                alert(data.message);
                navigate(is_admin ? "/adminHome" : "/");
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4">← Back</button>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" className="w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <ReCAPTCHA sitekey={config.RECAPTCHA_SITEKEY} onChange={(value) => setRecaptchaToken(value)} />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md" disabled={loading}>
                    {loading ? "Processing..." : "Login"}
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link to="/resetPassword" className="text-blue-500">Forgot password?</Link>
                <p className="mt-2">Don&apos;t have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
        </div>
    );
};

export default Login;
