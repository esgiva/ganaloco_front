import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setDateBorn] = useState('');
    const [cedula, setNit] = useState('');
    const [ciudad, setCity] = useState('');
    const [numeroCelular, setPhone] = useState('');
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
            const response = await axios.post('http://localhost:4000/v1/drivers/createUser', {
                username,
                password,
                nombre,
                fechaNacimiento,
                cedula,
                ciudad,
                numeroCelular
            });

            if (response.data.success) {
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(response.data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className='allcreateUser'>
            <div className="container">
                <form onSubmit={handleCreateUser}>
                    <div className='Bloque de registro'>
                        <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                        <input
                            type="text"
                            id="inputNombre"
                            placeholder="Nombre completo"
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <div className="date-born">
                            <input
                                type="date"
                                id="inputPassword"
                                placeholder="Fecha de Nacimiento"
                                onChange={(e) => setDateBorn(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cedula">
                            <input
                                type="text"
                                id="inputPassword"
                                placeholder="Documento de identificación"
                                onChange={(e) => setNit(e.target.value)}
                                required
                            />
                        </div>
                        <div className="ciudad">
                            <input
                                type="text"
                                id="inputPassword"
                                placeholder="Ciudad"
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="numeroCelular">
                            <input
                                type="text"
                                id="inputPassword"
                                placeholder="Número de celular"
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
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

export default CreateUser;