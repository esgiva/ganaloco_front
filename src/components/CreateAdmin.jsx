import './styles/CreateAdmin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:4000/v1/drivers/createAdmin', {
                username,
                password
            });

            if (response.data.success) {
                setSuccessMessage('Usuario Administrador creado exitosamente');
            } else {
                setErrorMessage(response.data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className='allcreateAdmin'>
            <div className="container">
                <form onSubmit={handleCreateUser}>
                    <div className='Bloque de registro'>
                        <h1 id="tituloCrearUsuario">Crear Usuario Administrador</h1>
                        
                        <div className="email">
                            <input
                                type="text"
                                id="inputUsername"
                                placeholder="Nombre de usuario"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="password">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="inputPassword"
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkbox">
                        <label type="checkbox" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ocultar" : "Mostrar"} Contraseña
                        </label>
                        </div>
                    <button type="submit" id="btnCreateUser"  >Crear Usuario</button>
                    <button type="button" id="btnCreateUser" onClick={() => navigate('/')}>
                        Regresar
                    </button>
                    {successMessage && <p className="success">{successMessage}</p>}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
        </div>
    );
}

export default CreateAdmin;