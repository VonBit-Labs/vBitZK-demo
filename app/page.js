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

    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
    }

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
      {/* Background effects */}
      <div className="bg-gradient"></div>
      <div className="bg-grid"></div>
      
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo-glow">
            <img src="/logo.png" alt="VonBit" className="logo-img" />
          </div>
          
          <h1 className="title">
            <span className="title-v">v</span>BitZK
          </h1>
          <p className="subtitle">Zero-Knowledge Beneficial Ownership Proofs</p>
          <p className="tagline">Prove who controls what in DeFi — without revealing anything else</p>
          
          <div className="badges">
            <div className="badge">
              <span className="badge-value">312</span>
              <span className="badge-unit">bytes</span>
            </div>
            <div className="badge">
              <span className="badge-value">&lt;180</span>
              <span className="badge-unit">ms</span>
            </div>
            <div className="badge">
              <span className="badge-value">$0.001</span>
              <span className="badge-unit">per proof</span>
            </div>
            <div className="badge">
              <span className="badge-value">62k</span>
              <span className="badge-unit">gas</span>
            </div>
          </div>
        </header>

        {/* Main Card */}
        <div className="card main-card">
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
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
              <select className="input select" defaultValue="ethereum">
                <option value="ethereum">Ethereum Mainnet</option>
                <option value="base">Base</option>
                <option value="arbitrum">Arbitrum</option>
                <option value="optimism">Optimism</option>
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
                <>
                  Prove Beneficial Ownership
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Steps */}
        {loading && (
          <div className="card steps-card">
            <div className="steps">
              {steps.map((s, i) => (
                <div key={i} className={`step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                  <span className="step-indicator">
                    {i < step ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ) : i === step ? (
                      <span className="step-pulse"></span>
                    ) : (
                      <span className="step-dot"></span>
                    )}
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
              <div className="success-badge">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <div>
                <h2 className="results-title">Proof Generated</h2>
                <p className="results-subtitle">Verified ownership across {result.nestingDepth} protocol layers</p>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{result.provingTime}<span className="stat-unit">ms</span></div>
                <div className="stat-label">Proving Time</div>
              </div>
              <div className="stat">
                <div className="stat-value">312<span className="stat-unit">b</span></div>
                <div className="stat-label">Proof Size</div>
              </div>
              <div className="stat">
                <div className="stat-value">{result.nestingDepth}</div>
                <div className="stat-label">Layers</div>
              </div>
              <div className="stat highlight">
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
                        <div className={`asset-icon ${exp.asset.toLowerCase()}`}>
                          {exp.asset === 'ETH' ? 'Ξ' : '$'}
                        </div>
                        <span className="asset-name">{exp.asset}</span>
                      </div>
                      <span className="exposure-amount">{exp.amount}</span>
                    </div>
                    <div className="bar-container">
                      <div className="bar-bg">
                        <div className="bar-fill" style={{ width: `${exp.percentage}%` }}></div>
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
                <div className="protocol-item wallet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/>
                  </svg>
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </div>
                {result.protocols.map((p, i) => (
                  <div key={i} className="protocol-step">
                    <div className="protocol-arrow">→</div>
                    <div className="protocol-name">{p}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">ZK Proof</h3>
              <div className="proof-box">
                <code>{result.proofHex.slice(0, 66)}...</code>
                <button className="copy-btn" onClick={() => {navigator.clipboard.writeText(result.proofHex); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="actions">
              <button className="action-btn primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Verify On-Chain
              </button>
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Download SAR
              </button>
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export JSON
              </button>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        {!loading && !result && (
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#feat1)" strokeWidth="1.5">
                  <defs>
                    <linearGradient id="feat1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88"/>
                      <stop offset="100%" stopColor="#00aa55"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>32-Layer Deep</h3>
              <p>Unwraps positions through Aave, Pendle, EigenLayer, Kelp and beyond</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#feat2)" strokeWidth="1.5">
                  <defs>
                    <linearGradient id="feat2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88"/>
                      <stop offset="100%" stopColor="#00aa55"/>
                    </linearGradient>
                  </defs>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3>Zero Knowledge</h3>
              <p>Proves ownership without revealing balances, transactions, or PII</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#feat3)" strokeWidth="1.5">
                  <defs>
                    <linearGradient id="feat3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88"/>
                      <stop offset="100%" stopColor="#00aa55"/>
                    </linearGradient>
                  </defs>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>On-Chain Verifiable</h3>
              <p>62,000 gas verification on Ethereum, Base, Arbitrum + 5 more</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="https://github.com/VonBit-Labs/vBitZK" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://vonbit.co/spec/v1.1.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Protocol Spec
            </a>
            <a href="https://twitter.com/VonBit_ai" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @VonBit_ai
            </a>
          </div>
          <p className="copyright">© 2025 Vonartis Foundation · The compliance primitive for the $100T tokenized economy</p>
        </footer>
      </div>

      <style jsx>{`
        .main {
          min-height: 100vh;
          padding: 50px 20px;
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at top, rgba(0, 255, 136, 0.08) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, rgba(0, 170, 85, 0.05) 0%, transparent 50%),
                      linear-gradient(180deg, #0a0a0f 0%, #0d0d14 100%);
          z-index: -2;
        }

        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: -1;
        }

        .container {
          max-width: 620px;
          margin: 0 auto;
          position: relative;
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
        }

        .logo-glow {
          display: inline-block;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.4));
        }

        .logo-glow img {
          width: 80px;
          height: 80px;
          border-radius: 20px;
        }

        .title {
          font-size: 64px;
          font-weight: 800;
          margin: 0 0 12px 0;
          letter-spacing: -2px;
          color: #fff;
        }

        .title-v {
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 20px;
          color: rgba(255,255,255,0.7);
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .tagline {
          font-size: 15px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 28px 0;
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .badge {
          background: rgba(0, 255, 136, 0.08);
          border: 1px solid rgba(0, 255, 136, 0.2);
          padding: 10px 18px;
          border-radius: 30px;
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .badge-value {
          color: #00ff88;
          font-size: 16px;
          font-weight: 700;
        }

        .badge-unit {
          color: rgba(0, 255, 136, 0.6);
          font-size: 12px;
          font-weight: 500;
        }

        .card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .main-card {
          border-color: rgba(0, 255, 136, 0.15);
        }

        .card-glow {
          position: absolute;
          top: -1px;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent);
        }

        .card-content {
          padding: 32px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.05) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00ff88;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .input {
          width: 100%;
          padding: 18px 20px;
          font-size: 15px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: #fff;
          outline: none;
          transition: all 0.2s ease;
        }

        .input:focus {
          border-color: rgba(0, 255, 136, 0.5);
          box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.1);
        }

        .input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2300ff88' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
        }

        .button {
          width: 100%;
          padding: 20px;
          font-size: 16px;
          font-weight: 700;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border: none;
          border-radius: 14px;
          color: #000;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
        }

        .button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(0, 255, 136, 0.4);
        }

        .button.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .button-loading {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid transparent;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .steps-card {
          background: rgba(0, 255, 136, 0.02);
          border-color: rgba(0, 255, 136, 0.1);
          padding: 28px 32px;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }

        .step.done {
          color: #00ff88;
        }

        .step.active {
          color: #fff;
        }

        .step-indicator {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-pulse {
          width: 10px;
          height: 10px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 1.2s ease infinite;
        }

        .step-dot {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .results-card {
          border-color: rgba(0, 255, 136, 0.25);
          padding: 32px;
        }

        .results-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .success-badge {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
        }

        .results-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #fff;
        }

        .results-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }

        .stat {
          text-align: center;
          padding: 18px 12px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .stat.highlight {
          background: rgba(0, 255, 136, 0.08);
          border-color: rgba(0, 255, 136, 0.2);
        }

        .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
        }

        .stat.highlight .stat-value {
          color: #00ff88;
        }

        .stat-unit {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          margin-left: 2px;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section {
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        .exposures {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .exposure {
          background: rgba(0, 0, 0, 0.25);
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .exposure-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .exposure-asset {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .asset-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
        }

        .asset-icon.eth {
          background: linear-gradient(135deg, #627eea 0%, #3c4a9e 100%);
          color: #fff;
        }

        .asset-icon.usdc {
          background: linear-gradient(135deg, #2775ca 0%, #1a4d80 100%);
          color: #fff;
        }

        .asset-name {
          font-weight: 700;
          font-size: 17px;
        }

        .exposure-amount {
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          font-weight: 500;
        }

        .bar-container {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bar-bg {
          flex: 1;
          height: 8px;
          background: rgba(255,255,255,0.1);
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
          font-size: 15px;
          font-weight: 700;
          color: #00ff88;
          min-width: 55px;
          text-align: right;
        }

        .protocol-path {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .protocol-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-family: 'SF Mono', Monaco, 'Courier New', monospace;
        }

        .protocol-item.wallet {
          background: rgba(255,255,255,0.08);
          padding: 8px 14px;
          border-radius: 10px;
          color: rgba(255,255,255,0.8);
        }

        .protocol-step {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .protocol-arrow {
          color: #00ff88;
          font-size: 16px;
          font-weight: bold;
        }

        .protocol-name {
          background: rgba(0, 255, 136, 0.1);
          padding: 8px 14px;
          border-radius: 10px;
          color: #00ff88;
          font-weight: 500;
        }

        .proof-box {
          background: rgba(0, 0, 0, 0.3);
          padding: 18px;
          border-radius: 12px;
          font-family: 'SF Mono', Monaco, 'Courier New', monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .copy-btn {
          background: rgba(255,255,255,0.08);
          border: none;
          padding: 10px;
          border-radius: 8px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
        }

        .copy-btn:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        .actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          flex: 1;
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }

        .action-btn.primary {
          background: rgba(0, 255, 136, 0.12);
          border-color: rgba(0, 255, 136, 0.25);
          color: #00ff88;
        }

        .action-btn.primary:hover {
          background: rgba(0, 255, 136, 0.2);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .feature {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(0, 255, 136, 0.2);
          transform: translateY(-4px);
        }

        .feature-icon {
          margin-bottom: 18px;
        }

        .feature h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #fff;
        }

        .feature p {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0;
          line-height: 1.6;
        }

        .footer {
          text-align: center;
          padding: 40px 0 20px;
          margin-top: 20px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-bottom: 20px;
        }

        .footer-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #00ff88;
        }

        .copyright {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        @media (max-width: 640px) {
          .title {
            font-size: 48px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .features {
            grid-template-columns: 1fr;
          }
          .actions {
            flex-direction: column;
          }
          .footer-links {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}
