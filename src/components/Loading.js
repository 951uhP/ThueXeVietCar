import loading from "../assets/loading.gif";

const LoadingIcon = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <img
      src={loading}
      alt="Loading..."
      style={{ width: "50px", height: "50px" }}
    />
  </div>
);

export default LoadingIcon;
