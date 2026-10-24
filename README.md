# Anshu Kumar Jha — Portfolio

A premium, futuristic animated developer portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (https://nodejs.org — download LTS)
- npm (included with Node.js)

### Setup

```bash
# 1. Navigate to project folder
cd portfolio2

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output → dist/ folder
npm run preview  # Preview the production build locally
```

---

## 🎨 Personalizing Your Portfolio

### 1. Update Personal Links (Hero + Contact + Footer)

Open `src/components/Hero.jsx` and update:
```jsx
href="https://github.com/your-github-username"   // ← your actual GitHub
href="https://linkedin.com/in/your-linkedin-username"  // ← your LinkedIn
href="mailto:your.email@example.com"  // ← your email
```

Open `src/components/Contact.jsx` and update the constants at the top:
```jsx
const GITHUB_URL = 'https://github.com/YOUR_USERNAME';
const LINKEDIN_URL = 'https://linkedin.com/in/YOUR_USERNAME';
const EMAIL = 'your.actual.email@example.com';
```

Update the same links in `src/components/Footer.jsx`.

### 2. Update Project URLs

Open `src/data/projects.js` and replace placeholder URLs:
```js
liveUrl: 'https://your-actual-s3-bucket.s3-website.amazonaws.com',
githubUrl: 'https://github.com/your-username/your-repo',
```

For projects without live URLs, set `hasLive: false` and `liveUrl: null`.

### 3. Add Your Resume

1. Place your PDF at: `public/Anshu-Kumar-Jha-Resume.pdf`
2. Open `src/components/Resume.jsx`
3. Change `const RESUME_EXISTS = false;` → `const RESUME_EXISTS = true;`

### 4. Manage Certifications

Your verified certificates are located in `public/certificates/` and configured in `src/data/certifications.js`:
```js
export const certifications = [
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Cloud Practitioner Essentials',
    org: 'Amazon Web Services (AWS)',
    category: 'Cloud Computing',
    date: '2025',
    status: 'Completed',
    verified: true,
    fileUrl: '/certificates/AWS_Cloud_Practitioner.pdf',
    credentialUrl: null,
    // ...
  },
];
```

---

## ☁️ AWS S3 Deployment

### Option A: Manual S3 Upload

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create an S3 bucket:**
   - Go to AWS Console → S3 → Create bucket
   - Name: `anshu-portfolio` (must be unique)
   - Region: `ap-south-1` (Mumbai) or your preferred region
   - Uncheck "Block all public access" → confirm

3. **Enable static website hosting:**
   - Bucket → Properties → Static website hosting → Enable
   - Index document: `index.html`
   - Error document: `index.html` (for SPA routing)

4. **Add bucket policy for public read:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::anshu-portfolio/*"
     }]
   }
   ```

5. **Upload the `dist/` folder contents:**
   ```bash
   aws s3 sync dist/ s3://anshu-portfolio/ --delete
   ```
   Or manually drag-drop files in the S3 Console.

6. **Access your site:**
   - URL: `http://anshu-portfolio.s3-website.ap-south-1.amazonaws.com`

### Option B: CloudFront + S3 (Recommended for Production — HTTPS)

> **Why?** S3 static hosting is HTTP only. CloudFront adds HTTPS, CDN caching, and custom domain support.

1. Complete S3 setup above but **keep bucket private** (don't add public bucket policy)
2. Go to CloudFront → Create Distribution
3. Origin: your S3 bucket
4. Origin Access Control (OAC): create new
5. Default root object: `index.html`
6. Error pages: 403/404 → `/index.html` with 200 response code (SPA routing)
7. Update S3 bucket policy to allow CloudFront OAC (AWS generates this automatically)
8. After deploy, your URL: `https://d1234abcdef.cloudfront.net`
9. Optionally attach a custom domain via Route 53 + ACM certificate

### IAM Security Best Practices for Deployment

- Create a dedicated IAM user for deployments (not root)
- Attach only `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` permissions
- Use GitHub Secrets for credentials — **never hardcode AWS keys**
- Enable MFA on your AWS root account

---

## 🖥️ AWS EC2 Deployment (Ubuntu + Nginx)

### 1. Launch EC2 Instance

- AMI: Ubuntu Server 22.04 LTS (Free Tier eligible)
- Instance type: t2.micro (Free Tier) or t3.micro
- Key pair: Create/download a `.pem` key file
- Security Group rules:
  ```
  HTTP  | TCP | Port 80  | Source: 0.0.0.0/0 (anywhere)
  HTTPS | TCP | Port 443 | Source: 0.0.0.0/0
  SSH   | TCP | Port 22  | Source: YOUR_IP_ONLY (e.g. x.x.x.x/32)
  ```
  ⚠️ **Never open SSH to 0.0.0.0/0** — restrict to your IP.

### 2. Connect via SSH

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### 3. Install Nginx

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Build and Transfer Files

On your local machine:
```bash
npm run build
```

Transfer `dist/` to EC2:
```bash
scp -i your-key.pem -r dist/* ubuntu@YOUR_EC2_IP:/home/ubuntu/portfolio/
```

Or clone your repo on EC2 and build there:
```bash
sudo apt install nodejs npm -y
git clone https://github.com/your-username/portfolio.git
cd portfolio && npm install && npm run build
```

### 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste:
```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;  # or your domain

    root /var/www/portfolio;
    index index.html;

    # SPA routing — all paths serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

```bash
sudo mkdir -p /var/www/portfolio
sudo cp -r /home/ubuntu/portfolio/dist/* /var/www/portfolio/
sudo chown -R www-data:www-data /var/www/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t   # Test config
sudo systemctl reload nginx
```

### 6. Add HTTPS with Let's Encrypt (Optional)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
# Auto-renews — certbot handles renewal automatically
```

---

## 🔄 GitHub Actions CI/CD

The workflow at `.github/workflows/deploy.yml` automatically deploys on push to `main`.

### Setup GitHub Secrets

Go to your repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret Name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | e.g. `ap-south-1` |
| `S3_BUCKET_NAME` | e.g. `anshu-portfolio` |
| `CLOUDFRONT_DISTRIBUTION_ID` | (optional) CloudFront ID |

---

## 📁 Project Structure

```
portfolio2/
├── public/
│   ├── favicon.svg
│   └── Anshu-Kumar-Jha-Resume.pdf   ← Add your resume here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── LearningRoadmap.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Journey.jsx
│   │   ├── Certifications.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── projects.js
│   │   └── skills.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 📋 Remaining Placeholders to Replace

| File | What to Replace |
|---|---|
| `src/components/Hero.jsx` | GitHub URL, LinkedIn URL, Email |
| `src/components/Contact.jsx` | `GITHUB_URL`, `LINKEDIN_URL`, `EMAIL` constants |
| `src/components/Footer.jsx` | GitHub URL, LinkedIn URL, Email |
| `src/data/projects.js` | `liveUrl` and `githubUrl` for all projects |
| `src/components/Resume.jsx` | Set `RESUME_EXISTS = true` after adding PDF |
| `src/components/Certifications.jsx` | Add real certs to the `certifications` array |
| `public/` | Add `Anshu-Kumar-Jha-Resume.pdf` |

---

## 🛡️ Security Reminders

- ✅ Never put AWS access keys in source code
- ✅ Use GitHub Secrets or environment variables for credentials
- ✅ The contact form uses mailto — no personal data is stored
- ✅ External links use `rel="noopener noreferrer"`
- ✅ SSH restricted to your IP in Security Groups
- ✅ IAM least-privilege for deployment users

---

## 🧩 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations |
| Lucide React | Icons |

---

*Built by Anshu Kumar Jha — Cloud & DevOps Enthusiast*
