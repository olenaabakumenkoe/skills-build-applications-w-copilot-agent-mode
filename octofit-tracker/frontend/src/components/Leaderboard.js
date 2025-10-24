
import React, { useState, useEffect } from 'react';


function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
      ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        setLeaders(items);
        setLoading(false);
        console.log('Leaderboard endpoint:', apiUrl);
        console.log('Fetched leaderboard:', items);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="text-center"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((l, idx) => (
                <tr key={l.id}>
                  <td>{idx + 1}</td>
                  <td>{l.username || l.user?.username}</td>
                  <td>{l.points || l.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
