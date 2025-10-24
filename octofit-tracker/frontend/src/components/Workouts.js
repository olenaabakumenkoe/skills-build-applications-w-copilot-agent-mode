
import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setWorkouts(items);
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', items);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Workouts</h2>
        <button className="btn btn-primary btn-sm" disabled>Add Workout</button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(w => (
                <tr key={w.id}>
                  <td>{w.name}</td>
                  <td>{w.description}</td>
                  <td>{w.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Workouts;
