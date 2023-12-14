import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ active }) => {
  const [activeLinkIdx] = useState(active || 1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.karen} alt="profile" />
        </div>
        <span className="info-name">Karen Hoelscher</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {
            navigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                <Link to={navigationLink.link} className={`nav-link ${navigationLink.id === activeLinkIdx ? 'active' : null}`}>
                  <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
