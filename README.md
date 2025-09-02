# ContentHub

ContentHub is a modern, responsive, and customizable content dashboard that allows users to discover, organize, and interact with news, entertainment, sports, and finance content. Built with React, TypeScript, Vite, and Tailwind CSS, it features authentication, user preferences, and a beautiful UI.

---

## 🚀 Features

- 📰 Personalized dashboard for news, entertainment, sports, and finance
- 🔥 Trending content section
- ❤️ Favorites management
- ⚙️ User settings and preferences (dark mode, notifications, categories)
- 🔒 Authentication (login/signup, local storage based)
- 🌙 Dark mode support
- ⚡ Fast, responsive, and mobile-friendly UI
- 🧩 Modular component structure
- 🛠️ Built with React, TypeScript, Vite, Tailwind CSS

---

### Demo Video
[Demo](https://drive.google.com/file/d/1mh0vKC0EOCG1M5h5SJCpSzU9eUCqSm4e/view?usp=drive_link)



---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [shadcn/ui](https://ui.shadcn.com/) (UI components)
- [Lucide Icons](https://lucide.dev/) (icon set)

---

## 📦 Project Structure

```
contenthub/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context (Auth, etc.)
│   ├── data/              # Mock data
│   ├── pages/             # Page components (Dashboard, Trending, etc.)
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite config
```

---

---

## 🔐 Authentication
- Local storage based (no backend required)
- Signup and login with email and password
- User preferences are saved per user

---

## 🎨 Customization
- Easily add new content categories or UI themes
- Modify mock data in `src/data/mockContent.ts`
- Update Tailwind config for custom styles

---

## ☁️ Deployment
You can deploy the production build (`dist` folder) to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

---

## 🙏 Credits
- Built by Muskan for a job application round
- UI inspired by modern dashboard designs
- Icons by [Lucide](https://lucide.dev/)

---

## 📄 License
This project is for demonstration and job application purposes only.
