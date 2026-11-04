
# ==========================================
# STAGE 1: BUILD THE YOTI FRONTEND
# ==========================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the remaining application source code
COPY . .

# Compile the React application
RUN npm run build


# ==========================================
# STAGE 2: SERVE THE FRONTEND USING NGINX
# ==========================================

FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled frontend from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
