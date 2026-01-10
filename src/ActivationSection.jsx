import React, { useState, useEffect } from 'react';
import { Key, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// ТВОЯ ССЫЛКА НА GOOGLE SCRIPT
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZVWuEiqo8I0qG1khIfr7VkndpQ2gk8ywrCQJmJVbb_IrjIFyyoHKK73c0kCUVgUCt/exec"; 

export default function ActivationSection() {
  const [voucher, setVoucher] = useState('');
  const [hwid, setHwid] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Состояние для таймера (анти-спам)
  const [cooldown, setCooldown] = useState(0);

  // Эффект для таймера обратного отсчета
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleActivate = async () => {
    if (!voucher || !hwid || cooldown > 0) return;
    
    setLoading(true);
    setResult(null);

    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=activate&voucher=${encodeURIComponent(voucher)}&hwid=${encodeURIComponent(hwid)}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.result === 'success') {
        setResult({
          type: 'success',
          msg: 'License Activated Successfully!',
          key: data.key
        });
      } else {
        setResult({
          type: 'error',
          msg: data.message || 'Invalid Voucher or Error.'
        });
      }
    } catch (error) {
      console.error(error);
      setResult({
        type: 'error',
        msg: 'Connection failed. Check internet or VPN.'
      });
    } finally {
      setLoading(false);
      // Запускаем таймер на 10 секунд после любого результата
      setCooldown(10);
    }
  };

  return (
    <div id="activate" style={{ 
      padding: '60px 20px', 
      background: '#0f172a', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: 'bold', lineHeight: '1.2' }}>Already have a Voucher?</h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '1rem' }}>Activate your Pro license instantly.</p>

      <div style={{ 
        width: '100%',
        maxWidth: '480px', 
        background: '#1e293b', 
        padding: '30px', 
        borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        boxSizing: 'border-box'
      }}>
        
        {/* INPUT: VOUCHER */}
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Voucher Code (from email)
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              placeholder="TR-XXXX-XXXX-XXXX"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              style={{
                width: '100%', 
                padding: '12px 12px 12px 40px',
                background: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '8px', 
                color: 'white', 
                outline: 'none',
                fontFamily: 'monospace', 
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* INPUT: HWID */}
        <div style={{ marginBottom: '25px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Hardware ID (from app)
          </label>
          <div style={{ position: 'relative' }}>
            <Key size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              placeholder="A1B2-C3D4-E5F6-7890"
              value={hwid}
              onChange={(e) => setHwid(e.target.value)}
              style={{
                width: '100%', 
                padding: '12px 12px 12px 40px',
                background: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '8px', 
                color: 'white', 
                outline: 'none',
                fontFamily: 'monospace', 
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* BUTTON WITH COOLDOWN */}
        <button 
          onClick={handleActivate}
          disabled={loading || cooldown > 0 || !voucher || !hwid}
          style={{
            width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
            // Цвет кнопки меняется, если идет кулдаун
            background: (loading || cooldown > 0) ? '#334155' : '#2563eb', 
            color: 'white', fontWeight: 'bold', fontSize: '1rem',
            cursor: (loading || cooldown > 0) ? 'not-allowed' : 'pointer', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
            transition: '0.2s',
            boxSizing: 'border-box'
          }}
        >
          {loading ? (
            <Loader className="spin" size={20} />
          ) : cooldown > 0 ? (
            `Wait ${cooldown}s` // Показываем таймер
          ) : (
            "Get Activation Key"
          )}
        </button>

        {/* RESULT AREA */}
        {result && (
          <div style={{ 
            marginTop: '25px', padding: '20px', borderRadius: '12px',
            background: result.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: result.type === 'success' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            wordBreak: 'break-all'
          }}>
            {result.type === 'success' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#4ade80', marginBottom: '15px' }}>
                  <CheckCircle size={24} /> 
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Success!</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '8px' }}>Your License Key:</div>
                <div 
                  onClick={() => {navigator.clipboard.writeText(result.key)}}
                  style={{ 
                    background: '#020617', padding: '12px', borderRadius: '8px', 
                    fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '1px', border: '1px dashed #475569',
                    cursor: 'pointer', color: '#fff',
                    wordWrap: 'break-word' 
                  }}
                  title="Click to copy"
                >
                  {result.key}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>Click key to copy</div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#f87171' }}>
                <AlertCircle size={20} />
                <span>{result.msg}</span>
              </div>
            )}
          </div>
        )}

      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}