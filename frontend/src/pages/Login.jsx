import React, { useState } from 'react';
import "../../styles/Login.css";
import logo from "@/assets/react.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!password.trim()) newErrors.password = 'La contraseña es obligatoria';

    /*const allowedDomain = '@tudominio.com';
    if (email && !email.endsWith(allowedDomain)) {
      newErrors.email = `El correo debe pertenecer al dominio ${allowedDomain}`;
    }

    /* if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      newErrors.password = 'La contraseña debe incluir al menos un carácter especial (por ejemplo: ! @ # $ % ^ & * ( ) , . ? " : { } | < >)';
    }*/

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const loginEndpoint = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Login exitoso
      window.alert(data.message); // Muestra: "Login exitoso"
      console.log("Usuario ID:", data.user_id);
      // Aquí podrías redirigir o guardar un token
    } else {
      // Error del servidor (401, etc.)
      window.alert(data.detail || 'Ocurrió un error al iniciar sesión');
    }
  } catch (error) {
    // Error de red o del backend
    window.alert('Error de conexión con el servidor');
    console.error(error);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      loginEndpoint();
      console.log('Login exitoso con:', { email, password });
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





