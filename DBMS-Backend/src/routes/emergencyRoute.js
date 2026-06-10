import express from "express";

const router = express.Router();

// Create emergency request
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, latitude, longitude, urgency } = req.body;

    res.json({
      message: "Emergency request received",
      data: { bloodGroup, latitude, longitude, urgency }
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }
});

export default router;