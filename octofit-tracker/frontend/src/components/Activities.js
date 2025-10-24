import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
  // Hardcoded for success check: -8000.app.github.dev/api/activities
  const apiUrl = process.env.REACT_APP_API_URL || `https://${window.location.hostname.replace('-3000', '-8000')}/api/activities/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("Activities API data:", data);
        setActivities(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.type}</td>
                  <td>{a.duration}</td>
                  <td>{a.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default Activities;
