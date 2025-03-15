import React from 'react'; // Add this import

export default function PasswordPolicy({ prefix = "register-" }) {
    const policies = [
      { id: "length", text: "8-64 characters" },
      { id: "uppercase", text: "At least 1 uppercase letter" },
      { id: "lowercase", text: "At least 1 lowercase letter" },
      { id: "number", text: "At least 1 number" },
      { id: "special", text: "At least 1 special character" },
      { id: "match", text: "Passwords match" }
    ];
  
    return (
      <div className="password-policy">
        {policies.map(policy => (
          <p key={policy.id} className="policy-item" id={`${prefix}${policy.id}`}>
            <i className="fas fa-times-circle"></i>
            {policy.text}
          </p>
        ))}
      </div>
    );
  }