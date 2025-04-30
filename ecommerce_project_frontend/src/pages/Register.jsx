import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, recaptcha_token: recaptchaToken }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Registration successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            } else {
                setError(data.message || "Registration failed. Please try again.");
                toast.error(data.message || "Registration failed.", {
                    position: "top-center",
                    autoClose: 3000,
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white-100 to-green-200">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
                >
                    ← Back
                </button>

                <h2 className="text-3xl font-extrabold text-center text-green-600 mb-8">
                    Create Your Account 🚀
                </h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
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
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm password"
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
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        {loading ? "Processing..." : "Register"}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register;
