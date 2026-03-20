import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './MyAds.css';
import axios from 'axios';
import { useUser } from '@clerk/react'
export default function MyAds() {
  const { user, isLoaded, isSignedIn } = useUser()

  const [needs, setNeeds] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    if (!user) return;
    axios.get('http://localhost:3031/api/ads').then((res) => {
      const data = res.data.data.filter(need => need.created_by === user.id)
      setNeeds(data);
    }).catch((err) => {
      console.log(err)
    })
  }, [user])
  function handlePost(postData) {
    axios({
      method: 'post',
      url: 'http://localhost:3031/api/ads',
      data: postData
    }).then((res) => {
      // res.data.data contains the new ad with its ad_id
      setNeeds(prev => [res.data.data, ...prev]);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNeed = {
      title: formData.get('title'),
      budget: formData.get('budget'),
      description: formData.get('description'),
      created_by: user.id,
      urgency: formData.get('urgency'),
    };
    handlePost(newNeed)
    setIsFormOpen(false);
    e.target.reset();
  };


  const handleDelete = (id) => {
    axios({
      method: 'delete',
      url: `http://localhost:3031/api/ads/${id}`,
    }).then((res) => {
      console.log(res.data);
      // Only remove from UI if the backend request was successful
      setNeeds(needs.filter(need => need.ad_id !== id));
    }).catch((err) => {
      console.log(err);
    })
  };

  if (!isLoaded) return <div className="my-ads-page"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>
  if (!isSignedIn) return <div className="my-ads-page"><p style={{ color: 'var(--text-muted)' }}>Please sign in to view your ads.</p></div>

  return (
    <div className="my-ads-page">
      <div className="my-ads-header-section">
        <div>
          <h1 className="my-ads-title">My Ads & Needs</h1>
          <p className="my-ads-subtitle">Manage your requests and let others know what you're looking for.</p>
        </div>
        <button className="btn-post-need" onClick={() => setIsFormOpen(!isFormOpen)}>
          <Plus className="h-5 w-5" /> Post a Need
        </button>
      </div>

      {isFormOpen && (
        <div className="need-form-container">
          <h2 className="need-form-title">Post a New Need</h2>
          <form className="need-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">What are you looking for?</label>
              <input name="title" id="title" type="text" className="form-input" placeholder="e.g., Used Chemistry Textbook" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="budget">Budget ($)</label>
                <input name="budget" id="budget" type="text" className="form-input" placeholder="e.g., 40 or 30-50" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="urgency">Urgency</label>
                <select name="urgency" id="urgency" className="form-input" required>
                  <option value="Low">Low (Whenever)</option>
                  <option value="Medium">Medium (Within a week)</option>
                  <option value="High">High (ASAP)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description (Optional)</label>
              <textarea name="description" id="description" className="form-input" placeholder="Any specific requirements..."></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>Cancel</button>
              <button type="submit" className="btn-submit">Post Need</button>
            </div>
          </form>
        </div>
      )}

      <div className="ads-grid-section">
        <h2 className="section-title">My Active Needs</h2>
        {needs.length === 0 ? (
          <div className="empty-needs-state">
            <p>You haven't posted any needs yet.</p>
          </div>
        ) : (
          <div className="needs-grid">
            {needs.map(need => (
              <div key={need.ad_id} className="need-card">
                <div className="need-card-header">
                  <h3>{need.title}</h3>
                  <span className="need-budget">${need.budget}</span>
                </div>
                <p className="need-desc">{need.description}</p>
                <div className="need-meta">
                  <span className={`urgency-badge urgency-${need.urgency?.toLowerCase()}`}>
                    {need.urgency} Urgency
                  </span>
                  <span>Posted {need.datePosted}</span>
                </div>
                <button className="btn-delete-need" onClick={() => handleDelete(need.ad_id)}>
                  <Trash2 className="h-4 w-4" /> Remove Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
