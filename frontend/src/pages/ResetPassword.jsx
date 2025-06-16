import React, { useState } from 'react';
import "../../styles/ResetPass.css";
import logo from "@/assets/react.svg";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!password.trim()) newErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'La confirmación es obligatoria';

    if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      newErrors.password = 'La contraseña debe incluir al menos un carácter especial (por ejemplo: ! @ # $ % ^ & * ( ) , . ? " : { } | < >)';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Nueva contraseña registrada:', password);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Restablecer Contraseña</h1>
        </div>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-button">
            Guardar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;