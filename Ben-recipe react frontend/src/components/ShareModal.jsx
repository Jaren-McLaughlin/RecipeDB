import React from 'react';
import { useState } from 'react'; 


export default function ShareModal({ visible, onClose }) {
  const [email, setEmail] = useState('');

  const sendShare = () => {
    if (email) {
      alert(`Recipe shared with ${email}!`);
      onClose();
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className={`modal ${visible ? 'active' : ''}`}>
      <div className="modal-content">
        <h3>🔗 Share Recipe</h3>
        <input
          type="email"
          className="form-input"
          placeholder="Enter recipient's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={sendShare}>Share</button>
        </div>
      </div>
    </div>
  );
}