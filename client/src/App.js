import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';
import Login from './Login';
import Signup from './Signup';

// Landing page component
function LandingPage() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();
  const logo = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container'>
      <img src={logo} alt="banner"/>
      <div className='wrapper'>
        <h1>Simple file sharing!!!!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
