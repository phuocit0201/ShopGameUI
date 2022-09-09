import { useNavigate } from 'react-router-dom';
function AuthLogin({ children }) {
    let navigate = useNavigate();
    navigate('/');
    return children;
}

export default AuthLogin;
