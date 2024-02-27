import { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = "/home";


    const userRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = userRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { email, password });
            console.log(response.data.token); // Faites quelque chose avec la réponse si nécessaire
            navigate(from, { replace: true }); // Rediriger vers la page précédente ou la page par défaut après la connexion réussie
        } catch (err) {
            console.error('Login failed:', err);
            setErrMsg('Login Failed');
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login;
