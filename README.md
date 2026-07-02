<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGZtbzZud3lyNXhkOWFzMGp3ZTRudTgzbjcxeHFtd2drc3F3NWQwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkVDsPEvq/giphy.gif" alt="3D Architecture GIF" width="300"/>
  <h1>Wobb Vibe Coder Assignment 🚀</h1>
  <p><strong>Developed with ❤️ by Soumoditya Das</strong></p>
</div>

---

## 👋 Hello Wobb Team!

I'm **Soumoditya Das**, and I'm thrilled to present my solution for the **Vibe Coder** assignment. I approached this project not just as a coding test, but as a real-world product challenge. My goal was to deliver a 11/10 premium experience, focusing heavily on modern architectural patterns, strict type-safety, and a UI/UX that truly "vibes."

---

## 🏛️ High-Level 3D Architecture Design

I designed the architecture to be highly scalable, responsive, and decoupled. Here's a structural breakdown of the system:

```mermaid
graph TD;
    subgraph UI Layer
      A[SearchPage] --> B(PlatformFilter)
      A --> C(ProfileList)
      C --> D(ProfileCard)
      E[ProfileDetailPage] --> F(MetricCards)
      E --> G(VerifiedBadge)
    end
    
    subgraph Global State Management
      H[(Zustand Store)]
      H --> |State: platform, searchQuery, sortBy| A
      H --> |State: selectedProfiles| D
      H --> |Actions: addProfile, removeProfile| E
      H -.-> |Persist| I(Local Storage)
    end
    
    subgraph Utilities & Data
      J[dataHelpers.ts] --> |Extracts/Filters/Sorts| A
      K[profileLoader.ts] --> |Dynamic JSON Import| E
      L[Tailwind v4 / CSS] -.-> |Styles| UI Layer
    end
```

### Key Architectural Decisions:
1. **Global State via Zustand**: Rather than prop-drilling or dealing with React Context boilerplate, I introduced Zustand with the `persist` middleware. This instantly saves shortlisted profiles to `localStorage` without writing redundant code.
2. **Modular Utilities**: Logic like `filterProfiles`, sorting, and `extractProfiles` is extracted out of components. This keeps the UI completely declarative and makes testing a breeze.
3. **Optimized Renders**: Integrated `useMemo` hooks for heavy array operations like searching and sorting, preventing layout thrashing and unnecessary re-renders.

---

## ✨ Features & Enhancements

I took the liberty to add features that would make this app truly functional for influencer discovery:

- **Sort by Followers & Engagement Rate**: Brand-new sorting capabilities integrated directly alongside the platform filter.
- **Glassmorphism & Micro-Interactions**: Leveraged Tailwind and Framer Motion to create a premium, interactive "Vibe".
- **Cascading State Fixes**: Solved the `setState` cascading render bugs inside `ProfileDetailPage.tsx` by introducing safe, async `isMounted` checks.
- **Full Type-Safety**: Eliminated `any` types and enforced strict TypeScript interfaces across the entire application.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Framer Motion
- **State Management:** Zustand
- **Icons:** Lucide React
- **Language:** TypeScript

---

## 🚀 Running Locally

I've ensured everything runs perfectly right out of the box. To run the app locally:

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the development server
npm run dev
```

Thank you for reviewing my assignment! I can't wait to hear your feedback and discuss the architecture in more detail.

Best regards,  
**Soumoditya Das**
