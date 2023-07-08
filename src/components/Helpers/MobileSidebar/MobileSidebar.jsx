import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const MobileSidebar = ({sidebarData, onChange, toogle}) => {
  return (
    <div className={`mobile-sidebar flex-column ${toogle ? 'active' : 'inactive'}`}>
      <div className="mobile-top">
        <CiMenuKebab id='icon' onClick={() => onChange(!toogle)}/>
      </div>
      {
        sidebarData?.map((sidebar, index) => 
        <Link to={sidebar?.link} key={index} className='sidebar-icon'>
          <label htmlFor="">{sidebar?.icon}</label>
          <p className="tooltip">{sidebar?.label}</p>
        </Link> )
      }
    </div>
  )
}

export default MobileSidebar