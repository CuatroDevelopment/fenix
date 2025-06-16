import React, { useState } from 'react';
import "../../styles/Login.css";
import logo from "@/assets/react.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");

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

  /**
 * handleRecuperarPassword
 *
 * Envía una solicitud al backend para iniciar el proceso de recuperación de contraseña.
 * Esta función se ejecuta cuando el usuario hace clic en "¿Olvidaste tu contraseña?".
 *
 * Requiere que el usuario haya ingresado un correo electrónico válido.
 *
 * @returns {void}
 */
  const handleRecuperarPassword = async () => {
    setRecoveryMessage("");
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Ingresa tu correo para recuperar tu contraseña" }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:8001/usuarios/recuperar", {
        email,
      });
      setRecoveryMessage(response.data.mensaje);
    } catch (err) {
      console.error("Error al recuperar contraseña:", err);
      const error = err.response?.data?.detail || "Ocurrió un error al enviar el correo.";
      setRecoveryMessage(error);
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
            <div className="password-container"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden"
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem"
                }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" className="submit-button">
            Ingresar
          </button>

          <button
            type="button"
            className="recovery-button"
            onClick={handleRecuperarPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>

          {recoveryMessage && (
            <div className="recovery-message">{recoveryMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;





