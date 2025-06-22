import React, { useEffect, useState } from "react";
import { Table, Button, Form, Alert, Container } from "react-bootstrap";
import "./MyWallet.scss";
import LoadingIcon from "../Loading";
import {
  getUsersDetail,
  updateProfile,
  getTransaction,
} from "../../service/apiService"; // API service
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function MyWallet() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const { account } = useSelector((state) => state.user);
  const userId = account?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  // Format số tiền hiển thị
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Fetch thông tin giao dịch
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransaction(userId);
        setIsTransactionLoading(false);

        if (response?.statusCode === 200 && Array.isArray(response?.data?.result)) {
          const sanitizedData = response.data.result.map((trans) => ({
            ...trans,
            amount: trans.amount || 0,
            transactionDate: trans.transactionDate || new Date().toISOString(),
          }));
          setTransaction(sanitizedData);
        } else {
          setTransaction([]);
          console.error("Response data is not valid.");
        }
      } catch (error) {
        setTransaction([]);
        setIsTransactionLoading(false);
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransaction();
  }, [userId]);

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await getUsersDetail(userId);

        if (response?.statusCode === 200 && response.data) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user detail.");
        }
      } catch (error) {
        console.error("Error fetching user detail:", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  // Xử lý tìm kiếm giao dịch
  const handleSearch = () => {
    if (!fromDate || !toDate) {
      alert("Please select both 'From' and 'To' dates.");
      return;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate > endDate) {
      alert("'From' date cannot be greater than 'To' date.");
      return;
    }

    if (!Array.isArray(transaction) || transaction.length === 0) {
      alert("No transactions available for search.");
      return;
    }

    const filtered = transaction.filter((trans) => {
      const transactionDate = new Date(trans.transactionDate);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    setFilteredTransactions(filtered);

    if (filtered.length === 0) {
      setNoResultsMessage("No transactions found for the selected date range.");
    } else {
      setNoResultsMessage("");
    }
  };

  // Render loading hoặc chuyển hướng nếu không tìm thấy userId
  if (!userId) {
    navigate("/login");
    return <p>No user ID found. Redirecting to login...</p>;
  }

  if (isUserLoading || isTransactionLoading) {
    return <LoadingIcon />;
  }

  return (
    <Container className="my-wallet">
      <h3 className="title">My Wallet</h3>

      {/* Balance Section */}
      <div className="balance-section">
        <p>Your current balance:</p>
        <h2 className="balance">{formatCurrency(user?.wallet || 0)}</h2>
        <div className="buttons">
          <Button
            variant="warning"
            onClick={() => alert("Withdraw feature coming soon!")}
          >
            Withdraw
          </Button>
          <Button
            variant="success"
            onClick={() => alert("Top-up feature coming soon!")}
          >
            Top-up
          </Button>
        </div>
      </div>

      {/* Transactions Filter */}
      <div className="filter-section">
        <h4>Transactions</h4>
        <div className="date-filters">
          <Form.Group className="date-group">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="date-group">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{
              backgroundColor: "white",
              color: "#333",
              border: "1pt solid #333",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
            variant="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        {noResultsMessage && <Alert variant="info">{noResultsMessage}</Alert>}
      </div>

      {/* Transactions Table */}
      <div className="transaction-section">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Title</th>
              <th>Date time</th>
              <th>Booking No</th>
              <th>Car Name</th>
            </tr>
          </thead>
          <tbody>
            {(filteredTransactions.length > 0
              ? filteredTransactions
              : transaction
            ).map((trans, index) => (
              <tr key={trans.id}>
                <td>{index + 1}</td>
                <td>{trans.transactionType}</td>
                <td>{formatCurrency(trans.amount)}</td>
                <td>{trans.description}</td>
                <td>
                  {new Date(trans.transactionDate).toLocaleDateString()}
                </td>
                <td>{trans.bookingId || "N/A"}</td>
                <td>{trans.carName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {transaction.length === 0 && (
          <Alert variant="warning">No transaction found.</Alert>
        )}
      </div>
    </Container>
  );
}

export default MyWallet;
