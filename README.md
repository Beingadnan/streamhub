# StreamHub - Modern Video Platform

A professional, modern video streaming platform built with **Next.js 16**, **React 19**, **TypeScript**, and **YouTube Data API v3**. Features a clean black & white SaaS design with perfect mobile responsiveness across all devices.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Mobile](https://img.shields.io/badge/Mobile-Responsive-success?style=for-the-badge)

## ✨ Features

### 🎨 Modern Black & White SaaS Design
- **Professional Aesthetic** - Clean black & white color scheme
- **High Contrast** - Perfect readability in light and dark modes
- **Modern UI** - Contemporary design patterns and spacing
- **Smooth Animations** - Subtle, professional transitions
- **Accessibility** - WCAG 2.1 AA compliant design

### 📱 Fully Responsive
- **Mobile-First** - Optimized for all mobile devices
- **Touch-Optimized** - 44x44px minimum touch targets
- **Adaptive Layout** - Perfect on phones, tablets, and desktops
- **Hamburger Menu** - Mobile-friendly navigation
- **Responsive Grid** - 1-4 columns based on screen size

### 🎥 Core Features
- **Video Browsing** - Browse popular and trending videos
- **Advanced Search** - Search for videos using YouTube's API
- **Video Player** - Watch videos with embedded YouTube player
- **Video Details** - View statistics, descriptions, and channel info
- **Related Content** - Discover more from the same channel
- **Category Filters** - Browse by Music, Gaming, Sports, etc.
- **Dark Mode** - Automatic dark/light theme support
- **Fully Responsive** - Works seamlessly on all devices
- **Trending Page** - See what's hot right now

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Cloud Console account
- YouTube Data API v3 key

### Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Library**
4. Search for **YouTube Data API v3** and enable it
5. Go to **APIs & Services** > **Credentials**
6. Click **Create Credentials** > **API Key**
7. Copy your API key

### Step 2: Installation

```bash
# Navigate to the project directory
cd utube

# Install dependencies
npm install

# Create .env.local file and add your API key
echo "NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here" > .env.local
```

### Step 3: Configure API Key

Open `.env.local` and replace `your_api_key_here` with your actual YouTube API key:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
utube/
├── app/
│   ├── page.tsx              # Home page with trending videos
│   ├── layout.tsx            # Root layout with Navbar & Sidebar
│   ├── watch/
│   │   └── page.tsx          # Video player page
│   ├── search/
│   │   └── page.tsx          # Search results page
│   ├── trending/
│   │   └── page.tsx          # Trending videos page
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar with search
│   ├── Sidebar.tsx           # Sidebar navigation
│   ├── VideoCard.tsx         # Individual video card
│   ├── VideoGrid.tsx         # Grid layout for videos
│   ├── VideoPlayer.tsx       # YouTube embed player
│   ├── CategoryFilter.tsx    # Category filter buttons
│   └── LoadingSpinner.tsx    # Loading indicator
├── lib/
│   └── youtube.ts            # YouTube API utilities
├── .env.local               # Environment variables (create this)
└── package.json             # Dependencies
```

## 🛠️ Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router and Server Components
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Modern utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[YouTube Data API v3](https://developers.google.com/youtube/v3)** - Real video data
- **Glassmorphism Design** - Modern frosted glass effects
- **CSS Animations** - Smooth transitions and hover effects

## 📦 API Functions

The project includes the following YouTube API utility functions in `lib/youtube.ts`:

- `fetchPopularVideos()` - Get trending/popular videos
- `searchVideos()` - Search for videos by query
- `fetchVideoById()` - Get details of a specific video
- `fetchRelatedVideos()` - Get videos related to a video
- `fetchVideosByCategory()` - Get videos by category
- `formatViewCount()` - Format numbers (1M, 1K, etc.)
- `formatPublishedDate()` - Format dates (2 days ago, etc.)

## 🎯 Design Features

### Modern UI Components
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Gradient Buttons** - Eye-catching CTAs with purple-pink gradients
- **Animated Icons** - Smooth hover states and transitions
- **Hero Sections** - Beautiful landing sections on each page
- **Floating Elements** - Subtle floating animations
- **Gradient Text** - Multi-color gradient text effects

### Home Page
- Hero section with floating gradient orb
- Interactive category filter with icons
- Modern video cards with glassmorphism
- Hover effects with play button overlay
- Stats badges on thumbnails

### Search Page
- Beautiful empty states with gradient icons
- Search results with modern cards
- Smooth transitions

### Video Watch Page
- Glassmorphic video player container
- Modern channel subscription section
- Action buttons with glass effect
- Collapsible description panel
- Sticky related videos sidebar
- Comments placeholder

### Navigation
- Glassmorphic navbar with blur effect
- Compact icon-based sidebar
- Gradient logo with glow effect
- Search bar with gradient border on hover

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Comments integration
- [ ] Playlist functionality
- [ ] Channel pages
- [ ] Video upload (if building full backend)
- [ ] Like/dislike functionality with backend
- [ ] Subscription management
- [ ] Watch history
- [ ] Video recommendations based on history

## 📝 API Rate Limits

YouTube Data API v3 has a default quota of **10,000 units per day**. Each API call costs different units:

- Search: 100 units
- Videos list: 1 unit
- Video statistics: 1 unit

Monitor your quota in the [Google Cloud Console](https://console.cloud.google.com/).

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- YouTube Data API for providing video data
- Next.js team for the amazing framework
- Vercel for hosting solutions

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a clone project for educational purposes. All video content is fetched from YouTube's official API and belongs to their respective owners.
# streamhub
# streamhub
# streamhub
