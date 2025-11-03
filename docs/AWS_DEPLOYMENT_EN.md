# AWS Deployment Architecture

This document describes the AWS deployment infrastructure for the DAW Project, including frontend hosting, backend services, and continuous deployment workflows.

**[Leer en Español](docs/AWS_DEPLOYMENT_ES.md)**

## Architecture Overview

The application is deployed on AWS using a modern, scalable architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        CloudFront                           │
│                                                             │
│  ┌──────────────────────┐    ┌─────────────────────────┐    │
│  │   /* (Frontend)      │    │   /api/* (Backend)      │    │
│  │   ↓                  │    │   ↓                     │    │
│  │   S3 Bucket          │    │   EC2 Origin            │    │
│  └──────────────────────┘    └─────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
            ↑                              ↑
            │                              │
    ┌───────┴─────────┐          ┌─────────┴──────────┐
    │  GitHub Actions │          │  GitHub Actions    │
    │  (Frontend CD)  │          │  (Backend CD)      │
    └─────────────────┘          └────────────────────┘
```

**Key Benefits:**

- Single origin for frontend and backend (no CORS issues)
- Global CDN distribution via CloudFront
- Automatic HTTPS/SSL
- Automated deployments via GitHub Actions
- Cache invalidation on updates

---

## Initial setup for AWS

Before configuring GitHub Actions or creating AWS entities it is a good practice to create a user instead of creating them with the root user. To do this you need to create an IAM user with programmatic access and assign the necessary permissions.

1. Create IAM User
2. Set Permissions
3. Create Access Keys and store them in a local storage.
   - **Access key ID**: Something like `AKIAIOSFODNN7EXAMPLE`
   - **Secret access key**: Something like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
4. Configure the `aws` cli with `aws configura --profile my-user`

## Frontend Infrastructure

### **S3:**

- **Bucket name**: `daw-pi-iava-frontend`
- **Purpose**: Static website hosting for React build artifacts
- **Configuration:**
  - Static website hosting enabled
  - Bucket policy allows CloudFront access
  - Not publicly accessible (CloudFront only)

### Deployment Process

**Trigger:** Automatic on push to `main` branch when frontend files change, or manual via `workflow_dispatch`

**Steps:**

1. Checkout repository
2. Setup Node.js (v22)
3. Install dependencies (`npm ci`)
4. Build React application (`npm run build`)
5. Configure AWS credentials
6. Sync build artifacts to S3 bucket (with `--delete` flag to remove old files)
7. Invalidate CloudFront cache for path `/*`

**Required GitHub Secrets:**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

---

## Backend Deployment

### **EC2 Instance:**

- Purpose: Host Node.js/Express API
- Process Manager: PM2 (process name: `api`)
- Repository Location: `~/daw.pi.iava/backend`
- Access: SSH key-based authentication

### EC2 Instance Setup

#### Initial Instance Configuration

1. **Launch EC2 Instance:**

   - AMI: Amazon Linux 2 or Ubuntu 22.04
   - Instance Type: t2.micro or larger
   - Security Group: Allow HTTP (80), HTTPS (443), SSH (22)
   - Key Pair: Create and download for SSH access

2. **Install Dependencies:**

```bash
ssh -i your-key.pem <UBUNTU_USER>@<EC2_PUBLIC_IP>

sudo apt update -y
sudo apt upgrade -y
sudo apt install -y curl git build-essential

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pm2
```

3. **Clone Repository:**

```bash
cd ~
git clone <repository-url> daw.pi.iava
cd daw.pi.iava/backend
npm install
```

4. **Setup PM2:**

```bash
pm2 start src/index.js --name api
pm2 startup
pm2 save
```

#### Security Group Configuration

```
Inbound Rules:
- Type: SSH, Port: 22, Source: Your IP or 0.0.0.0/0
- Type: HTTP, Port: 80, Source: 0.0.0.0/0
- Type: Custom TCP, Port: 3000, Source: CloudFront IPs (or security group)
```

### Deployment Process

**Trigger:** Automatic on push to `main` branch when backend files change, or manual via `workflow_dispatch`

**Steps:**

1. SSH into EC2 instance
2. Navigate to backend directory (`~/daw.pi.iava/backend`)
3. Pull latest code from `main` branch
4. Install/update dependencies (`npm install`)
5. Restart PM2 process (`pm2 restart api`)
6. Save PM2 configuration (`pm2 save`)
7. Invalidate CloudFront cache for `/api/*` paths

**Required GitHub Secrets:**

- `AWS_EC2_HOST` - EC2 instance public IP/hostname
- `AWS_EC2_USER` - SSH username (typically `ec2-user` or `ubuntu`)
- `AWS_EC2_SSH` - Private SSH key for authentication
- `AWS_ACCESS_KEY_ID` - For CloudFront invalidation
- `AWS_SECRET_ACCESS_KEY` - For CloudFront invalidation
- `AWS_REGION` - AWS region

---

## CloudFront Configuration

### Distribution Setup

CloudFront serves as the unified entry point for both frontend and backend, providing:

- Single domain/origin (eliminates CORS complexity)
- HTTPS/SSL termination
- Global caching and CDN
- DDoS protection

### Origins

**Origin 1: S3 Bucket (Frontend)**

- Origin Domain: `daw-pi-iava-frontend.s3.amazonaws.com`
- Origin Access: Origin Access Control (OAC) recommended
- Protocol: HTTPS only

**Origin 2: EC2 Instance (Backend)**

- Origin Domain: `<ec2-public-ip-or-domain>`
- Origin Protocol: HTTP (port 3000)
- Custom Headers: Can add authentication headers if needed

### Behaviors

**Default Behavior (/):**

- Origin: S3 Bucket
- Viewer Protocol: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD
- Cache Policy: CachingOptimized or custom
- Compress Objects: Yes

**Path Pattern (/api/\*):**

- Origin: EC2 Instance
- Viewer Protocol: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
- Cache Policy: CachingDisabled (for API) or custom with short TTL
- Origin Request Policy: Forward all headers, query strings, cookies as needed

### Cache Invalidation

Both deployment workflows automatically invalidate CloudFront cache:

- Frontend: Invalidates `/*` (all files)
- Backend: Invalidates `/api/*` (API paths)

---

## Costs Estimate

**Monthly AWS Costs (approximate):**

- EC2 t2.micro: ~$8-10/month
- CloudFront: $0-5/month (low traffic)
- S3: <$1/month (minimal storage)
- Data Transfer: Variable based on traffic

**Total: ~$10-20/month** for low-to-moderate traffic

---
