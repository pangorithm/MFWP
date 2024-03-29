import qs from "qs";
import client from "./client";

export const listProducts = ({ page, category, userId }) => {
  const queryString = qs.stringify({
    page,
    category,
    userId,
  });
  return client.get(`/api/auction?${queryString}`);
};

export const registProduct = ({
  name,
  category,
  img,
  explanation,
  price,
  terminatedAt,
}) => {
  return client.post("/api/auction/product", {
    name,
    category,
    img,
    explanation,
    price,
    terminatedAt,
  });
};

export const participateAuction = (productId) => {
  return client.get(`/api/auction/product/${productId}`);
};

export const bid = ({ productId, bid, msg }) => {
  return client.post(`/api/auction/product/${productId}/bid`, { bid, msg });
};

export const removeProduct = (productId) =>
  client.delete(`/api/auction/${productId}`);
