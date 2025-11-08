import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';

const Sensor = mongoose.model('Sensor');

describe('DELETE /api/sensors/:id', () => {
  let sensorId;

  beforeEach(async () => {
    const sensor = await Sensor.create({
      alias: 'Temperature Sensor',
      type: 'float',
    });
    sensorId = sensor._id.toString();
  });

  it('WHEN deleting existing sensor THEN returns 200 and removes sensor', async () => {
    const response = await request(app)
      .delete(`/api/sensors/${sensorId}`)
      .expect(200);

    expect(response.body.success).toBe(true);

    const deletedSensor = await Sensor.findById(sensorId);
    expect(deletedSensor).toBeNull();
  });

  it('WHEN deleting non-existent sensor THEN returns 404', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .delete(`/api/sensors/${nonExistentId}`)
      .expect(404);

    expect(response.body.error).toBeDefined();
  });

  it('WHEN deleting with invalid ID THEN returns 400', async () => {
    const response = await request(app)
      .delete('/api/sensors/invalid-id')
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  it('WHEN sensor is deleted THEN other sensors remain', async () => {
    const sensor2 = await Sensor.create({
      alias: 'Pressure Sensor',
      type: 'int',
    });

    await request(app)
      .delete(`/api/sensors/${sensorId}`)
      .expect(200);

    const remainingSensor = await Sensor.findById(sensor2._id);
    expect(remainingSensor).not.toBeNull();
    expect(remainingSensor.alias).toBe('Pressure Sensor');
  });
});
