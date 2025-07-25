# 🛍️ Teslo Shop

A modern and complete e-commerce application built with **Next.js**, **TypeScript**, and **MongoDB**. Teslo Shop offers a seamless shopping experience with secure authentication, cart management, and order processing.

## ✨ Features

- 🔐 **Complete Authentication** - Login/register with credentials and OAuth (GitHub)
- 🛒 **Shopping Cart** - Smart product and quantity management
- 📱 **Responsive Design** - Optimized for mobile and desktop devices
- 🏷️ **Categorization** - Products organized by gender (Men, Women, Kids)
- 🔍 **Advanced Search** - Find products by name, description, or tags
- 📦 **Order Management** - Complete purchase history and payment status
- 🎨 **Modern UI** - Elegant interface with Material-UI
- ⚡ **SSR/SSG Optimization** - Superior performance with Next.js

## 🛠️ Tech Stack

- **Frontend**: Next.js 12, React 18, TypeScript
- **UI/UX**: Material-UI (MUI), CSS Modules
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, NextAuth.js with multiple providers
- **State Management**: Context API with useReducer
- **Validation**: React Hook Form
- **Deployment**: Optimized for Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Docker (for local MongoDB)
- Yarn or npm

### 1. Clone the repository

```bash
git clone <repository-url>
cd teslo-shop
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Configure environment variables

Copy the template file and configure the variables:

```bash
cp .env.template .env
```

Edit the `.env` file with your values:

```env
MONGO_URL=mongodb://localhost:27017/teslodb
NEXT_PUBLIC_TAX_RATE=0.15
JWT_SECRET_SEED=your-super-secure-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth Providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 4. Start the database

```bash
docker-compose up -d
```

### 5. Seed the database

```bash
yarn dev
# Then visit: http://localhost:3000/api/seed
```

### 6. Ready! 🎉

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```text
teslo-shop/
├── 📁 components/          # Reusable components
│   ├── 🛒 cart/           # Cart components
│   ├── 🏗️ layouts/        # Page layouts
│   ├── 📦 products/       # Product components
│   └── 🎨 ui/             # UI components
├── 📁 context/            # React contexts (Auth, Cart, UI)
├── 📁 database/           # DB configuration and helpers
├── 📁 hooks/              # Custom hooks
├── 📁 interfaces/         # TypeScript definitions
├── 📁 models/             # Mongoose models
├── 📁 pages/              # Next.js pages and API routes
├── 📁 public/             # Static files
├── 📁 styles/             # Global styles
├── 📁 themes/             # MUI theme configuration
└── 📁 utils/              # Utility functions
```

## 🔧 Available Scripts

```bash
yarn dev          # Local development
yarn build        # Production build
yarn start        # Production server
yarn lint         # ESLint linting
```

## 🌟 Key Features

### Authentication and Authorization

- Registration and login with credentials
- GitHub OAuth integration
- Route protection with middleware
- Session management with NextAuth.js

### Product Management

- Complete catalog with category filters
- Real-time search
- Inventory and size management
- Optimized images with slideshow

### Cart and Orders

- Persistent cart with cookies
- Automatic tax calculation
- Complete checkout process
- Order history

## 🔒 Security

- Secure JWT authentication
- Client and server data validation
- Integrated CSRF protection
- Input sanitization

## 📈 Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Image lazy loading
- Automatic bundle optimization

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ using Next.js and TypeScript
