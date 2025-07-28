# Zero Earth - Interactive Logo Lattice

An interactive web application featuring a tessellated pattern of triangular logos overlaid on a farmer background image, with smooth hover effects and animations.

## 🎯 Features

### **Visual Design**
- **Background Image**: Full-screen black and white farmer image
- **Logo Lattice**: Tessellated pattern of triangular logos with 20% opacity
- **Hover Effects**: Smooth color transitions from monochrome to colored logos
- **Responsive Design**: Adapts to any screen size

### **Interactive Elements**
- **Proximity Hover**: Logos change color when mouse is within range
- **Smooth Transitions**: GSAP-powered animations with easing
- **Random Variations**: Each logo has unique rotation and scale
- **Performance Optimized**: Canvas-based rendering for smooth 60fps

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:advop-admin/zero-earth.git
cd zero-earth

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
zero-earth/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page component
│   ├── globals.css        # Global styles
│   └── globals.css        # Tailwind CSS
├── components/
│   ├── LogoLattice.js     # Main interactive component
│   └── DotGrid.js         # Original dot grid (legacy)
├── public/
│   └── assets/
│       ├── images/
│       │   └── farmer-background.jpg
│       └── logos/
│           ├── logo-colored.png
│           └── logo-monochrome.png
└── package.json
```

## 🎨 Component Usage

### LogoLattice Props

```jsx
<LogoLattice
  logoSize={80}              // Size of each logo in pixels
  gap={30}                   // Gap between logos
  baseOpacity={0.2}          // Default opacity (20%)
  hoverOpacity={1}           // Hover opacity (100%)
  transitionDuration={0.4}   // Animation duration in seconds
/>
```

### Example Implementation

```jsx
import LogoLattice from '../components/LogoLattice';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="w-full h-screen relative">
        <LogoLattice
          logoSize={80}
          gap={30}
          baseOpacity={0.2}
          hoverOpacity={1}
          transitionDuration={0.4}
        />
      </div>
    </main>
  );
}
```

## 🛠 Technical Implementation

### **Canvas Rendering**
- High-performance 2D canvas for smooth animations
- Device pixel ratio scaling for crisp display on all devices
- Efficient rendering with minimal reflows

### **Image Loading**
- Preloads all assets for smooth experience
- Loading states with spinner animation
- Error handling for missing assets

### **Animation System**
- GSAP for smooth, performant animations
- Inertia-based hover effects
- Optimized update cycles

### **Responsive Design**
- Tessellated pattern adapts to container size
- Maintains aspect ratios across devices
- Touch-friendly interactions

## 🎯 Design Specifications

### **Background Image**
- **Format**: JPG
- **Resolution**: 1920x1080px minimum
- **Style**: Black and white, high contrast
- **Content**: Farmer image

### **Logo Assets**
- **Colored Version**: Full-color triangular logo
- **Monochrome Version**: Single gray tone (20% opacity)
- **Format**: PNG with transparency
- **Size**: Scalable vector-based design

### **Color Scheme**
- **Background**: Black (#000000)
- **Monochrome Logos**: Gray with 20% opacity
- **Colored Logos**: Original brand colors
- **Overlay**: Subtle dark overlay for contrast

## 🔧 Customization

### **Modifying Logo Pattern**
Edit the `buildLattice` function in `LogoLattice.js` to change the tessellation pattern:

```javascript
// Triangular tessellation
const x = col * cellSize + (row % 2) * (cellSize / 2);
const y = row * cellSize * 0.866; // sin(60°)
```

### **Adjusting Hover Effects**
Modify the `handleMouseMove` function to change hover behavior:

```javascript
const hoverRadius = logoSize * 2; // Adjust hover range
```

### **Changing Animation Timing**
Update GSAP animation parameters:

```javascript
gsap.to(logo, {
  opacity: logo.isHovered ? hoverOpacity : baseOpacity,
  duration: transitionDuration,
  ease: "power2.out"
});
```

## 🚀 Performance Optimizations

- **Canvas-based rendering** for 60fps performance
- **Throttled mouse events** to prevent excessive updates
- **Efficient image loading** with proper caching
- **Minimal DOM manipulation** for smooth animations

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with Next.js, GSAP, and Tailwind CSS** 