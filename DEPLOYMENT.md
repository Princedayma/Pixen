# Pixellens - Photography Platform Deployment Guide

## 🚀 Deployment Architecture

- **Backend**: Django REST Framework on Azure Container Apps
- **Frontend**: Next.js on Azure Static Web Apps
- **Database**: Azure PostgreSQL Flexible Server
- **Cache**: Redis (Azure Cache for Redis)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## 📋 Prerequisites

1. Azure account with active subscription
2. GitHub account
3. Docker Desktop installed
4. Azure CLI installed
5. Git installed

## 🏗️ Azure Resources Setup

### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name pixellens-rg --location eastus

# Create Azure Container Registry
az acr create --resource-group pixellens-rg --name pixellensacr --sku Basic

# Create Azure Container Apps environment
az containerapp env create \
  --name pixellens-env \
  --resource-group pixellens-rg \
  --location eastus

# Create Azure Cache for Redis (optional if using existing)
az redis create \
  --resource-group pixellens-rg \
  --name pixellens-redis \
  --location eastus \
  --sku Basic \
  --vm-size c0

# Your PostgreSQL database already exists: pixen-db.postgres.database.azure.com
```

### 2. Create Azure Container App for Backend

```bash
# Get ACR credentials
ACR_USERNAME=$(az acr credential show --name pixellensacr --query username -o tsv)
ACR_PASSWORD=$(az acr credential show --name pixellensacr --query passwords[0].value -o tsv)

# Create container app
az containerapp create \
  --name pixellens-backend-app \
  --resource-group pixellens-rg \
  --environment pixellens-env \
  --image pixellensacr.azurecr.io/pixellens-backend:latest \
  --target-port 8000 \
  --ingress external \
  --registry-server pixellensacr.azurecr.io \
  --registry-username $ACR_USERNAME \
  --registry-password $ACR_PASSWORD \
  --env-vars \
    DJANGO_SECRET_KEY=secretvalue \
    DJANGO_DEBUG=False \
    DJANGO_ALLOWED_HOSTS=pixellens-backend-app.azurecontainerapps.io \
    DB_NAME=postgres \
    DB_USER=Prince@pixen-db \
    DB_PASSWORD=@Azure23! \
    DB_HOST=pixen-db.postgres.database.azure.com \
    DB_PORT=5432 \
    CORS_ALLOWED_ORIGINS=https://your-frontend.azurestaticapps.net \
    YOUTUBE_API_KEY=your-youtube-api-key \
  --cpu 1.0 \
  --memory 2Gi \
  --min-replicas 1 \
  --max-replicas 3
```

### 3. Create Azure Static Web App for Frontend

```bash
# Create static web app
az staticwebapp create \
  --name pixellens-frontend \
  --resource-group pixellens-rg \
  --location eastus2

# Get deployment token (save this for GitHub secrets)
az staticwebapp secrets list \
  --name pixellens-frontend \
  --resource-group pixellens-rg \
  --query properties.apiKey -o tsv
```

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### Backend Deployment Secrets:
- `AZURE_CREDENTIALS`: Azure service principal JSON
- `REGISTRY_USERNAME`: Azure Container Registry username
- `REGISTRY_PASSWORD`: Azure Container Registry password

### Frontend Deployment Secrets:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Token from Static Web App
- `BACKEND_URL`: `https://pixellens-backend-app.azurecontainerapps.io/api`

### Get Azure Credentials:

```bash
az ad sp create-for-rbac \
  --name "pixellens-github-actions" \
  --role contributor \
  --scopes /subscriptions/<your-subscription-id>/resourceGroups/pixellens-rg \
  --sdk-auth
```

Copy the JSON output and add it as `AZURE_CREDENTIALS` secret.

## 🐳 Local Development with Docker

```bash
# Start all services locally
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Access services:
# - Backend: http://localhost:8000
# - Frontend: http://localhost:3000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
```

## 📦 Manual Deployment

### Build and Push Backend Docker Image:

```bash
cd pixellens_django

# Build image
docker build -t pixellensacr.azurecr.io/pixellens-backend:latest .

# Login to ACR
az acr login --name pixellensacr

# Push image
docker push pixellensacr.azurecr.io/pixellens-backend:latest

# Update container app
az containerapp update \
  --name pixellens-backend-app \
  --resource-group pixellens-rg \
  --image pixellensacr.azurecr.io/pixellens-backend:latest
```

### Deploy Frontend:

```bash
cd pixellens-frontend

# Install dependencies
npm install

# Build
npm run build

# Deploy using Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli
swa deploy --deployment-token <your-token>
```

## 🔄 CI/CD with GitHub Actions

### Automatic Deployment:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Azure"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build Docker images
   - Push to Azure Container Registry
   - Deploy to Azure Container Apps
   - Run database migrations
   - Deploy frontend to Static Web Apps

### Workflows:

- `deploy-backend.yml`: Triggers on changes to `pixellens_django/`
- `deploy-frontend.yml`: Triggers on changes to `pixellens-frontend/`
- `ci.yml`: Runs tests on pull requests

## 📊 Monitoring

```bash
# View backend logs
az containerapp logs show \
  --name pixellens-backend-app \
  --resource-group pixellens-rg \
  --follow

# View backend metrics
az monitor metrics list \
  --resource /subscriptions/<sub-id>/resourceGroups/pixellens-rg/providers/Microsoft.App/containerApps/pixellens-backend-app \
  --metric Requests
```

## 🔧 Environment Variables

### Backend (.env for local):
```
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=pixellens
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432
CELERY_BROKER_URL=redis://redis:6379/0
CORS_ALLOWED_ORIGINS=http://localhost:3000
YOUTUBE_API_KEY=your-api-key
```

### Frontend (.env.local for local):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 🌐 Production URLs

After deployment:
- **Backend API**: `https://pixellens-backend-app.azurecontainerapps.io/api`
- **Frontend**: `https://pixellens-frontend.azurestaticapps.net`
- **API Docs**: `https://pixellens-backend-app.azurecontainerapps.io/api/schema/swagger-ui/`

## 📝 Post-Deployment Checklist

- [ ] Update `CORS_ALLOWED_ORIGINS` with production frontend URL
- [ ] Create superuser: `az containerapp exec --name pixellens-backend-app --resource-group pixellens-rg --command "python manage.py createsuperuser"`
- [ ] Add YouTube API key
- [ ] Configure custom domain and SSL
- [ ] Set up monitoring and alerts
- [ ] Configure backup for PostgreSQL database

## 🛠️ Troubleshooting

### Backend not starting:
```bash
# Check logs
az containerapp logs show --name pixellens-backend-app --resource-group pixellens-rg --follow

# Check container status
az containerapp show --name pixellens-backend-app --resource-group pixellens-rg
```

### Database connection issues:
- Verify PostgreSQL firewall rules allow Azure services
- Check connection string environment variables
- Ensure SSL is enabled: `OPTIONS: {'sslmode': 'require'}`

### Frontend API calls failing:
- Verify CORS configuration in backend
- Check `NEXT_PUBLIC_API_BASE_URL` environment variable
- Ensure backend URL is accessible

## 📚 Additional Resources

- [Azure Container Apps Documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
