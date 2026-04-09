import React, { useState } from "react";
import API from "../api";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/login", form);
            console.log(res.data.message);
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;