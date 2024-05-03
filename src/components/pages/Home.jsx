import React from 'react';
import Panel from './Panel';
import Sidebar from '../helpers/SideBar'
import './Home.css'

const Home = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Panel title="Panel de control" />
    </div>
  );
};

export default Home;
