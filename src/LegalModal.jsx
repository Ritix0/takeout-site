import React from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', 
      justifyContent: 'center', alignItems: 'center', padding: '10px',
      backdropFilter: 'blur(5px)'
    }} onClick={onClose}>
      
      <div style={{
        background: '#1e293b', 
        maxWidth: '800px', 
        width: '100%', 
        maxHeight: '85vh', // Чтобы не вылезало на мобилках
        borderRadius: '16px', 
        padding: '25px', 
        overflowY: 'auto', // Прокрутка
        position: 'relative',
        color: '#cbd5e1', 
        border: '1px solid #334155',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', top: '15px', right: '15px', 
            background: '#334155', border: 'none', borderRadius: '50%', 
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', transition: '0.2s'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ paddingRight: '10px' }}>
            {type === 'privacy' && <PrivacyText />}
            {type === 'terms' && <TermsText />}
        </div>
        
      </div>
    </div>
  );
}

function PrivacyText() {
  return (
    <>
      <h2 style={{color: 'white', marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>Privacy Policy</h2>
      <p style={{marginBottom: '10px', fontSize: '0.9rem', color: '#64748b'}}>Last updated: January 2026</p>
      
      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>1. Data Collection</h3>
      <p style={{lineHeight: '1.6'}}>We respect your privacy. Takeout Rebuilder is a desktop application that processes your photos <b>locally on your device</b>. We do NOT upload your photos, videos, or metadata to any cloud servers.</p>
      
      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>2. Information We Collect</h3>
      <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
        <li style={{marginBottom: '5px'}}><b>Activation Data:</b> To validate your license, we verify your Voucher Code and Hardware ID. This hash is stored securely to prevent piracy.</li>
        <li style={{marginBottom: '5px'}}><b>Payment Data:</b> Payments are processed by Digiseller/Oplata.info. We do not store your credit card details.</li>
      </ul>

      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>3. Third-Party Services</h3>
      <p>We rely on trusted third-party vendors:</p>
      <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
        <li><b>Digiseller:</b> Payment processing.</li>
        <li><b>Google Infrastructure:</b> License verification API.</li>
      </ul>

      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>4. Contact</h3>
      <p>For privacy concerns, contact: milligat13@gmail.com</p>
    </>
  );
}

function TermsText() {
  return (
    <>
      <h2 style={{color: 'white', marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>Terms of Service (EULA)</h2>
      
      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>1. License Grant</h3>
      <p style={{lineHeight: '1.6'}}>By downloading or using Takeout Rebuilder ("Software"), you agree to these terms. We grant you a revocable, non-exclusive, non-transferable, limited license to use the Software for personal purposes.</p>

      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>2. Disclaimer of Warranty</h3>
      <p style={{background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5'}}>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. THE AUTHOR DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
      </p>
      <p style={{marginTop: '10px'}}>In no event shall the authors be liable for any claim or damages arising from the use of the software. <b>Always backup your data before processing.</b></p>

      <h3 style={{color: '#f1f5f9', marginTop: '20px', marginBottom: '10px'}}>3. Refunds</h3>
      <p style={{lineHeight: '1.6'}}>Due to the nature of digital goods (software keys), refunds are generally not provided once a key has been issued, unless the software fails to function due to technical errors we cannot resolve.</p>
    </>
  );
}