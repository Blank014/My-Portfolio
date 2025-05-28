# GitHub Pages Deployment Guide

## Pre-deployment Checklist

1. **Update Personal Information**:
   - [ ] Replace placeholder contact information in README.md
   - [ ] Update the homepage URL in package.json with your GitHub username
   - [ ] Ensure all personal details are correct in the portfolio sections

2. **Test Locally**:
   - [ ] Run `npm start` and verify everything works
   - [ ] Test both desktop and mobile layouts
   - [ ] Verify language switching works correctly
   - [ ] Check that all animations and 3D avatar function properly

3. **Prepare Repository**:
   - [ ] Create a new repository on GitHub named "My-Portfolio"
   - [ ] Push your code to the main branch

## Deployment Steps

1. **Update package.json homepage**:
   ```bash
   # Edit package.json and replace "yourusername" with your GitHub username
   "homepage": "https://yourusername.github.io/My-Portfolio"
   ```

2. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save settings

5. **Access your portfolio**:
   Your site will be available at: `https://yourusername.github.io/My-Portfolio`

## Troubleshooting

### Common Issues:

**404 Error on GitHub Pages:**
- Ensure the homepage URL in package.json matches your repository name exactly
- Make sure GitHub Pages is configured to use the gh-pages branch

**Build Errors:**
- Check for any console errors during `npm run build`
- Ensure all dependencies are installed: `npm install`

**3D Avatar Not Loading:**
- Verify that `avatar.glb` is in the public folder
- Check browser console for loading errors

**Styles Not Loading:**
- Clear browser cache
- Verify all CSS files are properly imported

## Updates

To update your deployed portfolio:

1. Make your changes locally
2. Test with `npm start`
3. Commit changes: `git add . && git commit -m "Update description"`
4. Push to main: `git push origin main`
5. Redeploy: `npm run deploy`

Your changes will be live within a few minutes!
