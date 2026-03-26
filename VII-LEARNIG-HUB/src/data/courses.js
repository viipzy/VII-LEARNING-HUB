export const COURSE_DB = {
  web2: {
    title: "Full-Stack Web2 Engineering",
    level: "Beginner to Pro",
    lessons: [
      {
        id: "w2-1",
        title: "HTML5 Semantic Structure",
        duration: "12:00",
        video: "https://www.youtube.com/embed/ok-plXXHlWw",
      },
      {
        id: "w2-2",
        title: "CSS3 Flexbox & Grid Mastery",
        duration: "18:00",
        video: "https://www.youtube.com/embed/fYq5PXgSsbE",
      },
      {
        id: "w2-3",
        title: "JavaScript ES6+ Fundamentals",
        duration: "25:00",
        video: "https://www.youtube.com/embed/W6NZfCO5SIk",
      },
      {
        id: "w2-4",
        title: "DOM Manipulation & Events",
        duration: "20:00",
        video: "https://www.youtube.com/embed/y17RuWkWdn8",
      },
      {
        id: "w2-5",
        title: "Asynchronous JS & APIs",
        duration: "30:00",
        video: "https://www.youtube.com/embed/drK63S7Hdb8",
      },
      {
        id: "w2-6",
        title: "React Components & Props",
        duration: "22:00",
        video: "https://www.youtube.com/embed/Ke90Tje7VS0",
      },
      {
        id: "w2-7",
        title: "State Management (Hooks)",
        duration: "28:00",
        video: "https://www.youtube.com/embed/O6P86uwfdO0",
      },
      {
        id: "w2-8",
        title: "Node.js & Express Backend",
        duration: "35:00",
        video: "https://www.youtube.com/embed/Oe421EPjeBE",
      },
      {
        id: "w2-9",
        title: "Database Integration (MongoDB)",
        duration: "40:00",
        video: "https://www.youtube.com/embed/pWbMrx5rVBE",
      },
      {
        id: "w2-10",
        title: "Deployment & CI/CD Pipelines",
        duration: "15:00",
        video: "https://www.youtube.com/embed/22-X70AnYHo",
      },
    ],
  },
  uiux: {
    title: "Premium UI/UX Design Strategy",
    level: "Intermediate",
    lessons: [
      {
        id: "ui-1",
        title: "Design Thinking Framework",
        duration: "15:00",
        video: "https://www.youtube.com/embed/6_9Z6p8XWkY",
      },
      {
        id: "ui-2",
        title: "User Research & Personas",
        duration: "20:00",
        video: "https://www.youtube.com/embed/H6u0H6mN8sI",
      },
      {
        id: "ui-3",
        title: "Wireframing in Figma",
        duration: "25:00",
        video: "https://www.youtube.com/embed/jwCm9v4GkR0",
      },
      {
        id: "ui-4",
        title: "Typography & Color Theory",
        duration: "18:00",
        video: "https://www.youtube.com/embed/7V6VfXn4P-Y",
      },
      {
        id: "ui-5",
        title: "Auto-Layout & Components",
        duration: "30:00",
        video: "https://www.youtube.com/embed/kyI3L6rMscY",
      },
      {
        id: "ui-6",
        title: "Prototyping Interactions",
        duration: "22:00",
        video: "https://www.youtube.com/embed/L_f7yM0p478",
      },
      {
        id: "ui-7",
        title: "Accessibility (WCAG) Standards",
        duration: "15:00",
        video: "https://www.youtube.com/embed/8-W7Z2w7oXY",
      },
      {
        id: "ui-8",
        title: "Mobile-First Design Patterns",
        duration: "20:00",
        video: "https://www.youtube.com/embed/9G3Xm-6G6E8",
      },
      {
        id: "ui-9",
        title: "Design Systems & Handover",
        duration: "35:00",
        video: "https://www.youtube.com/embed/fWf6Xn4XyXc",
      },
      {
        id: "ui-10",
        title: "UX Audit & Testing",
        duration: "40:00",
        video: "https://www.youtube.com/embed/5O18V0pW5Ww",
      },
    ],
  },
  web3: {
    title: "Blockchain & Web3 Development",
    level: "Advanced",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `w3-${i}`,
      title: `Web3 Module Part ${i + 1}`,
      duration: "20:00",
      video: "https://www.youtube.com/embed/gyMwXuJrbB0",
    })),
  },
  "data-analysis": {
    title: "Data Science & Analysis",
    level: "Intermediate",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `da-${i}`,
      title: `Data Analytics Part ${i + 1}`,
      duration: "25:00",
      video: "https://www.youtube.com/embed/ua-CiDNNj30",
    })),
  },
  forex: {
    title: "Institutional Forex Trading",
    level: "Professional",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `fx-${i}`,
      title: `Forex Trading Part ${i + 1}`,
      duration: "30:00",
      video: "https://www.youtube.com/embed/SqcY0GlETPk",
    })),
  },
  cybersecurity: {
    title: "Ethical Hacking & Security",
    level: "Advanced",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `cs-${i}`,
      title: `Security Module Part ${i + 1}`,
      duration: "20:00",
      video: "https://www.youtube.com/embed/fN99WfB2pXk",
    })),
  },
};
