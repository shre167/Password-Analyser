import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import ResultCard from './ResultCard/ResultCard';
import { 
  FaSun, 
  FaMoon, 
  FaQuestionCircle, 
  FaGlobeAmericas,
  FaShieldAlt 
} from 'react-icons/fa';


const SecurePass = () => {
  
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [securityLevel, setSecurityLevel] = useState(3);
  const [passwordLength, setPasswordLength] = useState(16);
  const [strength, setStrength] = useState(0);
  const [passwordType, setPasswordType] = useState('random');
  const [charTypes, setCharTypes] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [exclude1100, setExclude1100] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    let score = 0;
    const requirements = [
      password.length >= 12,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%]/.test(password)
    ];

    score = requirements.filter(Boolean).length;
    setStrength(score);
  }, [password]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleCheckNow = () => resultsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleGenerate = () => {
    let chars = '';
    let result = '';
    
    if (passwordType === 'pin') {
      chars = '0123456789';
    } 
    else if (passwordType === 'memorable') {
      const adjectives = ['happy', 'brave', 'calm', 'gentle', 'jolly', 'kind'];
      const nouns = ['apple', 'banana', 'carrot', 'dragon', 'elephant', 'flower'];
      const numbers = Math.floor(Math.random() * 90) + 10;
      const specials = ['!', '@', '#', '$', '%'];
      
      const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
      
      result = `${randomAdj}${randomSpecial}${randomNoun}${numbers}`;
      setGeneratedPassword(result);
      return;
    }
    else {
      if (charTypes.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (charTypes.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (charTypes.numbers) chars += '0123456789';
      if (charTypes.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      if (!chars) {
        setGeneratedPassword('Select at least one character type');
        return;
      }

      for (let i = 0; i < passwordLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      if (exclude1100) {
        while (result.includes('1100')) {
          result = result.replace('1100', 
            chars.charAt(Math.floor(Math.random() * chars.length)) +
            chars.charAt(Math.floor(Math.random() * chars.length)) +
            chars.charAt(Math.floor(Math.random() * chars.length)) +
            chars.charAt(Math.floor(Math.random() * chars.length))
          );
        }
      }
    }
    setGeneratedPassword(result);
  };

  const handleCopy = () => navigator.clipboard.writeText(generatedPassword);

  const getStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return labels[strength] || 'Very Weak';
  };

  const getStrengthColor = () => {
    const colors = ['#ff5252', '#ff7043', '#ffca28', '#66bb6a', '#2e7d32'];
    return colors[strength] || '#ff5252';
  };

  const getSliderColor = (level) => {
    const colors = ['#ff7043', '#ffca28', '#66bb6a', '#2e7d32'];
    return colors[level - 1] || '#ff7043';
  };

  const checkRequirement = (condition) => condition ? '✓' : '✗';

  const selectPasswordType = (type) => {
    setPasswordType(type);
  };

  const toggleCharType = (type) => {
    setCharTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleExclude1100 = () => {
    setExclude1100(!exclude1100);
  };

  const handleLengthChange = (e) => {
    const value = parseInt(e.target.value) || 8;
    setPasswordLength(Math.min(32, Math.max(8, value)));
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="bg-bubbles">
        {[...Array(10)].map((_, i) => <div key={i} className="bubble"></div>)}
      </div>

      


      <header className="header">
  <div className="logo">SecurePass</div>
  <nav className="nav-links">
    {/* Dark Mode Toggle - Blue Sun */}
    <button className="icon-button" onClick={toggleDarkMode}>
      {darkMode ? (
        <FaSun className="icon blue-icon" />
      ) : (
        <FaMoon className="icon" />
      )}
    </button>

    {/* FAQ Icon */}
    <button className="icon-button">
      <FaQuestionCircle className="icon" />
    </button>

    {/* Language Icon */}
    <button className="icon-button">
      <FaGlobeAmericas className="icon" />
    </button>

    
    <img 
      src="logo.png" 
      alt="Barclays Logo" 
      className="barclays-logo"
      style={{ width: '100px', height: 'auto' }}
    />
  </nav>
</header>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="title">SecurePass</h1>
          <h2 className="subtitle">Advanced Password Analysis</h2>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            placeholder="Enter your password"
          />
          
          <button onClick={handleCheckNow} className="check-now-button">
            Check Now
          </button>
        </div>

        <div ref={resultsRef} className="password-cards-container">
          <div className="password-analyzer-card">
            <h2>Password Analyzer</h2>
            
            <div className="password-section">
              <h3>Password</h3>
              <p className="password-value">{password || 'Not entered'}</p>
              <p className="storage-note">No storage.</p>
            </div>
            
            <div className="strong-section">
              <h3>Password Requirements:</h3>
              <ul className="criteria-list">
                <li className={password.length >= 12 ? 'met' : ''}>
                  {checkRequirement(password.length >= 12)} Minimum 12 characters
                </li>
                <li className={/[A-Z]/.test(password) ? 'met' : ''}>
                  {checkRequirement(/[A-Z]/.test(password))} Uppercase letter (A-Z)
                </li>
                <li className={/[a-z]/.test(password) ? 'met' : ''}>
                  {checkRequirement(/[a-z]/.test(password))} Lowercase letter (a-z)
                </li>
                <li className={/[0-9]/.test(password) ? 'met' : ''}>
                  {checkRequirement(/[0-9]/.test(password))} Number (0-9)
                </li>
                <li className={/[!@#$%]/.test(password) ? 'met' : ''}>
                  {checkRequirement(/[!@#$%]/.test(password))} Special character (!@#$%)
                </li>
              </ul>
            </div>
            
            <div className="analyze-section">
              <h3>Password Strength</h3>
              <div className="strength-meter">
                <div 
                  className="strength-bar"
                  style={{
                    width: `${(strength / 5) * 100}%`,
                    background: `linear-gradient(to right, #ff5252, #ff7043, #ffca28, #66bb6a, #2e7d32)`,
                    opacity: strength > 0 ? 1 : 0.3
                  }}
                ></div>
              </div>
              <div className="strength-info">
                <span className="strength-label">Strength:</span>
                <span 
                  className="strength-badge"
                  style={{ 
                    backgroundColor: getStrengthColor(),
                    boxShadow: `0 0 8px ${getStrengthColor()}`
                  }}
                >
                  {getStrengthLabel()}
                </span>
              </div>
            </div>
          </div>

          <div className="password-generator-card">
            <h2>Password Generator</h2>
            <div className="password-actions">
  <button className="save-to-vault-btn" style={{
    padding: "4px 8px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    lineHeight: 1
  }}>
    <svg 
      className="vault-icon" 
      viewBox="0 0 24 24" 
      width="14"  // Reduced from 20
      height="14" // Added height to match
      style={{
        flexShrink: 0  // Prevents icon from shrinking
      }}
    >
      <path fill="currentColor" d="M12 3L4 9v12h16V9l-8-6zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
    Save to Vault
  </button>
</div>
            <div className="security-section">
              <h3>Security</h3>
              <div className="security-slider-container">
                <div className="security-labels">
                  <span 
                    className={`security-label ${securityLevel === 1 ? 'active' : ''}`}
                    onClick={() => setSecurityLevel(1)}
                  >
                    Basic
                  </span>
                  <span 
                    className={`security-label ${securityLevel === 2 ? 'active' : ''}`}
                    onClick={() => setSecurityLevel(2)}
                  >
                    Good
                  </span>
                  <span 
                    className={`security-label ${securityLevel === 3 ? 'active' : ''}`}
                    onClick={() => setSecurityLevel(3)}
                  >
                    Strong
                  </span>
                  <span 
                    className={`security-label ${securityLevel === 4 ? 'active' : ''}`}
                    onClick={() => setSecurityLevel(4)}
                  >
                    Very Strong
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={securityLevel}
                  onChange={(e) => setSecurityLevel(parseInt(e.target.value))}
                  className="security-slider"
                  step="1"
                />
                <div className="slider-track">
                  <div 
                    className="slider-progress"
                    style={{ 
                      width: `${(securityLevel - 1) * 33.33}%`,
                      backgroundColor: getSliderColor(securityLevel)
                    }}
                  ></div>
                  {[1, 2, 3, 4].map((pos) => (
                    <div 
                      key={pos}
                      className={`slider-thumb ${securityLevel >= pos ? 'active' : ''}`}
                      style={{ left: `${(pos - 1) * 33.33}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="stronger-note">Stronger=Harder</p>
            </div>
            
            <div className="length-type-row">
              <div className="length-section">
                <div className="length-header">
                  <span className="length-title">Length</span>
                  <input
                    type="number"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={handleLengthChange}
                    className="length-input"
                  />
                </div>
                <div className="min-length">Min: 12</div>
              </div>
              
              <div className="type-section">
                <div className="type-header">
                  <span className="type-title">Type</span>
                </div>
                <div className="type-options-grid">
                  <div 
                    className={`type-option ${passwordType === 'random' ? 'active' : ''}`}
                    onClick={() => selectPasswordType('random')}
                  >
                    Random
                  </div>
                  <div 
                    className={`type-option ${passwordType === 'memorable' ? 'active' : ''}`}
                    onClick={() => selectPasswordType('memorable')}
                  >
                    Memorable
                  </div>
                  <div 
                    className={`type-option ${passwordType === 'pin' ? 'active' : ''}`}
                    onClick={() => selectPasswordType('pin')}
                  >
                    PIN
                  </div>
                </div>
              </div>
            </div>

            <div className="char-types-section">
              <div className="char-types-grid">
                <label className="char-type-checkbox">
                  <input
                    type="checkbox"
                    checked={charTypes.uppercase}
                    onChange={() => toggleCharType('uppercase')}
                  />
                  <span className="checkmark"></span>
                  A-Z
                </label>
                <label className="char-type-checkbox">
                  <input
                    type="checkbox"
                    checked={charTypes.lowercase}
                    onChange={() => toggleCharType('lowercase')}
                  />
                  <span className="checkmark"></span>
                  a-z
                </label>
                <label className="char-type-checkbox">
                  <input
                    type="checkbox"
                    checked={charTypes.numbers}
                    onChange={() => toggleCharType('numbers')}
                  />
                  <span className="checkmark"></span>
                  0-9
                </label>
                <label className="char-type-checkbox">
                  <input
                    type="checkbox"
                    checked={charTypes.symbols}
                    onChange={() => toggleCharType('symbols')}
                  />
                  <span className="checkmark"></span>
                  !@#$%
                </label>
              </div>
              <label className="exclude-checkbox">
                <input
                  type="checkbox"
                  checked={exclude1100}
                  onChange={toggleExclude1100}
                />
                <span className="checkmark"></span>
                Exclude "1100"
              </label>
            </div>
            
            <div className="generator-actions">
              <button className="generate-btn" onClick={handleGenerate}>Generate</button>
              <div className="generated-section">
                <div className="generated-password">{generatedPassword}</div>
                <button className="copy-btn" onClick={handleCopy}>Copy</button>
              </div>
            </div>
          </div>
        </div>

        <div className="results-grid">
        <ResultCard password={password} strength={getStrengthLabel()} />

</div>
      </main>
    </div>
    
  );
};

export default SecurePass;