import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
} from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart, getProductById } from "../../API";

function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirt",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "Fragrances",
          },
        ]}
      />

      <AppCart />
    </div>
  );
  function AppCart() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const userId = 5; // define userId

    const reloadCart = async () => {
      const res = await getCart(userId);
      if (res.carts && res.carts.length > 0) {
        const productsWithDetails = await Promise.all(
          res.carts[0].products.map(async (p) => {
            const product = await getProductById(p.id);
            return {
              ...product,
              quantity: p.quantity,
              total: product.price * p.quantity,
            };
          })
        );
        setCartItems(productsWithDetails);
      } else {
        setCartItems([]);
      }
    };



    useEffect(() => {
      reloadCart();
    }, [userId]);

    const onConfirmOrder = (values) => {
      setCartDrawerOpen(false);
      setCheckoutDrawerOpen(false);
      message.success("Your Order has been placed successfully");

      localStorage.removeItem("cartItems");
      setCartItems([]);

    };
    return (
      <div>
        <Badge
          onClick={() => {
            setCartDrawerOpen(true);
          }}
          count={cartItems.length}
          className="shoppingCartIcon"
        >
          <ShoppingCartOutlined />
        </Badge>
        <Drawer
          open={cartDrawerOpen}
          onClose={() => {
            setCartDrawerOpen(false);
          }}
          title="Your Cart"
          styles={{ wrapper: { width: 500 } }}
        >
          <Table
            rowKey="id"
            pagination={false}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
              },
              {
                title: "Price",
                dataIndex: "price",
                render: (value) => {
                  return <span>${value}</span>;
                },
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                render: (value, record) => {
                  return (
                    <InputNumber
                      min={0}
                      defaultValue={value}
                      onChange={(val) => {
                        setCartItems((prev) =>
                          prev.map((cart) =>
                            record.id === cart.id
                              ? {
                                ...cart,
                                quantity: val,
                                total: cart.price * val,
                              }
                              : cart
                          )
                        );
                      }}
                    />
                  );
                },
              },
              {
                title: "Total",
                dataIndex: "total",
                render: (value) => {
                  return <span>${(value || 0).toFixed(2)}</span>;
                },
              },
            ]}
            dataSource={cartItems}
            summary={(data) => {
              const total = data.reduce((pre, current) => pre + (current.total || 0), 0);
              return (
                <tr>
                  <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
                    Total: ${total.toFixed(2)}
                  </td>
                </tr>
              );
            }}

          />
          <Button
            onClick={() => {
              setCheckoutDrawerOpen(true);
            }}
            type="primary"
          >
            {" "}
            Checkout Your Cart
          </Button>
        </Drawer>

        {/* Confirm order comment */}

        <Drawer
          open={checkoutDrawerOpen}
          onClose={() => {
            setCheckoutDrawerOpen(false);
          }}
          title="Confirm Order"
        >
          <Form onFinish={onConfirmOrder}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Full Name",
                },
              ]}
              label="Full Name"
              name="full_name"
            >
              <Input placeholder="Enter your full name.."></Input>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid  Email",
                },
              ]}
              label="Email"
              name="your_email"
            >
              <Input placeholder="Enter your Email.."></Input>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Address",
                },
              ]}
              label="Address"
              name="your_address"
            >
              <Input placeholder="Enter your Address.."></Input>
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked disabled>
                Cash on Delivery
              </Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Confirm Order
            </Button>
          </Form>
        </Drawer>
      </div>
    );
  }
}
export default AppHeader;
