# Industrial Sensor Monitoring Platform

**[Leer en Español](PROJECT_OVERVIEW_ES.md)**

## Project Vision

The Industrial Sensor Monitoring Platform is a real-time monitoring system designed to provide visibility into industrial machines and factory equipment through sensor data collection and visualization. This platform enables factory managers, maintenance teams, and operations personnel to monitor critical parameters from their industrial equipment in a centralized dashboard.

## The Problem

Modern industrial facilities have numerous machines and equipment with various sensors measuring critical parameters like temperature, pressure, vibration, and other metrics. However, managing and monitoring these sensors is often fragmented:

- **Scattered Information**: Sensor data is often isolated in individual machines or systems
- **Lack of Visibility**: No centralized view of all sensors across the facility
- **Manual Monitoring**: Operators must physically check equipment or navigate multiple systems
- **Delayed Response**: Issues may go unnoticed until equipment failure occurs
- **Data Silos**: Different machines use different monitoring systems

## Our Solution

An integrated web-based platform that provides:

### Centralized Sensor Management

A single interface to view and manage all sensors across your industrial facility. Register sensors from any machine or production line, specifying:

- **Sensor Alias**: Human-friendly name (e.g., "Conveyor Belt Motor Temperature")
- **Data Type**: Integer, Float, Boolean, or String values
- **Machine Association**: Which equipment or production line the sensor belongs to
- **Metadata**: Creation dates, last update times, and sensor status

### Real-Time Monitoring Dashboard

A responsive web interface that displays:

- **Active Sensors**: Quick overview of all registered sensors
- **Sensor Status**: Visual indicators showing sensor health and current state
- **Type Classification**: Color-coded badges for easy identification of data types
- **Quick Actions**: Edit sensor configurations or remove obsolete sensors

### Data Collection & Management

Built on a robust architecture that supports:

- **Multiple Data Types**: Support for numeric (int/float), boolean, and string sensor readings
- **Scalable Storage**: MongoDB database for efficient storage and retrieval
- **RESTful API**: Standard HTTP endpoints for sensor management
- **Future-Ready**: Architecture designed to support real-time data streaming

## Use Cases

### Manufacturing Floor Monitoring

**Scenario**: A manufacturing facility with 50+ machines, each with multiple sensors

**Solution**: Operators can:

- View all temperature sensors across production lines
- Identify which machines have critical sensors
- Quickly locate and manage sensor configurations
- Prepare infrastructure for real-time alerting

### Predictive Maintenance

**Scenario**: Maintenance team needs to track equipment health metrics

**Solution**: The platform provides:

- Central registry of all vibration and temperature sensors
- Historical tracking of sensor installations and changes
- Foundation for future predictive maintenance algorithms
- Quick identification of sensor coverage gaps

### Quality Control

**Scenario**: Quality assurance teams need to monitor production parameters

**Solution**: Enables:

- Tracking of all quality-related sensors (pressure, humidity, etc.)
- Verification of sensor coverage across production stages
- Management of sensor metadata for compliance
- Preparation for real-time quality monitoring

## Target Audience

- **Factory Managers**: Monitor overall facility health
- **Maintenance Teams**: Track equipment sensors for predictive maintenance
- **Operations Personnel**: View real-time production metrics
- **Quality Assurance**: Monitor quality-related sensors
- **Industrial Engineers**: Analyze sensor data for optimization

## Business Benefits

1. **Reduced Downtime**: Early detection of equipment issues
2. **Cost Savings**: Prevent expensive equipment failures
3. **Improved Efficiency**: Quick identification of performance bottlenecks
4. **Better Decision Making**: Data-driven insights from sensor analytics
5. **Compliance**: Centralized logging for regulatory requirements
6. **Scalability**: Grow from pilot project to facility-wide deployment

## Success Metrics

- Number of sensors registered and monitored
- Reduction in equipment downtime
- Faster response time to sensor alerts
- User adoption across facility teams
- System uptime and reliability
- API response times for sensor operations

## Contributing

This is an educational project developed as part of the DAW (Desarrollo de Aplicaciones Web) course.

## License

ISC

## Contact

Juan Diego Martín-Blas Ramos
