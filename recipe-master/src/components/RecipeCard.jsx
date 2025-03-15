import React from 'react'; // Add this import

export default function RecipeCard({ title, ingredients, time, onShare, onEdit, onDelete }) {
    return (
      <div className="recipe-card" onClick={onEdit}>
        <div className="card-actions">
          <button className="action-btn" onClick={(e) => { e.stopPropagation(); onShare(); }}>
            <i className="fas fa-share-alt"></i>
          </button>
          <button className="action-btn" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="action-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
        <h3>{title}</h3>
        <p>{ingredients}</p>
        <div className="card-footer">
          <span>⏱ {time}</span>
        </div>
      </div>
    );
  }