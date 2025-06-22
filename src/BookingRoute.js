import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import CarDetail from "./CarDetail";

function BookingRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchForm />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
        </Router>
    );
}

export default App;