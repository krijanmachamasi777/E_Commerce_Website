import React from "react";
import { Spin, Typography } from "antd";
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",            // full height
  backgroundColor: "#ffffff", // solid black
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,               // make sure it overlays everything
};

const spinnerWrapperStyle = {
  padding: "30px 40px",
  backgroundColor: "#ffffff", // solid white container for spinner
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};

const LoadingOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <div style={overlayStyle}>
      <div style={spinnerWrapperStyle}>
        <Spin size="large" />
        <Typography.Title level={5} style={{ marginTop: 16 }}>
          Loading Products...
        </Typography.Title>
      </div>
    </div>
  );
};

export default LoadingOverlay;
