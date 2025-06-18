import React from 'react';
import './ResultCard.css';
import '../Vault/Vault.css';

function ResultPage() {
  return (
    <div className="results-page-container">
      <ResultCard />
      <Vault />
    </div>
  );
}

function ResultCard() {
  return (
    <div className="result-card">
      <div className="card-header results-header">
        <h2 className="card-title">Results</h2>
        <button className="save-button">Save</button>
      </div>
      <div className="card-body">
        <div className="lock-icon">🔒</div>
        <p className="analyze-text">Analyze</p>
        <p className="secure-text">Secure</p>
      </div>
    </div>
  );
}

function Vault() {
  const handleUpgrade = () => {
    console.log('Upgrade clicked');
    // Add upgrade functionality here
  };

  return (
    <div className="result-card vault-card">
      <div className="card-header vault-header">
        <h2 className="card-title">Vault</h2>
        <button className="upgrade-button" onClick={handleUpgrade}>
          Pro: Secure storage. <span className="upgrade-text">Upgrade</span>
        </button>
      </div>

      <div className="vault-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div className="vault-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
  <ul className="vault-features" style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>

          <li>Unlimited Auto-fill</li>
          <li>Health checks</li>
          <li>Breach monitoring</li>
          <li>Sync</li>
        </ul>
        <button className="pro-badge">
  <svg className="crown-icon" viewBox="0 0 24 24" width="16" height="16">
    <path fill="currentColor" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
  </svg>
  <span>Pro</span>
</button>
      </div>

      <div className="vault-footer">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Support</span>
        <span>© 2025Barclays</span>
        <span>Made for Hack-O-Hire</span>
      </div>
    </div>
  );
}

export default ResultPage;