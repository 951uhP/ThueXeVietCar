import React, { useState } from 'react';
import SearchTabs from './SearchTabs';
import SearchForm from './SearchForm';

const SearchContainer = (props) => {

    const { handleClickBtnLocation, locationSelected, handleClickBtnDate, dateSelected, handleSearch } = props;
    const [activeTab, setActiveTab] = useState("selfDrive");
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container search-container">
            <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} />
            <SearchForm activeTab={activeTab}
                handleClickBtnLocation={handleClickBtnLocation}
                locationSelected={locationSelected}
                handleClickBtnDate={handleClickBtnDate}
                dateSelected={dateSelected}
                handleSearch={handleSearch}
            />
        </div>
    );
};

export default SearchContainer;
