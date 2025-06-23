import { useState, useRef } from 'react';
import './Homepage.css';
import Desktop from '../assets/images/background-desktop.png';
import Lines from '../assets/images/pattern-lines.svg';
import Logo from '../assets/images/logo-full.svg';
import Upload from '../assets/images/icon-upload.svg';
import Top from '../assets/images/pattern-squiggly-line-top.svg';
import Circle from '../assets/images/pattern-squiggly-line-bottom-desktop.svg';
import Mid from '../assets/images/pattern-circle.svg';
import Icon from '../assets/images/icon-info.svg';
import Info from '../assets/images/icon-info.svg';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function Homepage() {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [github, setGithub] = useState('');

  const max_size = 512000;
  const allowed_types = ['image/jpeg', 'image/jpg', 'image/png'];
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setFile(null);

    if (!selectedFile) return;

    if (!allowed_types.includes(selectedFile.type)) {
      setError(<> <img src={Icon} alt="icon" /> Invalid file type. Please use JPG or PNG. </>);
      return;
    }

    if (selectedFile.size > max_size) {
      setError(<> <img src={Icon} alt="icon" /> File is too large. Max size is 500KB. </>);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result); 
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (isLoading) return;

    if (!fullName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!github.trim()) {
      alert('Please enter your GitHub username');
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!file) {
      alert('Please select a valid avatar photo to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      navigate('/ticket', {
        state: {
          name: fullName,
          email: email,
          github: github,
          avatar: file
        }
      });
    }, 2000);
  };

  return (
    <>
      <div id="pattern">
        <div id="logo-container"><img id="logo" src={Logo} alt="Logo" /></div>
        <img id="background" src={Desktop} alt="background" />
        <img className="lines" src={Lines} alt="lines" />
        <img className="top" src={Top} alt="top" />

        <div id="text">
          <h1>Your Journey to Coding Conf <br /> 2025 Starts Here!</h1>
        </div>

        <div id="text-box">
          <p id="textt">Secure your spot at next year's biggest coding conference.</p>
          <p id="upload">Upload Avatar</p>
        </div>

        <div id="drag-wrapper" onClick={handleDivClick} style={{ cursor: 'pointer' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            style={{ display: 'none' }}
          />
          <img id="drag" src={Upload} alt="Upload" />
          <p id="drop">{file ? "Avatar selected" : "Drag and drop or click to upload"}</p>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div id='info' style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: "-1%" }}>
          <img src={Info} alt='info' style={{ marginTop: "-1%" }} />
          <p style={{ margin: -3, marginTop: "-1.2%" }}>
            Upload your photo (JPG or PNG, max size: 500KB)
          </p>
        </div>

        <div id='mid-circle'>
          <img id='mid' src={Mid} alt='mid' />
        </div>

        <div id="text">
          <p style={{ marginLeft: '-32.5%', marginTop: "0.4%" }}>Full name</p>
          <input className="box" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <p id='email' style={{ marginLeft: '-29.5%' }}>Email Address</p>
          <input
            className="box"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(isValidEmail(e.target.value) ? '' : 'Invalid email address');
            }}
            placeholder='example@email.com'
          />
          {emailError && <p className="email-error-text">{emailError}</p>}

          <p style={{ marginLeft: '-28.5%' }}>GitHub Username</p>
          <input className="box" type="text" placeholder='@yourusername' value={github} onChange={(e) => setGithub(e.target.value)} />

          <div className="button-container">
            {isLoading ? <Loader /> : <button className="generate" onClick={handleUpload}>Generate My Ticket</button>}
          </div>
        </div>
      </div>

      <div className="circle-boxx">
        <img className="circle-patternn" src={Circle} alt="circle" />
      </div>
    </>
  );
}

export default Homepage;
