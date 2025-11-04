# Quick Setup Guide

## 🚀 5-Minute Setup

### 1. Get Your YouTube API Key

1. Visit: https://console.cloud.google.com/
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create an **API Key** under Credentials
5. Copy the key

### 2. Add API Key to Project

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
```

### 3. Install & Run

```bash
npm install
npm run dev
```

### 4. Open Your Browser

Navigate to: http://localhost:3000

## ✅ Troubleshooting

### Issue: Videos Not Loading

**Solution**: Check if your API key is correct in `.env.local`

### Issue: API Quota Exceeded

**Solution**: You've hit the 10,000 units/day limit. Wait 24 hours or request a quota increase.

### Issue: Search Not Working

**Solution**: Make sure your API key has YouTube Data API v3 enabled.

## 📊 API Quota Usage

Each action costs units:
- Homepage load: ~1 unit
- Search: ~100 units
- Watch video: ~2 units

Daily limit: 10,000 units = ~100 searches or ~5,000 video views per day.

## 🎉 You're Done!

Your YouTube clone is ready to use. Enjoy exploring videos!

