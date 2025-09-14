import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  List,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Select,
} from "antd";
import { addToCart, getAllProducts, getProductsByCategory, getCart, getProductById } from "../../API";
import { useParams } from "react-router-dom";
import AppFooter from "../../Components/Footer/index";
import LoadingOverlay from "../../Components/Loading/LoadingOverlay";

const { Meta } = Card;

const Home = () => {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const param = useParams();
  const categoryId = param.categoryId;
  const userId = 1;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (categoryId) {
          const res = await getProductsByCategory(categoryId);
          setItems(Array.isArray(res.products) ? res.products : []);
        } else {
          const res = await getAllProducts();
          setItems(Array.isArray(res) ? res : []);
        }
      } catch {
        message.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const reloadCart = async () => {
    const res = await getCart(userId);
    const products = res.carts?.[0]?.products || [];
    const productsWithDetails = await Promise.all(
      products.map(async (p) => {
        const product = await getProductById(p.id);
        return { ...product, quantity: p.quantity, total: product.price * p.quantity };
      })
    );
    setCartItems(productsWithDetails);
  };

  useEffect(() => {
    reloadCart();
  }, []);

  const getSortedItems = () => {
    if (!Array.isArray(items)) return [];
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aLower = a.title.toLowerCase();
      const bLower = b.title.toLowerCase();
      if (sortOrder === "az") return aLower.localeCompare(bLower);
      if (sortOrder === "za") return bLower.localeCompare(aLower);
      if (sortOrder === "lowHigh") return a.price - b.price;
      if (sortOrder === "highLow") return b.price - a.price;
      return 0;
    });
    return sortedItems;
  };

  return (
    <>
      <LoadingOverlay visible={loading} />

      <div className="productContainer">
        <div style={{ marginBottom: 16 }}>
          <Typography.Text>View items Sorted By: </Typography.Text>
          <Select
            onChange={(value) => setSortOrder(value)}
            defaultValue={"az"}
            style={{ width: 220, marginLeft: 8 }}
            options={[
              { label: "Alphabetically a-z", value: "az" },
              { label: "Alphabetically z-a", value: "za" },
              { label: "Price Low to High", value: "lowHigh" },
              { label: "Price High to Low", value: "highLow" },
            ]}
          />
        </div>

        <List
          loading={loading}
          grid={{ gutter: 16, column: 3 }}
          dataSource={getSortedItems()}
          renderItem={(product) => (
            <List.Item key={product.id}>
              <Badge.Ribbon
                className="itemCardBadge"
                text={`${product.discountPercentage}% OFF`}
                color="pink"
              >
                <Card
                  className="itemCard"
                  title={product.title}
                  cover={<Image className="itemCardImage" src={product.thumbnail} alt={product.title} />}
                  actions={[
                    <Rate allowHalf disabled value={product.rating} />,
                    <AddToCartButton item={product} userId={userId} onCartUpdate={reloadCart} />,
                  ]}
                >
                  <Meta
                    title={
                      <Typography.Paragraph>
                        Price: ${parseFloat(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                        <Typography.Text delete type="danger" style={{ marginLeft: 10 }}>
                          ${product.price}
                        </Typography.Text>
                      </Typography.Paragraph>
                    }
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
                        {product.description}
                      </Typography.Paragraph>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
        />
      </div>

     
    </>
  );
};

function AddToCartButton({ item, userId, onCartUpdate }) {
  const [loading, setLoading] = useState(false);
  const addProductToCart = async () => {
    setLoading(true);
    try {
      await addToCart(userId, item.id);
      message.success(`${item.title} has been added to Cart`);
      if (onCartUpdate) onCartUpdate();
    } catch {
      message.error("Failed to add item to Cart");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button type="link" onClick={addProductToCart} loading={loading}>
      Add to Cart
    </Button>
  );
}

export default Home;
