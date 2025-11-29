'use client';

import { useState } from 'react';

// Simulated proof data for demo
const DEMO_RESULTS = {
  '0x742d35Cc6634C0532925a3b844Bc9e7595f8a2': {
    exposures: [
      { asset: 'ETH', amount: '165.5', percentage: 79.2 },
      { asset: 'USDC', amount: '88,420', percentage: 20.8 }
    ],
    nestingDepth: 7,
    protocols: ['Aave V3', 'Pendle Finance', 'EigenLayer', 'Kelp DAO'],
    totalValue: '$426,847'
  }
};

// Generate random proof-like hex string
function generateProofHex() {
  let hex = '0x';
  for (let i = 0; i < 624; i++) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  return hex;
}

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const steps = [
    'Connecting to Cysic prover network...',
    'Scanning DeFi positions across 8 chains...',
    'Unwrapping nested protocol layers...',
    'Generating Halo2 arithmetic circuit...',
    'Applying Nova recursive folding...',
    'Compressing proof to 312 bytes...'
  ];

  const handleProve = async () => {
    if (!wallet) return;
    
    setLoading(true);
    setResult(null);
    setStep(0);

    // Simulate proving steps
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
    }

    // Use demo data or generate random
    const demoData = DEMO_RESULTS[wallet] || {
      exposures: [
        { asset: 'ETH', amount: (Math.random() * 100).toFixed(2), percentage: 65 + Math.random() * 20 },
        { asset: 'USDC', amount: Math.floor(Math.random() * 50000).toLocaleString(), percentage: 15 + Math.random() * 15 }
      ],
      nestingDepth: Math.floor(3 + Math.random() * 5),
      protocols: ['Aave V3', 'Lido', 'Curve', 'Pendle'].slice(0, 2 + Math.floor(Math.random() * 3)),
      totalValue: '$' + Math.floor(50000 + Math.random() * 400000).toLocaleString()
    };

    setResult({
      ...demoData,
      proofHex: generateProofHex(),
      provingTime: Math.floor(120 + Math.random() * 60),
      timestamp: new Date().toISOString()
    });
    
    setLoading(false);
  };

  return (
    <main className="main">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="VonBit" className="logo" />
          </div>
          <h1 className="title">vBitZK</h1>
          <p className="subtitle">Zero-Knowledge Beneficial Ownership Proofs</p>
          <p className="tagline">Prove who controls what in DeFi — without revealing anything else</p>
          <div className="badges">
            <span className="badge">312 bytes</span>
            <span className="badge">&lt;180ms</span>
            <span className="badge">$0.001</span>
            <span className="badge">62k gas</span>
          </div>
        </header>

        {/* Input Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-icon">🔐</span>
            <span>Generate Beneficial Ownership Proof</span>
          </div>
          
          <div className="input-group">
            <label className="label">Wallet Address</label>
            <input
              type="text"
              placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f8a2"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="label">Network</label>
            <select className="input select">
              <option>Ethereum Mainnet</option>
              <option>Base</option>
              <option>Arbitrum</option>
              <option>Optimism</option>
            </select>
          </div>

          <button
            onClick={handleProve}
            disabled={loading || !wallet}
            className={`button ${loading || !wallet ? 'disabled' : ''}`}
          >
            {loading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Generating Proof...
              </span>
            ) : (
              'Prove Beneficial Ownership →'
            )}
          </button>
        </div>

        {/* Loading Steps */}
        {loading && (
          <div className="card steps-card">
            <div className="steps">
              {steps.map((s, i) => (
                <div key={i} className={`step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                  <span className="step-icon">
                    {i < step ? '✓' : i === step ? <span className="pulse">●</span> : '○'}
                  </span>
                  <span className="step-text">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="card results-card">
            <div className="results-header">
              <span className="success-icon">✓</span>
              <div>
                <h2 className="results-title">Proof Generated Successfully</h2>
                <p className="results-subtitle">Verified beneficial ownership across {result.nestingDepth} protocol layers</p>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{result.provingTime}<span className="stat-unit">ms</span></div>
                <div className="stat-label">Proving Time</div>
              </div>
              <div className="stat">
                <div className="stat-value">312<span className="stat-unit">bytes</span></div>
                <div className="stat-label">Proof Size</div>
              </div>
              <div className="stat">
                <div className="stat-value">{result.nestingDepth}</div>
                <div className="stat-label">Layers Deep</div>
              </div>
              <div className="stat">
                <div className="stat-value">{result.totalValue}</div>
                <div className="stat-label">Total Value</div>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">Terminal Asset Exposure</h3>
              <div className="exposures">
                {result.exposures.map((exp, i) => (
                  <div key={i} className="exposure">
                    <div className="exposure-header">
                      <div className="exposure-asset">
                        <span className="asset-icon">{exp.asset === 'ETH' ? '◆' : '$'}</span>
                        <span className="asset-name">{exp.asset}</span>
                      </div>
                      <span className="exposure-amount">{exp.amount}</span>
                    </div>
                    <div className="bar-container">
                      <div className="bar-bg">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${exp.percentage}%` }}
                        />
                      </div>
                      <span className="bar-percent">{exp.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">Protocol Path</h3>
              <div className="protocol-path">
                <span className="protocol-item wallet">
                  <span className="protocol-icon">👛</span>
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </span>
                {result.protocols.map((p, i) => (
                  <span key={i} className="protocol-item">
                    <span className="protocol-arrow">→</span>
                    <span className="protocol-name">{p}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">ZK Proof Data</h3>
              <div className="proof-box">
                <code>{result.proofHex.slice(0, 80)}...</code>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result.proofHex)}>
                  Copy
                </button>
              </div>
            </div>

            <div className="actions">
              <button className="action-btn primary">
                <span>⛓</span> Verify On-Chain
              </button>
              <button className="action-btn">
                <span>📄</span> Download SAR
              </button>
              <button className="action-btn">
                <span>📋</span> Export JSON
              </button>
            </div>
          </div>
        )}

        {/* Info Cards */}
        {!loading && !result && (
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🔗</div>
              <h3>32-Layer Deep</h3>
              <p>Unwraps positions through Aave → Pendle → EigenLayer → Kelp and beyond</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔒</div>
              <h3>Zero Knowledge</h3>
              <p>Proves ownership without revealing balances, transactions, or PII</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>On-Chain Verifiable</h3>
              <p>62,000 gas verification on Ethereum, Base, Arbitrum, and 5 more chains</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="https://github.com/VonBit-Labs/vBitZK" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="dot">•</span>
            <a href="https://vonbit.co/spec/v1.1.pdf" target="_blank" rel="noopener noreferrer">Protocol Spec</a>
            <span className="dot">•</span>
            <a href="https://twitter.com/VonBit_ai" target="_blank" rel="noopener noreferrer">@VonBit_ai</a>
          </div>
          <p className="copyright">© 2025 Vonartis Foundation. The compliance primitive for the $100T tokenized economy.</p>
        </footer>
      </div>

      <style jsx>{`
        .main {
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .container {
          max-width: 640px;
          width: 100%;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-container {
          margin-bottom: 16px;
        }

        .logo {
          width: 80px;
          height: 80px;
          border-radius: 20px;
        }

        .title {
          font-size: 56px;
          font-weight: 800;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #fff 0%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 20px;
          color: #888;
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .tagline {
          font-size: 14px;
          color: #666;
          margin: 0 0 20px 0;
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #00ff88;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
        }

        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }

        .card-icon {
          font-size: 20px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: #888;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input:focus {
          border-color: rgba(0, 255, 136, 0.5);
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }

        .input::placeholder {
          color: #555;
        }

        .select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }

        .button {
          width: 100%;
          padding: 18px;
          font-size: 16px;
          font-weight: 700;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border: none;
          border-radius: 12px;
          color: #000;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 255, 136, 0.3);
        }

        .button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .steps-card {
          background: rgba(0, 255, 136, 0.03);
          border-color: rgba(0, 255, 136, 0.15);
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #555;
          transition: color 0.3s;
        }

        .step.done {
          color: #00ff88;
        }

        .step.active {
          color: #fff;
        }

        .step-icon {
          width: 20px;
          text-align: center;
          font-size: 12px;
        }

        .pulse {
          animation: pulse 1s ease infinite;
          color: #00ff88;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .results-card {
          border-color: rgba(0, 255, 136, 0.3);
        }

        .results-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .success-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #000;
          flex-shrink: 0;
        }

        .results-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #fff;
        }

        .results-subtitle {
          font-size: 14px;
          color: #888;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat {
          text-align: center;
          padding: 16px 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
        }

        .stat-unit {
          font-size: 12px;
          font-weight: 500;
          color: #888;
          margin-left: 2px;
        }

        .stat-label {
          font-size: 11px;
          color: #666;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 12px;
          color: #888;
          margin: 0 0 14px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .exposures {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .exposure {
          background: rgba(0, 0, 0, 0.2);
          padding: 16px;
          border-radius: 12px;
        }

        .exposure-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .exposure-asset {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .asset-icon {
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .asset-name {
          font-weight: 700;
          font-size: 16px;
        }

        .exposure-amount {
          color: #888;
          font-size: 14px;
        }

        .bar-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bar-bg {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff88 0%, #00cc6a 100%);
          border-radius: 4px;
          transition: width 0.8s ease;
        }

        .bar-percent {
          font-size: 14px;
          font-weight: 700;
          color: #00ff88;
          min-width: 50px;
          text-align: right;
        }

        .protocol-path {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 13px;
        }

        .protocol-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .protocol-item.wallet {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 8px;
        }

        .protocol-icon {
          font-size: 14px;
        }

        .protocol-arrow {
          color: #00ff88;
          font-weight: bold;
        }

        .protocol-name {
          background: rgba(0, 255, 136, 0.1);
          padding: 6px 12px;
          border-radius: 8px;
          color: #00ff88;
        }

        .proof-box {
          background: rgba(0, 0, 0, 0.3);
          padding: 16px;
          border-radius: 12px;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 12px;
          color: #666;
          word-break: break-all;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .proof-box code {
          flex: 1;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: #888;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          flex: 1;
          min-width: 140px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, border-color 0.2s;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .action-btn.primary {
          background: rgba(0, 255, 136, 0.15);
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
        }

        .action-btn.primary:hover {
          background: rgba(0, 255, 136, 0.25);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
        }

        .info-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .info-card h3 {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #fff;
        }

        .info-card p {
          font-size: 13px;
          color: #888;
          margin: 0;
          line-height: 1.5;
        }

        .footer {
          text-align: center;
          padding: 32px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-links {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: #888;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #00ff88;
        }

        .dot {
          margin: 0 16px;
          color: #444;
        }

        .copyright {
          font-size: 12px;
          color: #555;
          margin: 0;
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 42px;
          }
        }
      `}</style>
    </main>
  );
}
