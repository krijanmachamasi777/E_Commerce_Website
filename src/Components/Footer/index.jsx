import { Typography, Row, Col } from "antd";

function AppFooter() {
  return (
    <div className="appFooter">
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={12} md={6}>
          <Typography.Title level={5}>Customer Service</Typography.Title>
          <Typography.Link href="#">Privacy Policy</Typography.Link>
          <br />
          <Typography.Link href="#">Terms & Conditions</Typography.Link>
          <br />
          <Typography.Link href="#">Return Policy</Typography.Link>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Typography.Title level={5}>Contact Us</Typography.Title>
          <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
          <br />
          <Typography.Link href="mailto:support@store.com">
            support@store.com
          </Typography.Link>
        </Col>

        <Col xs={24} sm={24} md={6}>
          <Typography.Title level={5}>Follow Us</Typography.Title>
          <div className="socialLinks">
            <Typography.Link href="#">Facebook</Typography.Link>
            <Typography.Link href="#">Twitter</Typography.Link>
            <Typography.Link href="#">Instagram</Typography.Link>
          </div>
        </Col>
      </Row>

      <div className="footerBottom">
        <Typography.Text>
          © {new Date().getFullYear()} Krijan's Store. All rights reserved.
        </Typography.Text>
      </div>

      <style>{`
        .appFooter {
          background: #001529;
          color: #fff;
          padding: 40px 20px 20px 20px;
          font-size: 14px;
        }
        .appFooter a {
          color: #fff;
          margin-bottom: 5px;
          display: inline-block;
          transition: color 0.3s;
        }
        .appFooter a:hover {
          color: #1890ff;
        }
        .socialLinks a {
          margin-right: 15px;
        }
        .footerBottom {
          text-align: center;
          margin-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 15px;
          
        }
          .footerBottom .ant-typography {
  color: #fff;
  font-weight: 500;
}
        @media (max-width: 768px) {
          .appFooter {
            text-align: center;
          }
          .socialLinks a {
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default AppFooter;
