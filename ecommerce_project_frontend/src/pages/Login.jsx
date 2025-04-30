import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

                toast.success(data.message || "Login successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    theme: "colored",
                });

                setTimeout(() => {
                    navigate(is_admin ? "/adminHome" : "/");
                }, 2500);
            } else {
                setError(data.message || "Login failed. Please try again.");
                toast.error(data.message || "Login failed!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    theme: "colored",
                });
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-while-100 to-blue-200">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
                >
                    ← Back
                </button>

                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
                    Welcome Back 👋
                </h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={config.RECAPTCHA_SITEKEY}
                            onChange={(value) => setRecaptchaToken(value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    <Link to="/resetPassword" className="text-blue-500 hover:underline">
                        Forgot password?
                    </Link>
                    <p className="mt-2">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;
