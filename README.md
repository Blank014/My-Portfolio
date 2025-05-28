# My Portfolio 🚀

A modern, interactive portfolio website built with React featuring 3D animations, multi-language support, and responsive design.

![Portfolio Preview](src/assets/images/Portfolio%20website.png)

## ✨ Features

- **3D Interactive Avatar**: Three.js powered 3D character with animations
- **Multi-language Support**: English and German translations with smooth transitions
- **Responsive Design**: Desktop and mobile optimized layouts
- **Dark/Light Theme**: Toggle between themes with smooth animations
- **Custom Cursor & Spotlight**: Interactive cursor effects and spotlight following
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Photo Gallery**: Interactive photo showcase with modal view
- **Skill Visualization**: Animated progress bars for skills
- **Loading Screen**: Elegant loading animation
- **Scroll Progress**: Visual scroll progress indicator

## 🛠️ Technologies

- **Frontend**: React 18, JSX
- **3D Graphics**: Three.js, React Three Fiber
- **Styling**: CSS3 with CSS Variables
- **Internationalization**: i18next, react-i18next
- **Animations**: CSS animations, transform transitions
- **Build Tool**: Create React App with custom config overrides

## 📁 Project Structure

```
My-Portfolio/
├── public/
│   ├── avatar.glb          # 3D avatar model
│   ├── index.html
│   └── ...
├── src/
│   ├── components/         # Reusable components
│   │   ├── shared/         # Shared UI components
│   │   └── PhotoGallery/   # Photo gallery component
│   ├── sections/           # Main page sections
│   ├── layouts/            # Layout components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS styling files
│   └── assets/             # Images and static assets
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

## 📱 Responsive Design

The portfolio automatically adapts to different screen sizes:
- **Desktop**: Two-column layout with fixed header
- **Mobile**: Single-column scrollable layout with sticky header

## 🌍 Internationalization

Switch between English and German with:
- Smooth language transition animations
- Persistent language preference
- Complete UI translation coverage

## 🎨 Customization

### Themes
The portfolio supports light and dark themes. Customize colors in the CSS variables:

```css
:root {
  --primary: #802BB1;
  --secondary: #9A4ECA;
  --background: #2D283E;
  /* ... more variables */
}
```

### 3D Avatar
Replace the `public/avatar.glb` file with your own 3D model. Ensure it includes animations named "Greeting" and "Sitting" for optimal experience.

## 📦 Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🚀 Deployment

### GitHub Pages (Recommended)

This portfolio is configured for easy deployment to GitHub Pages:

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/My-Portfolio"
   ```
   Replace `yourusername` with your actual GitHub username.

2. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages** in your repository settings:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

Your portfolio will be available at: `https://yourusername.github.io/My-Portfolio`

### Other Deployment Options

Build the project for production:

```bash
npm run build
```

The `build` folder contains the optimized production build ready for deployment to any static hosting service.

- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your Git repository
- **Heroku**: Deploy with buildpack

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This is a personal portfolio project. All rights reserved.

---

⭐ Star this repository if you found it helpful!
