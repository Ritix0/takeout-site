import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, FolderHeart, Check, X, Cookie, Monitor, Command } from 'lucide-react';
import ActivationSection from './ActivationSection';
import LegalModal from './LegalModal';

// --- НАСТРОЙКИ ССЫЛОК ---
const WIN_LINK = "https://github.com/Ritix0/Takeout-Rebuilder/releases/download/v1/TakeoutRebuilder.exe";
const MAC_LINK = "https://github.com/Ritix0/Takeout-Rebuilder/releases/download/v1/TakeoutRebuilder.zip";
const BUY_LINK = "https://oplata.info/asp2/pay.asp?id_d=5633748";

function App() {
  const [legalType, setLegalType] = useState(null);
  
  // Ленивая инициализация куки
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return !localStorage.getItem('cookieConsent');
  });
  
  const [downloadModal, setDownloadModal] = useState({ isOpen: false, platform: 'win' });
  const [activeScreenshot, setActiveScreenshot] = useState('win'); 
  
  // Определение мобильного устройства для отключения сложной 3D анимации
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  const openDownloadModal = (platform) => {
    setDownloadModal({ isOpen: true, platform });
    setActiveScreenshot(platform);
  };

  // --- ВАРИАНТЫ АНИМАЦИИ (АДАПТИВНЫЕ) ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // На ПК: 3D вращение и сдвиг. На Мобиле: Просто появление/исчезновение.
  const winImageVariants = {
    active: { 
      rotateY: isMobile ? 0 : 0, 
      scale: isMobile ? 1 : 1.05, 
      x: 0, 
      zIndex: 10, 
      opacity: 1,
      display: 'block',
      filter: 'brightness(1) blur(0px)',
      transition: { duration: 0.5 }
    },
    inactive: { 
      rotateY: isMobile ? 0 : 25, 
      scale: 0.85, 
      x: isMobile ? 0 : -60, // На мобиле не сдвигаем, чтобы не вылезало
      zIndex: 1, 
      opacity: isMobile ? 0 : 0.6, // На мобиле скрываем неактивную полностью
      display: isMobile ? 'none' : 'block',
      filter: 'brightness(0.6) blur(1px)',
      transition: { duration: 0.5 }
    }
  };

  const macImageVariants = {
    active: { 
      rotateY: isMobile ? 0 : 0, 
      scale: isMobile ? 1 : 1.05, 
      x: 0, 
      zIndex: 10, 
      opacity: 1,
      display: 'block',
      filter: 'brightness(1) blur(0px)',
      transition: { duration: 0.5 }
    },
    inactive: { 
      rotateY: isMobile ? 0 : -25, 
      scale: 0.85, 
      x: isMobile ? 0 : 60, 
      zIndex: 1, 
      opacity: isMobile ? 0 : 0.6,
      display: isMobile ? 'none' : 'block',
      filter: 'brightness(0.6) blur(1px)',
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}> {/* Защита от горизонтального скролла */}
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">
            <FolderHeart color="#3B82F6" />
            <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>Takeout Rebuilder</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a 
              href="#activate" 
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: '0.2s' }}
            >
              Activate
            </a>

            <div className="status-badge" style={{display: 'flex'}}>
              <div className="dot"></div>
              <span style={{display: isMobile ? 'none' : 'block'}}>Offline</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="hero-glow"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} style={{ padding: '0 20px' }}>
          <h1 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', lineHeight: 1.1 }}>
            Don't let Google Takeout <br />
            <span className="gradient-text">ruin your timeline.</span>
          </h1>
          
          <p className="subtitle" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
            Restore original capture dates from JSON metadata, merge duplicates, 
            and organize your photo archive. 100% Offline.
          </p>

          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center', 
            flexDirection: isMobile ? 'column' : 'row', // На мобиле кнопки в столбик
            alignItems: 'center' 
          }}>
            <button 
              onClick={() => openDownloadModal('win')}
              onMouseEnter={() => !isMobile && setActiveScreenshot('win')}
              className="btn-primary" 
              style={{
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px',
                width: isMobile ? '100%' : 'auto' // На мобиле полная ширина
              }}
            >
              <Monitor size={20} />
              Download for Windows
            </button>

            <button 
              onClick={() => openDownloadModal('mac')}
              onMouseEnter={() => !isMobile && setActiveScreenshot('mac')}
              className="btn-secondary" 
              style={{
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.1)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '12px 24px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: '600', 
                transition: '0.2s',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              <Command size={20} /> 
              Download for macOS
            </button>
          </div>
          
          <div className="version-text" style={{marginTop: '15px'}}>
            v1.0 | Supported: Windows 10/11 & macOS (Intel/M-series)
          </div>
        </motion.div>

        {/* --- SCREENSHOT CONTAINER --- */}
        <motion.div 
          className="screenshot-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: 'relative', 
            marginTop: '40px', 
            // Уменьшил высоту контейнера, так как картинка будет меньше
            height: isMobile ? 'auto' : '650px', 
            display: 'flex', 
            justifyContent: 'center', 
            perspective: '1200px',
            marginBottom: isMobile ? '40px' : '20px'
          }}
        >
          {/* WINDOWS SCREENSHOT */}
          <motion.div
            variants={winImageVariants}
            animate={activeScreenshot === 'win' ? 'active' : 'inactive'}
            style={{
              position: isMobile ? 'relative' : 'absolute',
              // УМЕНЬШИЛ РАЗМЕР: с 700px до 550px
              width: 'min(80%, 550px)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', 
              border: '1px solid #334155', 
              transformOrigin: 'right center'
            }}
          >
             <img src="/app-screenshot.png" alt="Windows App" style={{width: '100%', display: 'block'}} />
          </motion.div>

          {/* MAC SCREENSHOT */}
          <motion.div
            variants={macImageVariants}
            animate={activeScreenshot === 'mac' ? 'active' : 'inactive'}
            style={{
              position: isMobile ? 'relative' : 'absolute',
              // УМЕНЬШИЛ РАЗМЕР: с 700px до 550px
              width: 'min(80%, 550px)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', 
              border: '1px solid #334155', 
              transformOrigin: 'left center'
            }}
          >
             <img src="/appmac-screenshot.png" alt="macOS App" style={{width: '100%', display: 'block'}} />
          </motion.div>
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
            <button onClick={() => openDownloadModal('win')} className="btn-free">Download Now</button>
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

      {/* COOKIE BANNER */}
      {showCookieConsent && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          width: '90%', maxWidth: '600px', background: 'rgba(30, 41, 59, 0.95)', 
          backdropFilter: 'blur(10px)', border: '1px solid #334155', borderRadius: '12px',
          padding: '15px 20px', zIndex: 9998, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap'
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
              background: '#3B82F6', color: 'white', border: 'none', padding: '8px 20px', 
              borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
            }}
          >
            Got it
          </button>
        </div>
      )}

      {/* Legal Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

      {/* --- DOWNLOAD INSTRUCTION MODAL --- */}
      <AnimatePresence>
        {downloadModal.isOpen && (
          <DownloadInstructionModal 
            isOpen={downloadModal.isOpen}
            platform={downloadModal.platform}
            onClose={() => setDownloadModal({ ...downloadModal, isOpen: false })}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// --- КОМПОНЕНТ МОДАЛКИ СКАЧИВАНИЯ ---
function DownloadInstructionModal({ isOpen, platform, onClose }) {
  if (!isOpen) return null;

  const isWin = platform === 'win';
  const downloadLink = isWin ? WIN_LINK : MAC_LINK;
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      padding: '10px' // Отступ на мобилках
    }} onClick={onClose}>
      {/* ИСПОЛЬЗУЕМ motion.div ДЛЯ АНИМАЦИИ МОДАЛКИ */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: '#1E293B', 
          border: '1px solid #334155', 
          borderRadius: '16px',
          padding: '30px', 
          maxWidth: '500px', 
          width: '90%', 
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex', 
          flexDirection: 'column',
          maxHeight: '90vh', 
          overflowY: 'auto', // Вертикальный скролл оставим для маленьких экранов
          overflowX: 'hidden', // <--- ЭТО УБЕРЕТ НИЖНИЙ СКРОЛЛБАР
          boxSizing: 'border-box' // Гарантирует, что padding не увеличит ширину
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '5px' }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '15px', marginTop: '10px' }}>
          <div style={{ 
            background: isWin ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.1)', 
            width: '50px', height: '50px', borderRadius: '50%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' 
          }}>
            {isWin ? <Monitor size={28} color="#3B82F6" /> : <Command size={28} color="white" />}
          </div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
            {isWin ? 'Installing on Windows' : 'Installing on macOS'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>
            We are an indie developer without an expensive corporate certificate ($500/yr). 
            Your system will show a warning. Here is how to run it:
          </p>
        </div>

        {/* ИНСТРУКЦИЯ */}
        <div style={{ background: '#0F172A', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'left' }}>
          {isWin ? (
            // WINDOWS INSTRUCTIONS
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                Windows Defender will show "<b>Windows protected your PC</b>".
              </li>
              <li>
                Click <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>More info</span> (underlined text).
              </li>
              <li>
                Click the <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>Run anyway</span> button.
              </li>
            </ul>
          ) : (
            // MAC INSTRUCTIONS
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                Unzip the downloaded file.
              </li>
              <li>
                <b>Right-click</b> (or Ctrl+Click) the app icon.
              </li>
              <li>
                Select <span style={{ color: '#fff', fontWeight: 'bold' }}>Open</span> from the menu.
              </li>
              <li>
                Click <span style={{ color: '#fff', fontWeight: 'bold' }}>Open</span> in the warning dialog.
              </li>
            </ul>
          )}
        </div>

        <a 
          href={downloadLink}
          className="btn-primary"
          style={{ 
            width: '100%', 
            display: 'flex',           // Включаем Flexbox
            alignItems: 'center',      // Центрируем по вертикали
            justifyContent: 'center',  // Центрируем по горизонтали
            gap: '10px',               // Отступ между иконкой и текстом
            textDecoration: 'none', 
            padding: '12px',
            boxSizing: 'border-box'
          }}
          onClick={() => {
            setTimeout(onClose, 2000); 
          }}
        >
          <Download size={20} />
          I understand, Download
        </a>
        
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', color: '#64748b' }}>
          100% Safe & Open Source Logic. No Internet Required.
        </p>

      </motion.div>
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