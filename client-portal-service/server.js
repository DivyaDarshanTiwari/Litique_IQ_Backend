// order-service/index.js
const express = require("express");
const communicator = require("../communicator");
const app = express();
const PORT = process.env.PORT || 3003;

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await communicator.getOrders();
    const users = await communicator.getUsers();
    const products = await communicator.getProducts();

    const detailedOrders = orders.orders.map((order) => {
      const user = users.users.find((user) => user.id === order.user_id);
      const product = products.products.find(
        (product) => product.id === order.product_id
      );
      return { ...order, user, product };
    });

    res.json({ orders: detailedOrders });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
