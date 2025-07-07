
import React from 'react';
import { Button } from 'react-bootstrap';
import { RxCalendar } from 'react-icons/rx';
import { SlLocationPin } from 'react-icons/sl';

const SearchForm = (props) => {

  const { activeTab, handleClickBtnLocation, locationSelected, handleClickBtnDate, dateSelected, handleSearch } = props;

  return (
    <div className="search-form">
      {activeTab === "selfDrive" && (
        <div className="search-form-container sd">
          <div className="search-form-item address">
            <div className="title">
              <div className="wrap-svg">
                <SlLocationPin className='location-icon' width="24px" height="24px" />
              </div>
              <p>Pick-up Location</p>
            </div>
            <div className="choose">
              <div className="choose-item has-arrow" onClick={() => handleClickBtnLocation()}>
                <div className="here-autocomplete">
                  <p className="address pointer">
                    {locationSelected ? locationSelected : "Xa hop Ly, huyen ly nhan, tinh ha nam"}

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="vr"></div>
          <div className="search-form-item">
            <div className="title">
              <div className="wrap-svg">
                <RxCalendar className='location-icon' width="24px" height="24px" />
              </div>
              <p>Pick-up Date</p>
            </div>
            <div className="choose">
              <div className="choose-item has-arrow" onClick={() => handleClickBtnDate()}>
                <div className="here-autocomplete">
                  <p className="address pointer">
                    {dateSelected ? dateSelected : "Choose date to pick-up and drop-off"}</p>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleSearch} variant='warning btn-search' style={{marginBottom: '0'}}>Search</Button>
        </div>
      )}

      {activeTab === "withDriver" && (
        <form>
          {/* Form content for "Xe có tài xế" */}
          <div className="mb-3">
            <label className="form-label fw-bold">Lộ trình</label>
            {/* Inner form elements for with driver */}
            <input type="text" className="form-control" placeholder="Nhập địa điểm có tài xế" />
          </div>
          <button type="submit" className="btn btn-search w-100">Tìm Xe</button>
        </form>
      )}

      {activeTab === "longTerm" && (
        <form>
          {/* Form content for "Thuê xe dài hạn" */}
          <div className="mb-3">
            <label className="form-label fw-bold">Lộ trình</label>
            {/* Inner form elements for long term */}
            <input type="text" className="form-control" placeholder="Nhập địa điểm dài hạn" />
          </div>
          <button type="submit" className="btn btn-search w-100">Tìm Xe</button>
        </form>
      )}
    </div>
  );
};

export default SearchForm;
