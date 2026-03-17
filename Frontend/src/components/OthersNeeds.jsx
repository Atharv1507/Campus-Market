import React, { useState } from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import './OthersNeeds.css';

export default function OthersNeeds() {
  const [needs] = useState([
    {
      id: 1,
      title: 'Calc 2 Study Partner / Tutor',
      budget: '20/hr',
      urgency: 'High',
      description: 'Struggling with sequences and series. Looking for someone who aced the class to tutor me for 2 hours a week.',
      datePosted: '2 hours ago',
      user: 'Sarah M.',
      category: 'Services'
    },
    {
      id: 2,
      title: 'Used Desk Lamp',
      budget: '15',
      urgency: 'Medium',
      description: 'Need a simple LED desk lamp for late-night studying. Don\'t care about color as long as it works.',
      datePosted: 'Yesterday',
      user: 'David K.',
      category: 'Electronics'
    },
    {
      id: 3,
      title: 'iClicker 2',
      budget: '30',
      urgency: 'High',
      description: 'Need an iClicker 2 for my bio class ASAP. Willing to pick up anywhere on campus.',
      datePosted: '3 hours ago',
      user: 'Emily R.',
      category: 'Electronics'
    },
    {
      id: 4,
      title: 'Graduation Gown (Size 5\'4" - 5\'6")',
      budget: '40',
      urgency: 'Low',
      description: 'Looking to buy a gently used undergrad graduation gown before May. Just need the gown, not the cap/tassel.',
      datePosted: '1 day ago',
      user: 'Jessica T.',
      category: 'Clothing'
    },
    {
      id: 5,
      title: 'Moving Boxes',
      budget: 'Free/10',
      urgency: 'Medium',
      description: 'Moving out next weekend. Does anyone have spare cardboard boxes? Will take them off your hands!',
      datePosted: '5 hours ago',
      user: 'Michael B.',
      category: 'Furniture & Decor'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'High Urgency', 'Electronics', 'Services', 'Clothing'];

  const filteredNeeds = needs.filter(need => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'High Urgency') return need.urgency === 'High';
    return need.category === activeFilter;
  });

  return (
    <div className="others-needs-page">
      <div className="needs-header">
        <div>
          <h1 className="needs-title">Student Requests</h1>
          <p className="needs-subtitle">Help out your peers by fulfilling their needs.</p>
        </div>
      </div>

      <div className="needs-filters">
        {filters.map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="needs-list">
        {filteredNeeds.length === 0 ? (
          <div className="empty-state">
            <p>No requests found for this filter.</p>
          </div>
        ) : (
          filteredNeeds.map(need => (
            <div key={need.id} className="request-card">
              <div className="request-card-header">
                <div className="request-user-info">
                  <div className="user-avatar-small">{need.user.charAt(0)}</div>
                  <span className="user-name">{need.user}</span>
                  <span className="post-date">• {need.datePosted}</span>
                </div>
                <div className="request-price">
                  Budget: <strong>${need.budget}</strong>
                </div>
              </div>
              
              <div className="request-card-body">
                <h3 className="request-title">{need.title}</h3>
                <p className="request-desc">{need.description}</p>
                <div className="request-tags">
                  <span className={`urgency-badge urgency-${need.urgency.toLowerCase()}`}>
                    {need.urgency} Urgency
                  </span>
                  <span className="category-badge">{need.category}</span>
                </div>
              </div>

              <div className="request-card-footer">
                <button className="btn-save">
                  <Heart className="h-4 w-4" /> Save
                </button>
                <button className="btn-contact">
                  <MessageCircle className="h-4 w-4" /> Message {need.user.split(' ')[0]}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
