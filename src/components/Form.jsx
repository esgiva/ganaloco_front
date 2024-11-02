import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/drivers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok :P');
            }

            const data = await response.json();

            if (data && data.success) {
                alert(data.message);
                // Navega a la vista correspondiente según el rol
                navigate(data.user.role === 'user' ? "/userHome" : "/adminHome");
            } else {
                alert(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Inicio de sesión</h1>
            <h4 className="txt">Correo: </h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br />
            
            {/* Botón para Inicio de sesión */}
            <button type="submit" id="btnCreateUser">
                Ingresar
            </button>
            <button type="button" id="btnCreateUser" onClick={() => navigate('/createUser')}>
                Crear Usuario
            </button>
            <button type="button" id="btnCreateUser" onClick={() => navigate('/createAdmin')}>
                Crear Admin
            </button>
            
        </form>
    );
}

export default LoginUser;

