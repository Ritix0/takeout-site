import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, FolderHeart, Check, X, Cookie } from 'lucide-react';
import ActivationSection from './ActivationSection';
import LegalModal from './LegalModal'; // Импортируем модалку

// --- НАСТРОЙКИ ---
const DOWNLOAD_LINK = "https://github.com/Ritix0/Takeout-Rebuilder/releases/download/v1.0.1/TakeoutRebuilder.exe"; 
const BUY_LINK = "https://oplata.info/asp2/pay.asp?id_d=5633748"; 

function App() {
  const [legalType, setLegalType] = useState(null); // 'privacy' или 'terms'
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // Проверка куки при запуске
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">
            <FolderHeart color="#3B82F6" />
            Takeout Rebuilder
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a 
              href="#activate" 
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: '0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'white'}
              onMouseOut={(e) => e.target.style.color = '#94a3b8'}
            >
              Activate License
            </a>

            <div className="status-badge" style={{display: 'flex'}}>
              <div className="dot"></div>
              <span style={{display: 'none', '@media (min-width: 600px)': { display: 'block' }}}>Offline</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-glow"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1>
            Don't let Google Takeout <br />
            <span className="gradient-text">ruin your timeline.</span>
          </h1>
          
          <p className="subtitle">
            Restore original capture dates from JSON metadata, merge duplicates, 
            and organize your photo archive. 100% Offline.
          </p>

          <div>
            <a href={DOWNLOAD_LINK} className="btn-primary" style={{textDecoration: 'none'}}>
              <Download size={20} />
              Download for Windows
            </a>
            <span className="version-text">v1.0 | macOS coming soon</span>
          </div>
        </motion.div>

        {/* Screenshot */}
        <motion.div 
          className="screenshot-container"
          initial={{ opacity: 0, y: 50, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="app-window">
            <img src="/app-screenshot.png" alt="Takeout Rebuilder Interface" className="app-img" />
          </div>
        </motion.div>
      </header>

      {/* Features */}
      <section className="features-grid">
        <FeatureCard 
          icon={<ShieldCheck size={32} color="#4ade80" />}
          title="Privacy First"
          desc="Your photos never leave your drive. The app runs completely offline. Unplug your internet and see for yourself."
        />
        <FeatureCard 
          icon={<Layers size={32} color="#60a5fa" />}
          title="Fix EXIF Metadata"
          desc="Automatically merges separated JSON data back into your images. Restores the correct 'Date Taken' so your timeline makes sense again."
        />
        <FeatureCard 
          icon={<Zap size={32} color="#facc15" />}
          title="Simple & Fast"
          desc="No Python scripts or command line needed. Just drag, drop, and fix thousands of photos in one click."
        />
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="pricing-section">
        <div className="pricing-header">
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px'}}>Simple Pricing</h2>
          <p style={{color: '#94a3b8'}}>Start for free, upgrade for unlimited power.</p>
        </div>

        <div className="pricing-grid">
          
          {/* FREE CARD */}
          <div className="pricing-card">
            <h3 className="card-title">Free Starter</h3>
            <div className="price">$0</div>
            <ul className="features-list">
              <li><Check size={18} color="#4ade80" /> Fix Dates & EXIF</li>
              <li><Check size={18} color="#4ade80" /> Merge JSON Metadata</li>
              <li><Check size={18} color="#4ade80" /> <b>500 Photos</b> / day limit</li>
              <li><X size={18} color="#64748b" /> No Priority Support</li>
            </ul>
            <a href={DOWNLOAD_LINK} className="btn-free">Download Now</a>
          </div>

          {/* PRO CARD */}
          <div className="pricing-card pro">
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', 
              background: '#3B82F6', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
            }}>
              MOST POPULAR
            </div>
            <h3 className="card-title">Pro License</h3>
            <div className="price">$5 <span>/ one-time</span></div>
            <ul className="features-list">
              <li style={{color: 'white'}}><Check size={18} color="#3B82F6" /> <b>Everything in Free</b></li>
              <li style={{color: 'white'}}><Check size={18} color="#3B82F6" /> <b>Unlimited Photos</b></li>
              <li style={{color: 'white'}}><Check size={18} color="#3B82F6" /> <b>Priority Support</b></li>
              <li><Check size={18} color="#3B82F6" /> Instant Activation Key</li>
            </ul>
            <a href={BUY_LINK} target="_blank" rel="noreferrer" className="btn-buy">
              Get Pro Access
            </a>
          </div>

        </div>
      </section>

      {/* --- БЛОК АКТИВАЦИИ --- */}
      <ActivationSection />

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', 
        padding: '60px 20px', 
        color: '#64748b', 
        fontSize: '0.9rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#020617'
      }}>
        <p style={{ marginBottom: '20px' }}>© 2026 Takeout Rebuilder. Built for the Cloud Exodus.</p>
        
        {/* Ссылки на документы */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setLegalType('terms')}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            Terms of Service
          </button>
          <button 
            onClick={() => setLegalType('privacy')}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            Privacy Policy
          </button>
        </div>

        {/* Блок контактов */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <span>Need help or found a bug?</span>
          <a 
            href="mailto:milligat13@gmail.com" 
            style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', transition: '0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#60a5fa'}
            onMouseOut={(e) => e.target.style.color = '#3B82F6'}
          >
            milligat13@gmail.com
          </a>
        </div>
      </footer>

      {/* COOKIE BANNER (Адаптивный) */}
      {showCookieConsent && (
        <div style={{
          position: 'fixed', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          background: 'rgba(30, 41, 59, 0.95)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '15px 20px',
          zIndex: 9998,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '15px',
          flexWrap: 'wrap' // Перенос для мобилок
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px' }}>
            <Cookie size={24} color="#3B82F6" />
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
              We use cookies to ensure you get the best experience. By using our website, you agree to our Privacy Policy.
            </p>
          </div>
          <button 
            onClick={acceptCookies}
            style={{
              background: '#3B82F6', 
              color: 'white', 
              border: 'none', 
              padding: '8px 20px', 
              borderRadius: '6px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            Got it
          </button>
        </div>
      )}

      {/* Модальное окно с документами */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div style={{marginBottom: '15px'}}>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  );
}

export default App;