import React, { useState } from 'react';
import "../../styles/Register.css";
import logo from "@/assets/react.svg";

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [errors, setErrors] = useState({});

  const allPermissions = [
    'Cotizaciones',
    'Inventario',
    'Orden de servicio',
    'Garantias',
    'Ingresos',
    'Egresos',
  ];

  const handlePermissionChange = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter(p => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!password.trim()) newErrors.password = 'La contraseña es obligatoria';

    const allowedDomain = '@tudominio.com';
    if (email && !email.endsWith(allowedDomain)) {
      newErrors.email = `El correo debe pertenecer al dominio ${allowedDomain}`;
    }

    if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      newErrors.password = 'La contraseña debe incluir al menos un carácter especial (por ejemplo: ! @ # $ % ^ & * ( ) , . ? " : { } | < >)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const permissionsObj = {
      'cotizaciones': permissions.includes('Cotizaciones'),
      'inventario': permissions.includes('Inventario'),
      'orden_servicio': permissions.includes('Orden de servicio'),
      'garantias': permissions.includes('Garantias'),
      'ingresos': permissions.includes('Ingresos'),
      'egresos': permissions.includes('Egresos'),
    };

    const data = {
      email,
      nombre: username,
      password,
      permissions: permissionsObj
    };

    try {
      const response = await fetch("http://localhost:8001/usuarios/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Usuario registrado exitosamente");
        console.log(result);
      } else {
        alert(`❌ Error: ${result.detail}`);
        console.error(result);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("❌ Error al conectar con el servidor.");
    }
  }
};


  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo" />
          <h1>Registrar Colaborador</h1>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@tudominio.com"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
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

          <div className="form-group">
            <label>Permisos</label>
            <div className="permission-tags">
              {allPermissions.map((perm, idx) => (
                <div
                  key={idx}
                  className={`permission-tag ${permissions.includes(perm) ? "selected" : ""}`}
                  onClick={() => handlePermissionChange(perm)}
                >
                  {perm}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;


