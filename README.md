# NAJM Course Backoffice

NAJM Course Backoffice is a web-based course management application designed to simplify the administration and management of learning content.

## 🧰 Features

- **User Management**: CRUD operations for users, including role and permission settings.
- **Course Management**: Create, update, and delete courses and learning modules.
- **Question Bank**: Manage a bank of questions for learner evaluations.
- **Statistics Dashboard**: Visualize user data and course activity.
- **Authentication and Authorization**: Login system with role-based access control.
- **API Integration**: Connect to backend services for data synchronization.

## ⚙️ Requirements

- Node.js LTS v22.15.0
- NVM (Node Version Manager) — for easily switching Node.js versions
- Docker & Docker Compose (optional) — for containerized development
- Vercel CLI (optional) — for deployment to Vercel

## 🚀 Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/maulanasdqn/najm-course-backoffice.git
   cd najm-course-backoffice
   ```

2. **Use the correct Node.js version**:

   ```bash
   nvm install 22.15.0
   nvm use 22.15.0
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Copy and configure environment file**:

   ```bash
   cp .env.example .env
   # Edit .env file as needed
   ```

5. **Run the app locally**:

   ```bash
   npm run dev
   ```

## 🐳 Using Docker (optional)

1. **Build and run the containers**:

   ```bash
   docker-compose up --build
   ```

2. **Access the application**:

   - `http://localhost:3000`

## 🧪 Testing

- **Run tests**:

  ```bash
  npm run test
  ```

## 📦 StoryBook

- **Run storybook**:

```bash
npm run storybook
```

## 📦 Deployment

- **Vercel**: This app can be deployed to Vercel with the provided configurations.

## 📄 License

This project is licensed under the MIT License.
