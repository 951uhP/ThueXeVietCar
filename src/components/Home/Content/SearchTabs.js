import React from 'react';
import { FaCar } from 'react-icons/fa';
import { FaCalendarDays, FaPeoplePulling } from 'react-icons/fa6';

const SearchTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="search-tab">
            <div className={`tab-item-1  ${activeTab === "selfDrive" ? "active" : ""}`} onClick={() => onTabChange("selfDrive")}>
                <FaCar />
                <span>Xe tự lái</span>
            </div>
            <div className={`tab-item-2  ${activeTab === "withDriver" ? "active" : ""}`} onClick={() => onTabChange("withDriver")}>
                <FaPeoplePulling />
                <span>Xe có tài xế</span>
            </div>
            <div className={`tab-item-3  ${activeTab === "longTerm" ? "active" : ""}`} onClick={() => onTabChange("longTerm")}>
                <FaCalendarDays />
                <span>Thuê xe dài hạn</span>
            </div>

        </div >
    );
};

export default SearchTabs;
