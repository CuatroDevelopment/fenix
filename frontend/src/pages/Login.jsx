import React, { useState } from 'react';
import "../../styles/Login.css";
import logo from "@/assets/react.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!password.trim()) newErrors.password = 'La contraseña es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const data = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:8001/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Inicio de sesión exitoso");
        console.log("Datos del usuario:", result);
        navigate("/register"); 
      } else {
        alert(`❌ Error: ${result.detail || "Credenciales inválidas"}`);
        console.error("Respuesta del servidor:", result);
      }

    } catch (error) {
      console.error("❌ Error al conectar con el backend:", error);
      alert("❌ No se pudo conectar al servidor.");
    }
  }
};



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo" />
          <h1>Iniciar Sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" className="submit-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;





