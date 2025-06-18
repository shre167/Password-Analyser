import React from 'react';
import './Vault.css';

const Vault = () => {
  return (
    <div className="vault-container">
      <div className="vault-card">
        {/* Header */}
        <div className="vault-header">
          <h1>Vault</h1>
          <div className="upgrade-toggle">
            <input type="checkbox" id="pro-toggle" />
            <label htmlFor="pro-toggle">
              Pro: Secure storage. <strong>Upgrade</strong>
            </label>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Benefits Table */}
        <div className="vault-benefits">
          <h2>Vault Benefits</h2>
          <table className="benefits-table">
            <tbody>
              <tr>
                <td><strong>Unlimited</strong></td>
              </tr>
              <tr>
                <td>Auto-fill</td>
              </tr>
              <tr>
                <td>Health checks</td>
              </tr>
              <tr>
                <td>Breach monitoring</td>
              </tr>
              <tr>
                <td>Sync</td>
              </tr>
            </tbody>
          </table>
          <div className="pro-badge">[W Pro]</div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Footer */}
        <div className="vault-footer">
          <div className="footer-links">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
          <div className="copyright">© 2024 Barclays</div>
        </div>
      </div>
    </div>
  );
};

export default Vault;