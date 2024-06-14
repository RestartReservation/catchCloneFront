import React from 'react';
import '../css/style.css';

const Tab = ({ label, onClick, active, count }) => {
    return(
    <div
      className={`tab ${active ? 'active' : ''}`} // 클래스명 동적 설정
      onClick={onClick}
    >
      {label}{count !== undefined && <span className="review-count">({count})</span>}
    </div>
    )
};

export default Tab;
  