const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/api/total-value", (req, res) => {
  const products = req.body;

  if (!Array.isArray(products)) {
    return res
      .status(400)
      .json({ error: "Invalid input format. Expected an array of products." });
  }

  const totalValue = products.reduce((total, product) => {
    const { price, quantity } = product;

    if (typeof price !== "number" || typeof quantity !== "number") {
      return res.status(400).json({
        error: "Each product must have 'price' and 'quantity' as numbers.",
      });
    }

    return total + price * quantity;
  }, 0);

  res.json({ totalValue });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
