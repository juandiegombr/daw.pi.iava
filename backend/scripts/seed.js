import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

const sampleSensors = [
  {
    alias: "Motor 1 Temperature Sensor",
    type: "float",
  },
  {
    alias: "Hydraulic Pressure Sensor",
    type: "int",
  },
  {
    alias: "Main Valve Status",
    type: "boolean",
  },
  {
    alias: "Shaft A Vibration Sensor",
    type: "float",
  },
  {
    alias: "Cycle Counter",
    type: "int",
  },
  {
    alias: "Oil Level Sensor",
    type: "float",
  },
  {
    alias: "Safety Status",
    type: "boolean",
  },
  {
    alias: "Current Error Code",
    type: "string",
  },
  {
    alias: "Motor 2 RPM Sensor",
    type: "int",
  },
  {
    alias: "Ambient Temperature",
    type: "float",
  },
];

async function seed() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing sensors (optional - comment out if you want to keep existing data)
    console.log("🧹 Clearing existing sensors...");
    await Sensor.deleteMany({});
    console.log("✅ Existing sensors deleted");

    // Insert sample sensors
    console.log("🌱 Inserting sample sensors...");
    const result = await Sensor.insertMany(sampleSensors);
    console.log(`✅ ${result.length} sensors inserted successfully`);

    // Display inserted sensors
    console.log("\n📊 Inserted sensors:");
    result.forEach((sensor, index) => {
      console.log(`  ${index + 1}. ${sensor.alias} (${sensor.type})`);
    });

    console.log("\n🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Error during seed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
    process.exit(0);
  }
}

seed();
