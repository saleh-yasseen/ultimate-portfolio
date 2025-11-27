import { Testimonial } from "@/components/ui/animated-testimonials";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconGlobe,
} from "@tabler/icons-react";

export const DATA = {
  name: "Saif Mohamed",
  initials: "SM",
  url: "https://saifmohamedsv.vercel.app",
  location: "Alexandria, Egypt",
  locationLink: "https://www.google.com/maps/place/Alexandria",
  description:
    "Software Engineer & Mentor. I love building things and helping people. Very active on LinkedIn.",
  summary:
    "I'm a software engineer with a passion for building things and helping people. I'm very active on LinkedIn.",
  avatarUrl: "/me.jpeg",
  skills: [
    "HTML",
    "CSS",
    "Typescript",
    "React.js",
    "React Native",
    "Expo",
    "Next.js",
    "Node.js",
    "TailwindCSS",
    "Shadcn UI",
    "Magic UI",
    "Stripe",
    "Docker",
    "Python",
  ],
  navbar: [
    {
      title: "GitHub",
      href: "https://github.com/saifmohamedsv",
      icon: IconBrandGithub,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/saifmohamedsv/",
      icon: IconBrandLinkedin,
    },
    {
      title: "X",
      href: "https://x.com/saifmohamed_swe",
      icon: IconBrandX,
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/@SWEverse",
      icon: IconBrandYoutube,
    },
  ],
  contact: {
    email: "saifmohamed.dev@gmail.com",
    tel: "+201206944093",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/saifmohamedsv",
        icon: IconBrandGithub,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/saifmohamedsv/",
        icon: IconBrandLinkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/saifmohamed_swe",
        icon: IconBrandX,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@SWEverse",
        icon: IconBrandYoutube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:saifmohamed.dev@gmail.com",
        icon: IconMail,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Nzmly",
      href: "https://nzmly.com",
      badges: [],
      location: "Remote",
      title: "Full-stack (FE Heavy) Developer",
      logoUrl: "https://i.ibb.co/KjVN4Kjy/nzmly-logo.jpg",
      start: "Mar 2024",
      end: "Jan 2025",
      description:
        "Developed customer review and payout bank features using Next.js & GraphQL. Converted the dashboard into a PWA and added push notifications with Firebase. Wrote Jest tests for NestJS resolvers and enhanced the web app UI with new Figma designs.",
    },
    {
      company: "ActivePieces",
      href: "https://www.activepieces.com",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "https://i.ibb.co/Cs816WqW/activepieces-logo.jpg",
      start: "May 2024",
      end: "Oct 2024",
      description:
        "Created a CLI using TypeScript and OpenAI API to convert OpenAPI specs into ActivePieces. Built an AI copilot called http-request-writer. Improved OpenAI response time by optimizing prompt size and cleaning unnecessary HTML before Markdown conversion.",
    },
    {
      company: "Advert Leap",
      href: "https://www.advertleap.com",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "https://i.ibb.co/27FZjfwb/advertleap-logo.jpg",
      start: "Jan 2023",
      end: "Mar 2023",
      description:
        "I worked on the ON-Ruf project at ADVERT LEAP and developed new features, enhanced the UI of certain dashboard parts, and implemented APIs using React.js, Redux, and CSS.",
    },
    {
      company: "TAQNEEN",
      href: "https://dyafat.com",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "https://i.ibb.co/MHbt9t1/taqnen-logo.jpg",
      start: "Aug 2022",
      end: "Feb 2023",
      description:
        "Implemented hotel search and reservation features using plain JavaScript within a .NET app (Dyafat). Converted Figma designs into pixel-perfect UI and supported backend features with .NET.",
    },
    {
      company: "LNKR",
      href: "",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "https://i.ibb.co/Zp5xYSHG/lnkr-logo.jpg",
      start: "Feb 2022",
      end: "Jul 2022",
      description:
        "Expanded a Clinic Management System using React.js with features like appointments, drug interactions, e-prescriptions, and e-pharmacy. Integrated Django APIs and deployed the system on AWS.",
    },
    {
      company: "Springy Universe",
      href: "https://sporsepeti.app",
      badges: [],
      location: "Remote",
      title: "Junior Frontend Developer",
      logoUrl: "https://i.ibb.co/yBywy1X4/springyuniverse-logo.jpg",
      start: "Jul 2021",
      end: "Jun 2022",
      description:
        "Enhanced the Sporsepeti admin panel serving 13,000+ users using React.js & Redux. Integrated Node.js APIs and turned Figma designs into pixel-perfect UIs. Recognized as Employee of the Week four times while working in Agile/Sprint environments.",
    },
  ],
  education: [
    {
      school: "EL Zahraa Language School",
      href: "#",
      degree: "Primary - Preparatory - Secondary",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOZw9kRrdOdwmkXz_0_ghf12AvU01IXlfUw&s",
      start: "2006",
      end: "2020",
    },
    {
      school: "HIMIT",
      href: "#",
      degree: "Bachelor's Degree of Computer Science ( 3.2 GPA )",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcbE0gLERwHeKF-nwASZiIYQo4IL7zrKvlg&s",
      start: "2021",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Nzmly",
      href: "https://nzmly.com",
      dates: "2025",
      active: true,
      description:
        "Implemented NestJS APIs in NextJS apps. Created new components using chakra-ui & tailwindCSS. Re-designed number of modules from Figma UI/UX designs.",
      technologies: [
        "Next.js",
        "Typescript",
        "NestJS",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "Chakra-ui",
      ],
      links: [
        {
          type: "Website",
          href: "https://nzmly.com",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/LDrvgvCM/nzmly.png",
      video: "",
    },
    {
      title: "use-any-hook",
      href: "https://www.npmjs.com/package/use-any-hook",
      dates: "2025",
      active: true,
      description:
        "use-any-hook is a library designed to streamline state management and common functionality in React applications. It eliminates repetitive boilerplate, allowing developers to focus on building intuitive, scalable UIs.",
      technologies: [
        "React",
        "Hooks",
        "State Management",
        "npm",
        "Custom Hooks",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.npmjs.com/package/use-any-hook",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/r2G2pQFG/cover.png",
      video: "",
    },

    {
      title: "Toast System",
      href: "https://toast-system.vercel.app/",
      dates: "2025",
      active: true,
      description:
        "Toast System is a library designed to streamline state management and common functionality in React applications. It eliminates repetitive boilerplate, allowing developers to focus on building intuitive, scalable UIs.",
      technologies: [
        "React",
        "Hooks",
        "State Management",
        "npm",
        "Custom Hooks",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://toast-system.vercel.app/",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/ymKSTzBZ/toast-system.png",
      video: "",
    },
    {
      title: "Personal Portfolio",
      href: "https://saifmohamedsv.vercel.app",
      dates: "2025",
      active: true,
      description:
        "A website that showcases my projects, skills, experience and blog.",
      technologies: ["Next.js", "Typescript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://saifmohamedsv.vercel.app",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/5WjLjVHF/portfolio.png",
      video: "",
    },
    {
      title: "Gold Profit Tracker",
      href: "https://gold-profit.vercel.app/",
      dates: "2025",
      active: true,
      description:
        "Gold is a website that allows you to track gold prices and calculate gold profit.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "DaisyUI",
        "goldAPI.io",
      ],
      links: [
        {
          type: "Website",
          href: "https://gold-profit.vercel.app/",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/CsNBKwrh/gold.png",
      video: "",
    },
    {
      title: "Dulist",
      href: "https://task-manager-saif-mohamed.vercel.app/",
      dates: "",
      active: true,
      description:
        "Dulist is a task management application designed to streamline productivity. With Dulist, users can efficiently manage their tasks and deadlines using an intuitive interface. It leverages powerful tools and frameworks to provide a responsive and robust experience.",
      technologies: [
        "Next.js",
        "Typescript",
        "Material UI",
        "Vite.js",
        "Redux",
      ],
      links: [
        {
          type: "Website",
          href: "https://task-manager-saif-mohamed.vercel.app/",
          icon: <IconGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/saifmohamedsv/Dulist---Task-Management/tree/main",
          icon: <IconBrandGithub className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/hJgn6QrG/cover.jpg",
      video: "",
    },
    {
      title: "Ball Spin",
      href: "https://spin-the-ball.vercel.app/",
      dates: "",
      active: true,
      description:
        "Ball Spin is a game that allows you to spin a ball in a three dimensional space.",
      technologies: ["React.js", "TailwindCSS", "Three.js"],
      links: [
        {
          type: "Website",
          href: "https://spin-the-ball.vercel.app/",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/Q389VWy8/ball-spin.png",
      video: "",
    },
    {
      title: "Chatty",
      href: "https://chatty-pink.vercel.app/",
      dates: "",
      active: true,
      description:
        "Chatty is a chat application that allows you to chat with your friends.",
      technologies: ["React.js", "CSS", "Socket.io"],
      links: [
        {
          type: "Website",
          href: "https://chatty-pink.vercel.app/",
          icon: <IconGlobe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/5D42yCZ/chatty.png",
      video: "",
    },
  ],
  testimonials: [
    {
      quote:
        "Saif is one of the most professional, elegant, and super motivated software engineers I've worked with. besides his passion for design and new technologies, his personal and communication skills are amazing.",
      name: "Abdelrahman Fekri",
      designation: "Senior Software Engineer at Dyne",
      src: "https://plus.unsplash.com/premium_photo-1711044006683-a9c3bbcf2f15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      quote:
        "Saif is one of the most professional, elegant, and super motivated software engineers I've worked with. besides his passion for design and new technologies, his personal and communication skills are amazing.",
      name: "Hossam Gamal",
      designation: "Senior Frontend Developer at 1GLOBAL",
      src: "https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "I had the pleasure of working with Saif, and his talent and dedication as a software engineer are truly remarkable. His ability to tackle complex problems with innovative solutions made a significant impact on our AI automation tasks.",
      name: "Kishan Parmar",
      designation: "Community Engineer at Activepieces",
      src: "https://plus.unsplash.com/premium_photo-1739178656495-8109a8bc4f53?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "Saif is a very hard working talented software engineer whom I was glad to be a colleague of, he has a very bright future ahead I am sure of it.",
      name: "Abdel-rahman Al-hussein",
      designation: "Software Engineer at Activepieces",
      src: "https://plus.unsplash.com/premium_photo-1739178656567-068b26a4b979?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "Saif excels at writing clean and organized code, adding cool features, and keeping up to date with modern technologies.",
      name: "Mahmoud Adel",
      designation: "Frontend Developer at Qabilah",
      src: "https://plus.unsplash.com/premium_photo-1739538269098-5920918f31a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "Saif is an excellent experienced frontend developer proficient at solving problems and searching. I highly recommend him to join any professional team.",
      name: "Dina Elorbany",
      designation: "Frontend Developer at Derayah Financial",
      src: "https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "Saif is really hard-working and motivated person he loves his work and getting better everyday",
      name: "karim Alaskary",
      designation: "Frontend Intern",
      src: "https://plus.unsplash.com/premium_photo-1739632608992-669510ba6b9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
    {
      quote:
        "Such a professional & dedicated person, comes before this he is a helpful person that will be an addition to any workspace.",
      name: "Ahmed Medhat",
      designation: "Software Engineer",
      src: "https://plus.unsplash.com/premium_photo-1739376473691-cdc1db244ac6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      quote:
        "Saif was an outstanding mentor and team leader in our graduation project. He guided us with clarity, patience, and strong technical skills. Truly one of the best people I’ve worked with.",
      name: "Menna Nader",
      designation: "Frontend Developer",
      src: "https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    },
  ] as Testimonial[],
} as const;
