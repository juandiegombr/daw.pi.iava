import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const SensorSchema = new mongoose.Schema(
  {
    alias: { type: String, required: true },
    type: {
      type: String,
      enum: ["int", "float", "boolean", "string"],
      required: true,
    },
  },
  { collection: "sensor", timestamps: true }
);

const Sensor = mongoose.model("Sensor", SensorSchema);

router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json({ data: { sensors } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();
    res.status(201).json({ data: { sensor } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { alias, type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid sensor ID" });
    }

    if (!alias && !type) {
      return res.status(400).json({ error: "At least one field (alias or type) must be provided" });
    }

    const updateData = {};
    if (alias !== undefined) updateData.alias = alias;
    if (type !== undefined) updateData.type = type;

    const sensor = await Sensor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!sensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.json({ data: { sensor } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid sensor ID" });
    }

    const sensor = await Sensor.findByIdAndDelete(id);

    if (!sensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;