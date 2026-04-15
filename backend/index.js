const cors = require("cors");
const express = require("express");
const fetch = require("node-fetch");
const { productMap } = require("./data/productMap");
const { doctorMap } = require("./data/doctorMap");
const { lifestyleMap } = require("./data/lifestyleMap");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Replace with your friend's model API IP + PORT
const MODEL_API = "http://192.168.1.5:5000/predict";

// 🔹 API Route
app.post("/predict", async (req, res) => {
  try {
    const symptoms = req.body;

    // 🔹 Call Python ML model
    const response = await fetch(MODEL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(symptoms)
    });

    const data = await response.json();

    const disease = data.disease || "Unknown";
    const confidence = data.confidence || 0;

    // 🔹 Get recommendations from imported maps
    const products = productMap[disease] || ["No recommendation"];
    const doctors = doctorMap[disease] || ["General Physician"];
    const lifestyle = lifestyleMap[disease] || ["Maintain healthy routine"];

    // 🔹 Final response
    res.json({
      disease,
      confidence,
      products,
      doctors,
      lifestyle
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔹 Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});