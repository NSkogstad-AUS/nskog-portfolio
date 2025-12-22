### Summary
This website is my personal portfolio, outlining the projects I've completed, experience I've gained, and journey I've followed.

### Current Build Screenshot
![Build Screenshot](/public/assets/sc-buildv2.png)

### Stack
- Next.js (App Router)
- React 18 + TypeScript
- Tailwind CSS and custom CSS
- GSAP for animations
- MapLibre GL for the map view
- next-view-transitions for navigation transitions

### Local Development
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Build for production: `npm run build`
4. Run the production build: `npm run start`

Node.js 18+ is required (see `package.json`).

### Environment Variables
- `GITHUB_TOKEN` (optional) - increases GitHub API rate limits for repo cards and recent commits.
- `NEXT_PUBLIC_MAPTILER_KEY` (optional) - set your own MapTiler key for the home page map.

### Project Structure
- `src/app` - App Router layout, routes, and global styles.
- `src/app/pages` - Page sections (home, about, projects).
- `src/app/components` - Shared UI components.
- `src/lib` - Data helpers (GitHub integration).
- `src/Imported Components` - Third-party or imported components.
- `public/assets` - Images and static media.

### Commit Messages
Use the following prefixes:
- `feat` - features
- `fix` - fixes
- `docs` - documentation changes
- `refactor` - code that neither fixes nor adds changes
- `chore` - tasks that do not change application logic
- `fun` - purely for fun

### Build Version
- 2