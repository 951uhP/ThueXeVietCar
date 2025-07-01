import React from 'react';
import { FaCar } from 'react-icons/fa';
import { FaCalendarDays, FaPeoplePulling } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const SearchTabs = ({ activeTab, onTabChange }) => {
    const handleComingSoon = () => {
        Swal.fire(
            "Tính năng sắp ra mắt",
            "Tính năng này sẽ được cập nhật trong thời gian tới.",
            "info"
        );
    };

    return (
        <div className="search-tab">
            <div
                className={`tab-item-1  ${activeTab === "selfDrive" ? "active" : ""}`}
                onClick={() => onTabChange("selfDrive")}
            >
                <FaCar />
                <span>Xe tự lái</span>
            </div>
            <div
                className={`tab-item-2  ${activeTab === "withDriver" ? "active" : ""}`}
                onClick={handleComingSoon}
            >
                <FaPeoplePulling />
                <span>Xe có tài xế</span>
            </div>
            <div
                className={`tab-item-3  ${activeTab === "longTerm" ? "active" : ""}`}
                onClick={handleComingSoon}
            >
                <FaCalendarDays />
                <span>Thuê xe dài hạn</span>
            </div>
        </div>
    );
};

export default SearchTabs;
