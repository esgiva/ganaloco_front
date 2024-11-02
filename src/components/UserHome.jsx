import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios
import './styles/UserHome.css';

function UserHome() {
  const [user, setUser] = useState({ nombre: '', username: '', numeroCelular: '', ciudad: '' });
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener datos del usuario y códigos registrados desde el backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/v1/drivers/getPartip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'All@example.com', // Cambia este valor por el que corresponda
            password: 'password123'      // Envía la contraseña para la validación
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Asumimos que `data` es un array y tomamos el primer elemento
          setUser({ 
            nombre: data[0].nombre, 
            username: 'All@example.com', 
            numeroCelular: data[0].numeroCelular, 
            ciudad: data[0].ciudad 
          });

          // Obtener códigos registrados
          const codesResponse = await axios.get('http://localhost:4000/v1/drivers/mostCode');
          setCodes(codesResponse.data);
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario
  }, []);

  // Función para enviar nuevo código al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCode) {
      try {
        const response = await fetch('/api/newCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: newCode })
        });

        const result = await response.json();
        if (response.ok) {
          // Actualiza la lista de códigos en la tabla
          setCodes([...codes, { fechaRegistro: new Date().toLocaleString(), numeroCodigo: newCode, estado: 'registrado' }]);
          setNewCode('');
        } else {
          console.error(result.mensaje);
        }
      } catch (error) {
        console.error('Error al registrar el código:', error);
      }
    }
  };

  return (
    <div className='allUserHome'>
      <div className="user-home">
        <header className="header">
          <img src="/logo.png" alt="Gana Como Loco Logo" className="logo" />
          <nav>
            <button onClick={() => navigate('/ChangePassword')}>Cambiar Contraseña</button>
            <button onClick={() => navigate('/')}>Cerrar Sesión</button>
          </nav>
        </header>

        <main className="main-content">
          <h1 className="welcome">¡Bienvenido!</h1>

          <section className="user-info">
            <h2>Información del Usuario</h2>
            <table>
              <tbody>
                <tr>
                  <td>Nombre:</td>
                  <td>{user.nombre}</td>
                </tr>
                <tr>
                  <td>Correo:</td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Número Celular:</td>
                  <td>{user.numeroCelular}</td>
                </tr>
                <tr>
                  <td>Ciudad:</td>
                  <td>{user.ciudad}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="registrar-codigo">
            <h2>Registrar Nuevo Código</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Registrar nuevo código"
                className="code-input"
              />
              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </section>

          <section className="code-list">
            <h2>Códigos Registrados</h2>
            <table>
              <thead>
                <tr>
                  <th>Fecha de Registro</th>
                  <th>Número de Código</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code._id}>
                    <td>{code.user.nombre}</td>
                    <td>{code.user.username}</td>
                    <td>{code.estado}</td>
                    <td>{code.codigo}</td>
                    <td>{code.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Gana Como Loco Colombia. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default UserHome;

