import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './components/Main';
import Profile from './components/Profile';
import Internship2023 from './components/Internship2023';
import Internship2022 from './components/Internship2022';
import NetworkInternship from './components/NetworkInternship';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import './App.css';

function App() {


  const [dropdown, setDropdown] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleDropdown = (id) => {
    setDropdown(dropdown === id ? null : id);
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <Router>
      <nav>
        <ul className={isNavVisible ? "visible" : ""}>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li
            onMouseEnter={() => toggleDropdown('profile')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">Profile</span>
            {dropdown === 'profile' && (
              <ul className="dropdown">
                <li>
                  <Link to="/profile/professional">Professional</Link>
                </li>
                <li>
                  <Link to="/profile/personal">Personal</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => toggleDropdown('projects')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">Projects</span>
            {dropdown === 'projects' && (
              <ul className="dropdown">
                <li>
                  <Link to="/projects/about-nour">About Nour Website</Link>
                </li>
                <li>
                  <Link to="/projects/apollo">Apollo</Link>
                </li>
                <li>
                  <Link to="/projects/networking">Networking</Link>
                </li>
                <li>
                  <Link to="/projects/sa-hiring">Solutions Architect Hiring Factory Automation</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => toggleDropdown('certifications')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">Certifications</span>
            {dropdown === 'certifications' && (
              <ul className="dropdown">
                <li>
                  <Link to="/certifications/aws">AWS</Link>
                </li>
                <li>
                  <Link to="/certifications/networking">Networking</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/education">Education</Link>
          </li>
          <li
            onMouseEnter={() => toggleDropdown('internship2023')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">AWS Summer 2023 Internship</span>
            {dropdown === 'internship2023' && (
              <ul className="dropdown">
                <li>
                  <Link to="/internship2023/role">Role and Responsibilities</Link>
                </li>
                <li>
                  <Link to="/internship2023/accomplishments">Accomplishments</Link>
                </li>
                <li>
                  <Link to="/internship2023/project">Project</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            onMouseEnter={() => toggleDropdown('internship2022')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">AWS Summer 2022 Internship</span>
            {dropdown === 'internship2022' && (
              <ul className="dropdown">
                <li>
                  <Link to="/internship2022/role">Role and Responsibilities</Link>
                </li>
                <li>
                  <Link to="/internship2022/accomplishments">Accomplishments</Link>
                </li>
                <li>
                  <Link to="/internship2022/project">Project</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            onMouseEnter={() => toggleDropdown('networkInternship')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span className="non-clickable">Network Engineering Internship</span>
            {dropdown === 'networkInternship' && (
              <ul className="dropdown">
                <li>
                  <Link to="/networkInternship/role">Role and Responsibilities</Link>
                </li>
                <li>
                  <Link to="/networkInternship/accomplishments">Accomplishments</Link>
                </li>
                <li>
                  <Link to="/networkInternship/project">Project</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile/professional" element={<Profile type="Professional" />} />
        <Route path="/profile/personal" element={<Profile type="Personal" />} />
        <Route path="/internship2023/role" element={<Internship2023 section="role" />} />
        <Route path="/internship2023/accomplishments" element={<Internship2023 section="accomplishments" />} />
        <Route path="/internship2023/project" element={<Internship2023 section="project" />} />
        <Route path="/internship2022/role" element={<Internship2022 section="role" />} />
        <Route path="/internship2022/accomplishments" element={<Internship2022 section="accomplishments" />} />
        <Route path="/internship2022/project" element={<Internship2022 section="project" />} />
        <Route path="/networkInternship/role" element={<NetworkInternship section="role" />} />
        <Route path="/networkInternship/accomplishments" element={<NetworkInternship section="accomplishments" />} />
        <Route path="/networkInternship/project" element={<NetworkInternship section="project" />} />
        <Route path="/projects/about-nour" element={<Projects project="About Nour Website" />} />
        <Route path="/projects/apollo" element={<Projects project="Apollo" />} />
        <Route path="/projects/networking" element={<Projects project="Networking" />} />
        <Route path="/projects/sa-hiring" element={<Projects project="Solutions Architect Hiring Factory Automation" />} />
        <Route path="/certifications/aws" element={<Certifications type="AWS" />} />
        <Route path="/certifications/networking" element={<Certifications type="Networking" />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </Router>
  );
}

export default App;