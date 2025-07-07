import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./EditProfile.scss";
import { getUsersDetail, updateProfile } from "../../service/apiService"; // API service
import LoadingIcon from "../Loading";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [key, setKey] = useState("basic");
  const { account } = useSelector((state) => state.user);

  // Lấy `userId` từ Redux hoặc localStorage
  const userId = account?.id || localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Khởi tạo dữ liệu
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    dateOfBirth: "",
    phoneNo: "",
    email: "",
  });

  const [details, setDetails] = useState({
    nationalIdNo: "",
    drivingLicense: "",
    address: "",
  });

  const [password, setPassWord] = useState({
    password: "",
    repassword: "",
  });

  // Thêm state cho mật khẩu mới và xác nhận mật khẩu
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUsersDetail(userId);

        if (response?.statusCode === 200 && response.data) {
          setUser((prevUser) => ({
            ...prevUser,
            ...response.data,
          }));
          setBasicInfo({
            name: response.data.name || "",
            dateOfBirth: response.data.dateOfBirth || "",
            phoneNo: response.data.phoneNo || "",
            email: response.data.email || "",
          });
          console.log("Response data:", basicInfo);
          setDetails({
            nationalIdNo: response.data.nationalIdNo || "",
            drivingLicense: response.data.drivingLicense || "",
            address: response.data.address || "",
          });
        } else {
          console.error("Failed to fetch user detail.");
        }
      } catch (error) {
        console.error("Error fetching user detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (!userId) {
    return <p>No user ID found. Please login again.</p>;
  }

  // Cập nhật state cho Basic Info
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Cập nhật state cho Details
  const handleDetailsChange = (e) => {
    const { name, value, files } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const fetchUpdatedUser = async () => {
    const userDetailResponse = await getUsersDetail(userId);
    if (userDetailResponse?.statusCode === 200 && userDetailResponse.data) {
      setUser(userDetailResponse.data);
      setBasicInfo({
        name: userDetailResponse.data.name || "",
        dateOfBirth: userDetailResponse.data.dateOfBirth || "",
        phoneNo: userDetailResponse.data.phoneNo || "",
        email: userDetailResponse.data.email || "",
      });
      setDetails({
        nationalIdNo: userDetailResponse.data.nationalIdNo || "",
        drivingLicense: userDetailResponse.data.drivingLicense || "",
        address: userDetailResponse.data.address || "",
      });
    }
  };

  // Xử lý lưu thông tin
  const handleSave = async (section) => {
    try {
      if (section === "basic" || section === "details") {
        const response = await updateProfile(userId, basicInfo, details);

        if (response.statusCode === 200) {
          toast.success(
            `${section.charAt(0).toUpperCase() + section.slice(1)
            } information saved!`
          );
          setUser(response.data);
        } else {
          console.error(response.data?.message || "Failed to update profile.");
          toast.error("Failed to save information. Please try again.");
        }
      } else if (section === "security") {
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }

        const response = await updateProfile(
          userId,
          basicInfo,
          details,
          newPassword
        );

        if (response.statusCode === 200) {
          toast.success("Password updated successfully!");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          console.error(response.data?.message || "Failed to update password.");
          toast.error("Failed to update password. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Xử lý hủy thay đổi
  const handleDiscard = (section) => {
    if (section === "basic") {
      setBasicInfo({
        name: user?.name || "",
        dateOfBirth: user?.dateOfBirth || "",
        phoneNo: user?.phoneNo || "",
        email: user?.email || "",
      });
    }
    if (section === "details") {
      setDetails({
        nationalIdNo: user?.nationalIdNo || "",
        drivingLicense: user?.drivingLicense || "",
        address: user?.address || "",
      });
    }
    if (section === "password") {
      setPassWord({
        password: "",
        repassword: "",
      });
    }
  };

  return (
    <div className="big-container">
      <Container>
        <br />
        <h2>Edit Profile</h2>
        <div className="container mt-4">
          <Tabs
            id="edit-profile-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {/* Tab Basic Information */}
            <Tab eventKey="basic" title="Basic Information">
              <Table striped bordered hover className="mt-3">
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="name"
                        value={basicInfo.name}
                        onChange={handleBasicInfoChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date of Birth:</td>
                    <td>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={basicInfo.dateOfBirth}
                        onChange={handleBasicInfoChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="phoneNo"
                        value={basicInfo.phoneNo}
                        onChange={handleBasicInfoChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email Address:</td>
                    <td>
                      <Form.Control
                        type="email"
                        name="email"
                        value={basicInfo.email}
                        onChange={handleBasicInfoChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                style={{ marginRight: "10px" }}
                className="btn-submit"
                variant="secondary"
                onClick={() => handleDiscard("basic")}
              >
                Discard Changes
              </Button>
              <Button
                className="btn-submit"
                variant="warning"
                onClick={() => handleSave("basic")}
              >
                Save Basic Information
              </Button>
            </Tab>

            {/* Tab Details */}
            <Tab eventKey="details" title="Details">
              <Table striped bordered hover className="mt-3">
                <tbody>
                  <tr>
                    <td>National ID No.:</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="nationalIdNo"
                        value={details.nationalIdNo}
                        onChange={handleDetailsChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Driving License:</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="drivingLicense"
                        value={details.drivingLicense}
                        onChange={handleDetailsChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="address"
                        value={details.address}
                        onChange={handleDetailsChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                style={{ marginRight: "10px" }}
                className="btn-submit"
                variant="secondary"
                onClick={() => handleDiscard("details")}
              >
                Discard Changes
              </Button>
              <Button
                className="btn-submit"
                variant="warning"
                onClick={() => handleSave("details")}
              >
                Save Details
              </Button>
            </Tab>

            {/* Tab Security */}
            <Tab eventKey="security" title="Security">
              <Table striped bordered hover className="mt-3" style={{ maxWidth: 600 }}>
                <tbody>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <label htmlFor="newPassword" className="form-label mb-0">
                        New Password
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="confirmPassword" className="form-label mb-0">
                        Confirm Password
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="btn-submit"
                variant="warning"
                onClick={() => handleSave("security")}
              >
                Save Password
              </Button>
            </Tab>
          </Tabs>
        </div>
        <br></br>
      </Container>
    </div>
  );
};

export default EditProfile;
