const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Replace with your friend's model API IP + PORT
const MODEL_API = "http://192.168.1.5:5000/predict";

// 🔹 Product Mapping
const productMap = {
  Flu: ["Tulsi Drops", "Amla Powder", "Giloy Juice"],
  Cold: ["Ginger Tea", "Honey Syrup"],
  Acidity: ["Triphala", "Aloe Vera Juice"]
};

// 🔹 Doctor Mapping
const doctorMap = {
  Flu: ["General Physician"],
  Cold: ["General Physician"],
  Acidity: ["Gastroenterologist"]
};

// 🔹 Lifestyle Mapping
const lifestyleMap = {
  Flu: ["Drink warm fluids", "Take rest"],
  Cold: ["Avoid cold drinks", "Stay warm"],
  Acidity: ["Avoid spicy food", "Eat light meals"]
};

// 🔹 API Route
app.post("/predict", async (req, res) => {
  try {
    const symptoms = req.body;

    // Call Python ML model
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

    // Get recommendations
    const products = productMap[disease] || ["No recommendation"];
    const doctors = doctorMap[disease] || ["General Physician"];
    const lifestyle = lifestyleMap[disease] || ["Maintain healthy routine"];

    // Send final response
    res.json({
      disease,
      confidence,
      products,
      doctors,
      lifestyle
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔹 Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});