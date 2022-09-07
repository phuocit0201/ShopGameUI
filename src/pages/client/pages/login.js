import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const login = () => {
        navigate('/');
    };
    return (
        <div className="form-login">
            <button onClick={login}>go to home</button>
        </div>
    );
}

export default Login;
