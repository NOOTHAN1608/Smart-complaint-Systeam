import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/06/06/09/04/bridge-6314795_1280.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    width: '400px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    backgroundColor: '#1c1c1c',
    color: '#fff',
  },
  button: {
    backgroundColor: '#e63946',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
  togglePassword: {
    cursor: 'pointer',
  },
  link: {
    color: '#e63946',
    textDecoration: 'underline',
  }
};
function TechnicianLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    technicianId:'',
    email: '',
    password: '',
  });
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {technicianId, email, password } = data;
    if (email && password) {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/TechnicianLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();
      toast(dataRes.message);
      if (dataRes.alert) {
        navigate('/technician/technicianDashboard');
      }
    } else {
      alert('Please enter the required fields');
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 className="text-center text-white">Technician Login</h2>
        <form onSubmit={handleSubmit}>
       
        <input
            type="technicianId"
            name="technicianId"
            placeholder="technicianId"
            style={styles.input}
            value={data.technicianId}
            onChange={handleOnChange}
            required
          />
           
            <select
              id="type"
              name="type"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value={data.type}
              onChange={handleOnChange}
              required
            >
              <option value="">Technician type</option>
              <option value="Electrical Problem">Electrical Service</option>
              <option value="Water Problem">Waterpipe Service</option>
              <option value="Drainage Problem">Drainage Service</option>
              <option value="Road Problems">Road Damage Service</option>
              <option value="Others">Others...</option>
            </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={styles.input}
            value={data.email}
            onChange={handleOnChange}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              style={styles.input}
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <span style={styles.togglePassword} onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p className="text-left text-sm mt-2 text-white">
          Don't have an account?{" "}
          <Link to="/TechnicianSignUp" style={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default TechnicianLogin;