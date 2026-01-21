import * as React from "react";
import type { Route } from "./+types/home";
import { Form, useActionData, useNavigation, Link } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import nodemailer from "nodemailer";

type ActionData = {
  ok: boolean;
  error?: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

const skillFilters = [
  "All",
  "Frontend",
  "Backend",
  "Languages",
  "Tools",
] as const;

const skills = [
  { name: "React.js", category: "Frontend", icon: "React" },
  { name: "JavaScript", category: "Languages", icon: "JavaScript" },
  // { name: "TypeScript", category: "Languages" },
  { name: "Tailwind CSS", category: "Frontend", icon: "Tailwind CSS" },
  { name: "Node.js", category: "Backend", icon: "Node.js" },
  { name: "Express.js", category: "Backend", icon: "Express" },
  { name: "MongoDB", category: "Backend", icon: "MongoDB" },
  { name: "JWT", category: "Backend", icon: "JWT" },
  { name: "Git", category: "Tools", icon: "Git" },
  { name: "GitHub", category: "Tools", icon: "GitHub" },
  { name: "VS Code", category: "Tools", icon: "VS Code" },
  { name: "C", category: "Languages", icon: "C" },
  { name: "C++", category: "Languages", icon: "C++" },
  { name: "Python", category: "Languages", icon: "Python" },
  { name: "Vercel", category: "Tools", icon: "Vercel" },
  { name: "HTML5", category: "Frontend", icon: "html" },
  { name: "CSS3", category: "Frontend", icon: "CSS" },
] as const;

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Missing fields" } as ActionData;
  }

  // Build transporter from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  const mailOptions = {
    from: `"${process.env.FROM_NAME || "Portfolio"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject: `Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { ok: true } as ActionData;
  } catch (err) {
    console.error("Failed to send mail:", err);
    return { ok: false, error: "Failed to send email" } as ActionData;
  }
}

// Component returning icons for skills
export function SkillIcon({ name }: { name: string }) {
  // Icon map (JSX elements) for skill icons
  const iconMap: Record<string, JSX.Element> = {
    JavaScript: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
        <path
          fill="#323330"
          d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.402-3.498 9.163-5.81-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
        />
      </svg>
    ),
    React: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <circle cx="64" cy="64" r="11.4" fill="#61dafb" />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 96c-27.9 0-58-5.6-58-12.6V44.6c0 7 30.1 12.6 58 12.6s58-5.6 58-12.6v38.8c0 7-30.1 12.6-58 12.6z"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 52.2c27.9 0 58-5.6 58-12.6"
          transform="rotate(120 64 64)"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 52.2c27.9 0 58-5.6 58-12.6"
          transform="rotate(-120 64 64)"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 96c27.9 0 58-5.6 58-12.6"
          transform="rotate(60 64 64)"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 96c27.9 0 58-5.6 58-12.6"
          transform="rotate(-60 64 64)"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 32c27.9 0 58-5.6 58-12.6"
          transform="rotate(120 64 64)"
        />
        <path
          stroke="#61dafb"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          d="M64 32c27.9 0 58-5.6 58-12.6"
          transform="rotate(-120 64 64)"
        />
      </svg>
    ),

    "Tailwind CSS": (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#06b6d4"
          d="M64 17.9c-17.6 0-31.8 6.8-41.3 19.4-9.1 11.9-13.7 28.3-12.8 45.7.9 16.2 6.5 30.3 16 40.5 9.5 10.2 22.9 16.5 38.1 16.5s28.6-6.3 38.1-16.5c9.5-10.2 15.1-24.3 16-40.5.9-17.4-3.7-33.8-12.8-45.7C95.8 24.7 81.6 17.9 64 17.9zm0 91.8c-14.6 0-26.9-5.3-35.7-14.7-8.5-9.1-13.2-21.5-13.9-35.3-.7-13.1 2.6-25.5 9.9-34.7 7.5-9.4 18.6-14.4 31.7-14.4s24.2 5 31.7 14.4c7.3 9.2 10.6 21.6 9.9 34.7-.7 13.8-5.4 26.2-13.9 35.3C90.9 104.4 78.6 109.7 64 109.7z"
        />
        <path
          fill="#06b6d4"
          d="M42.7 45.3c0 6.9 4.5 11.4 12.1 13.2 6.5 1.5 8.8 3.8 8.8 7.5 0 4.2-3.2 7.2-8.9 7.2-5.4 0-8.8-2.1-9.9-5.3l-8.2 5.1c2.3 5.1 7.8 9.3 18.1 9.3 11.8 0 18.4-6.5 18.4-15.2 0-7.3-4.5-11.7-12.2-13.4-6.1-1.4-8.8-3.5-8.8-6.9 0-3.5 2.8-6.2 7.6-6.2 4.4 0 7.5 1.7 8.5 4.8l7.6-4.8c-2.4-5-7.5-8.3-16.1-8.3-10.8 0-17.2 6.3-17.2 14.1zm48.2 0h-9.9l-5.7 17.1h11.4l-1.8 5.6H70.3l-7.9 23.6h9.4l-1.8 5.5h-23.5l1.8-5.5h8.9l7.9-23.6h-11.8l1.8-5.6h12.6l5.7-17.1z"
        />
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#83CD29"
          d="M63.995 10.494c-29.814 0-53.997 24.18-53.997 53.994s24.183 53.994 53.997 53.994c29.813 0 53.994-24.18 53.994-53.994s-24.181-53.994-53.994-53.994zm-8.528 82.363c-1.392.785-3.192.388-4.019-1.052l-7.595-14.08-4.269 2.466v11.83c0 1.648-1.338 2.987-2.987 2.987s-2.987-1.339-2.987-2.987V48.77c0-1.239.753-2.354 1.905-2.81 1.152-1.239 2.595-1.102 3.968-.784l12.842 3.865c1.512.431 2.504 1.821 2.504 3.379 0 1.551-.992 2.941-2.504 3.372l-7.737 2.328 7.139 13.229 4.269-2.466-7.139-13.229c-1.313-2.437-.416-5.457 2.021-6.77l11.142-6.434c1.146-.662 2.575-.662 3.721 0l11.142 6.434c2.437 1.313 3.334 4.333 2.021 6.77l-7.135 13.229 9.061 5.232c2.437 1.409 3.329 4.529 1.92 6.966l-4.742 8.209c-.57.991-1.524 1.614-2.553 1.779-1.03.165-2.099-.144-2.928-.835l-9.061-5.232-7.737 4.467zm40.787-5.232c-1.239 0-2.336-.729-2.821-1.861l-12.136-28.73 6.438 3.717c2.841 1.641 6.469.729 8.11-2.112l4.467-7.737c1.641-2.841.729-6.469-2.112-8.11l-15.474-8.932c-1.146-.662-2.575-.662-3.721 0l-15.474 8.932c-2.841 1.641-3.753 5.269-2.112 8.11l4.467 7.737c1.641 2.841 5.269 3.753 8.11 2.112l6.438-3.717-12.136 28.73c-1.313 3.108.565 6.688 3.977 7.692.541.165 1.095.246 1.641.246 2.574 0 4.978-1.641 6.054-4.223l13.716-32.477 13.716 32.477c1.076 2.582 3.48 4.223 6.054 4.223 2.841 0 5.232-2.112 5.618-5.025.076-.431.076-.862 0-1.293-.165-1.784-.992-3.379-2.304-4.466z"
        />
      </svg>
    ),
    Express: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#000"
          d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.49-11.95-16.72-17.89-25.15-.78-1.11-1.5-2.44-1.11-3.74.87-2.92 1.8-5.83 2.84-8.86.17.48.32.87.46 1.25 4.8 13.58 9.58 27.21 14.46 40.78 1.84 5.03 3.54 10.17 5.47 15.49 1.07 2.96.03 4.98-2.32 6.08zm-1.41 8.55a3.67 3.67 0 01-2.88-2.89c-.28-2.4-.8-4.76-1.4-7.11-2-7.88-4.65-15.58-7.34-23.25-.34-.97-.73-1.93-1.18-3.1-1.58 2.31-3 4.35-4.44 6.38-5.03 7.07-10.16 14.06-15.26 21.03-2.44 3.33-4.95 5.63-9.18 5.49-4.04-.14-6.92-2.46-9.77-5.26-7.28-7.13-14.3-14.5-21.58-21.62-2.67-2.64-5.5-5.1-8.24-8.19-.25.91-.48 1.64-.66 2.39-4.84 20.14-9.66 40.29-14.55 60.43-.72 2.94-1.61 5.14-4.87 6.16-3.44 1.08-6.53.26-9.42-1.46-1.82-1.09-2.92-2.81-2.95-4.96-.04-2.87 1.03-5.27 2.96-7.42 4.52-5.02 9.24-9.84 14.02-14.6 6.25-6.23 12.55-12.4 18.8-18.63.97-.97 1.95-1.93 2.94-2.97-.22-.73-.42-1.41-.64-2.09-1.69-5.42-3.4-10.84-5.09-16.26-.36-1.16-.71-2.32-1.16-3.79-3.15 4.04-5.98 7.72-8.85 11.37-5.52 7.06-11.11 14.07-16.6 21.16-2.52 3.26-4.96 6.58-7.29 9.98-.58.85-1.71 1.52-2.63 1.52-2.84-.05-4.54-1.97-5.47-4.52-1.32-3.63-.06-7.2 3.04-9.63 8.34-6.52 16.7-12.99 25.09-19.4 5.35-4.1 10.75-8.13 16.09-12.24 4.18-3.21 8.35-6.43 12.54-9.81.31.98.6 1.87.88 2.76 4.64 14.97 9.3 29.94 13.96 44.91.19.61.43 1.21.73 2.08.75-1.02 1.42-1.93 2.01-2.88 4.96-8.04 9.94-16.06 14.92-24.08.81-1.32 1.65-2.64 2.57-4.1 1.95.62 3.69 1.36 5.34 2.23 15.95 8.36 31.87 16.78 47.82 25.15 3.2 1.67 5.25 4.15 5.18 7.92-.07 4.04-1.96 6.61-5.43 8.56zM1.33 61.74c.72-3.61 1.44-7.16 2.13-10.72.12-.62.31-1.22.56-2.15 3.07 3.56 5.97 6.92 8.87 10.29 7.31 8.45 14.65 16.87 21.95 25.34 2.25 2.61 4.07 5.25 5.96 9.06.19-.96.35-1.74.5-2.52 1.95-10.04 3.91-20.07 5.87-30.11.27-1.4.56-2.79.93-4.64-5.26-5.84-10.4-11.56-15.5-17.24-6.26-7.02-12.48-14.08-18.7-21.13-.98-1.11-2.02-2.17-3.23-3.47.23-.74.44-1.4.64-2.03 1.68-5.36 3.37-10.71 5.05-16.07.29-.93.6-1.86 1.01-3.12 1.39.85 2.61 1.65 3.79 2.5 12.12 8.74 24.21 17.52 36.34 26.27.93.67 1.89 1.3 2.92 2.01.3-.97.58-1.84.84-2.72 1.87-7.95 3.73-15.9 5.6-23.85.23-1 .49-1.99.81-3.27.87 1.12 1.66 2.13 2.43 3.15 5.89 7.8 11.81 15.58 17.72 23.36 1.4 1.85 2.74 3.75 4.31 5.91.14-1.02.26-1.84.38-2.66.89-6.1 1.78-12.21 2.68-18.31.15-1.04.33-2.08.58-3.5.96.59 1.9 1.24 2.83 1.93 12.12 8.94 24.22 17.9 36.34 26.83 1.14.84 2.29 1.66 3.55 2.58.12-.4.21-.69.29-.98 2.71-9.79 5.42-19.58 8.14-29.37.33-1.18.68-2.35 1.15-3.96 1.34 1.41 2.58 2.72 3.8 4.01 8.99 9.53 17.95 19.08 26.93 28.6 2.09 2.23 4.15 4.49 6.36 7.01-.18.66-.34 1.26-.49 1.85-2.6 10.56-5.2 21.13-7.81 31.69-.14.57-.29 1.14-.51 1.99z"
        />
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#13AA52"
          d="M83.469 15.272c-2.268-1.531-4.421-2.987-6.461-4.368.242-.279.483-.555.715-.827 1.174-1.369 2.308-2.695 3.389-3.96.061-.069.124-.138.183-.208.805-.961.65-2.38-.348-3.169-.099-.079-.206-.15-.318-.214-.248-.141-.52-.221-.806-.221-.288 0-.564.08-.808.218-2.281 1.624-4.678 3.646-7.076 5.988-5.602-1.226-11.892-1.711-18.318-1.377-6.281.328-12.418 1.591-18.253 3.701-1.653.594-3.281 1.265-4.871 2.007-2.279 1.067-4.497 2.293-6.641 3.664C12.985 21.25 5.477 29.334 1.834 39.863.609 43.2-.118 46.659-.118 50.158c0 4.326 1.035 8.578 3.054 12.546 2.521 4.93 6.37 9.204 11.174 12.46 11.21 7.628 26.551 10.936 41.928 9.666.304-.026.607-.055.909-.086 2.526-.256 5.021-.669 7.467-1.227.014.017.028.034.042.051 3.285 3.94 6.376 7.525 9.09 10.653 3.731 4.296 6.867 7.853 8.957 10.339 1.043 1.247 1.877 2.234 2.416 2.913.539.679.755.994.755.994s-.055-1.344-.205-3.753c-.146-2.309-.417-5.606-.761-9.587-.345-3.982-.819-8.715-1.371-13.803-.551-5.089-1.157-10.433-1.78-15.708-.312-2.637-.627-5.236-.936-7.773-.309-2.537-.595-4.99-.846-7.329-.251-2.339-.451-4.531-.591-6.538-.139-2.006-.205-3.789-.189-5.304.015-1.516.079-2.738.153-3.624.012-.177.026-.347.041-.51l.008-.085c.004-.037.009-.073.014-.108.157-1.197.363-2.142.585-2.822.147-.446.289-.782.41-1.002.051-.094.096-.172.133-.234.012-.02.021-.037.029-.051.003-.005.005-.009.007-.012.001-.001.002-.002.002-.002-.001-.001-.003.001-.006.004-.006.005-.014.013-.024.023-.019.02-.041.045-.066.075-.049.061-.107.133-.172.215-.131.165-.286.358-.444.576-.317.436-.656.946-.994 1.511-.675 1.131-1.352 2.416-1.998 3.807-1.291 2.783-2.459 6.02-3.398 9.48-1.879 6.916-3.088 14.528-3.419 21.986-.166 3.729-.062 7.326.294 10.717.356 3.391.988 6.578 1.86 9.472 1.744 5.787 4.305 10.948 7.457 14.984 3.152 4.036 6.831 6.874 9.822 8.229 2.99 1.355 5.224 1.182 6.527.654.651-.263 1.15-.672 1.52-1.178.739-1.012 1.121-2.405 1.121-4.06 0-3.161-1.348-7.222-3.766-11.674-2.418-4.451-5.691-9.084-9.391-13.459-7.4-8.75-15.744-15.96-21.686-20.675-5.941-4.716-9.299-6.751-9.299-6.751s.166-.084.454-.236c.289-.151.692-.366 1.199-.631 1.013-.53 2.41-1.243 4.108-2.088 3.396-1.69 8.153-3.87 13.599-6.233 10.892-4.727 23.667-9.375 36.47-12.296 6.402-1.461 12.804-2.414 18.994-2.792 6.19-.378 12.084-.183 17.459.544 5.375.727 10.138 1.976 14.046 3.622 3.908 1.646 6.905 3.649 8.774 5.813 1.869 2.164 2.569 4.432 1.99 6.553-.579 2.122-2.183 4.029-4.624 5.509z"
        />
        <path
          fill="#589636"
          d="M65.964 98.197c.025 1.328-.019 2.638-.13 3.928-.012.138-.027.275-.043.412-.316 2.632-1.018 5.132-2.089 7.454-1.546 3.362-3.874 6.143-6.826 8.134-1.702 1.154-3.653 1.899-5.74 2.147-.246.029-.494.052-.742.071-.42.032-.843.054-1.268.066-1.73.048-3.491-.047-5.188-.281-1.063-.147-2.102-.359-3.107-.632-1.676-.455-3.269-1.128-4.744-1.999-1.867-1.097-3.527-2.532-4.915-4.227-1.394-1.702-2.494-3.644-3.246-5.762-.759-2.134-1.159-4.415-1.178-6.782-.02-2.513.223-5.084.72-7.645.492-2.533 1.227-4.988 2.18-7.303.956-2.314 2.12-4.469 3.488-6.418 1.369-1.949 2.931-3.681 4.661-5.169 1.73-1.488 3.617-2.723 5.628-3.683 2.011-.96 4.134-1.641 6.33-2.028 2.195-.387 4.449-.478 6.724-.272 2.275.206 4.56.706 6.807 1.488 2.247.782 4.443 1.845 6.541 3.168 2.098 1.323 4.085 2.901 5.918 4.714 1.833 1.813 3.5 3.856 4.966 6.096 1.466 2.24 2.719 4.669 3.729 7.243 1.01 2.574 1.769 5.283 2.257 8.087.488 2.804.701 5.693.629 8.628z"
        />
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#F34F29" d="M12 .5l3 3-2 2 2 2-3 3-3-3 2-2-2-2 3-3z" />
        <circle cx="12" cy="12" r="2.2" fill="#fff" />
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path
          fill="#fff"
          d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.55 0-.27-.01-1.17-.01-2.12-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.22 1.19.94-.26 1.95-.4 2.95-.4s2.01.14 2.95.4c2.24-1.5 3.22-1.19 3.22-1.19.63 1.65.23 2.87.11 3.17.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.28 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.8.55C20.71 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"
        />
      </svg>
    ),
    "VS Code": (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#007ACC" d="M2 3l20 9-20 9V3z" />
      </svg>
    ),
    "Code::Blocks": (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#333" />
        <path d="M7 8h10v2H7zM7 12h10v2H7z" fill="#fff" />
      </svg>
    ),
    Netlify: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path d="M12 2L2 22h20L12 2z" fill="#00C7B7" />
      </svg>
    ),
    Vercel: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path d="M12 2L2 20h20L12 2z" fill="#000" />
      </svg>
    ),
    C: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#00599C"
          d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7L16.8 30.7c-1.7 1-3.1 3.5-3.1 5.6v55.7c0 2.1 1.4 4.6 3.1 5.6l44.1 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l44.1-27.9c1.7-1 3.1-3.5 3.1-5.6V36.1c.1-.8 0-1.7-.2-2.6zm-9.3 6.2c-2.1 5-6.3 8.8-11.2 10.4-6.2 2-12.7 3.3-19.3 3.9-1.5.1-3 .2-4.5.3-5.6.4-11.2 1-16.7 2.1-1.7.3-3.4.7-5 .9-.5.1-1 .1-1.5.2-2.2.2-4.4.5-6.5.9v43.5c1.9.4 3.9.7 5.9 1 4.5.6 9.1 1.1 13.7 1.5 1.2.1 2.4.2 3.6.3 4.8.4 9.7.7 14.5.7 4.8 0 9.6-.3 14.5-.7 1.1-.1 2.3-.2 3.4-.3 5.4-.4 10.8-1 16-1.8 2.4-.4 4.8-.8 7.1-1.4V39.7zM64.1 81.2c-9.3 0-18.5-1.4-27.4-4.1-2.7-.8-5.3-1.7-7.8-2.7V49.9c.5-.1 1-.2 1.5-.3 2.5-.5 5.1-1 7.6-1.4 4.9-.8 9.9-1.4 14.9-1.8 1.2-.1 2.5-.2 3.7-.3 5.1-.3 10.2-.5 15.4-.5 5.2 0 10.4.2 15.6.5 1.2.1 2.5.2 3.7.3 5 .4 10 1 14.9 1.8 2.5.4 5 1 7.6 1.4.5.1 1 .2 1.5.3v24.5c-2.5 1-5.1 1.9-7.8 2.7-8.9 2.8-18.2 4.2-27.4 4.2z"
        />
        <path
          fill="#004482"
          d="M125.2 35.1c-.4-.4-.8-.8-1.3-1.1l-1.1.7c.5.4 1 .8 1.3 1.3.4.5.7 1.1.9 1.7l1-.6c-.3-.8-.6-1.5-1.1-2.1zm-59.6-27.5l41 26.5c.8.5 1.4 1.4 1.6 2.3v.1l-2.2 1.4c-.1-.4-.3-.8-.5-1.1-.3-.5-.8-.9-1.3-1.2l-38.8-24.8c-.5-.3-1.2-.5-1.8-.5s-1.3.2-1.8.5L21.8 36.5c-1.1.7-1.8 2-1.8 3.4v50.7c0 1.4.7 2.7 1.8 3.4l39.8 25.2c.5.3 1.2.5 1.8.5s1.3-.2 1.8-.5l39.8-25.2c1.1-.7 1.8-2 1.8-3.4V39.9c0-1.1-.5-2.2-1.3-2.9l-2.2 1.4c.4.3.7.7.9 1.1.2.4.3.9.3 1.4v50.7c0 .8-.4 1.5-1.1 1.9l-39.8 25.2c-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3L22.7 93.7c-.7-.4-1.1-1.1-1.1-1.9V41.1c0-.8.4-1.5 1.1-1.9l39.8-25.2c.3-.2.7-.3 1.1-.3s.8.1 1.1.3z"
        />
      </svg>
    ),
    "C++": (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path
          fill="#00599C"
          d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7L16.8 30.7c-1.7 1-3.1 3.5-3.1 5.6v55.7c0 2.1 1.4 4.6 3.1 5.6l44.1 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l44.1-27.9c1.7-1 3.1-3.5 3.1-5.6V36.1c.1-.8 0-1.7-.2-2.6zm-9.3 6.2c-2.1 5-6.3 8.8-11.2 10.4-6.2 2-12.7 3.3-19.3 3.9-1.5.1-3 .2-4.5.3-5.6.4-11.2 1-16.7 2.1-1.7.3-3.4.7-5 .9-.5.1-1 .1-1.5.2-2.2.2-4.4.5-6.5.9v43.5c1.9.4 3.9.7 5.9 1 4.5.6 9.1 1.1 13.7 1.5 1.2.1 2.4.2 3.6.3 4.8.4 9.7.7 14.5.7 4.8 0 9.6-.3 14.5-.7 1.1-.1 2.3-.2 3.4-.3 5.4-.4 10.8-1 16-1.8 2.4-.4 4.8-.8 7.1-1.4V39.7zM64.1 81.2c-9.3 0-18.5-1.4-27.4-4.1-2.7-.8-5.3-1.7-7.8-2.7V49.9c.5-.1 1-.2 1.5-.3 2.5-.5 5.1-1 7.6-1.4 4.9-.8 9.9-1.4 14.9-1.8 1.2-.1 2.5-.2 3.7-.3 5.1-.3 10.2-.5 15.4-.5 5.2 0 10.4.2 15.6.5 1.2.1 2.5.2 3.7.3 5 .4 10 1 14.9 1.8 2.5.4 5 1 7.6 1.4.5.1 1 .2 1.5.3v24.5c-2.5 1-5.1 1.9-7.8 2.7-8.9 2.8-18.2 4.2-27.4 4.2z"
        />
        <path
          fill="#004482"
          d="M125.2 35.1c-.4-.4-.8-.8-1.3-1.1l-1.1.7c.5.4 1 .8 1.3 1.3.4.5.7 1.1.9 1.7l1-.6c-.3-.8-.6-1.5-1.1-2.1zm-59.6-27.5l41 26.5c.8.5 1.4 1.4 1.6 2.3v.1l-2.2 1.4c-.1-.4-.3-.8-.5-1.1-.3-.5-.8-.9-1.3-1.2l-38.8-24.8c-.5-.3-1.2-.5-1.8-.5s-1.3.2-1.8.5L21.8 36.5c-1.1.7-1.8 2-1.8 3.4v50.7c0 1.4.7 2.7 1.8 3.4l39.8 25.2c.5.3 1.2.5 1.8.5s1.3-.2 1.8-.5l39.8-25.2c1.1-.7 1.8-2 1.8-3.4V39.9c0-1.1-.5-2.2-1.3-2.9l-2.2 1.4c.4.3.7.7.9 1.1.2.4.3.9.3 1.4v50.7c0 .8-.4 1.5-1.1 1.9l-39.8 25.2c-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3L22.7 93.7c-.7-.4-1.1-1.1-1.1-1.9V41.1c0-.8.4-1.5 1.1-1.9l39.8-25.2c.3-.2.7-.3 1.1-.3s.8.1 1.1.3z"
        />
        <path
          fill="#F34F29"
          d="M93.5 73.3c-.3 0-.7-.1-1-.3l-6.3-3.9c-.6-.4-1-.1-1 .5v2.9c0 .3-.2.5-.5.5h-3.9c-.3 0-.5-.2-.5-.5v-7.8c0-.3.2-.5.5-.5h3.9c.3 0 .5.2.5.5v3c0 .6.4.9 1 .5l6.3-3.9c.3-.2.7-.3 1-.3.5 0 .9.4.9.9v11.7c0 .5-.4.9-.9.9z"
        />
      </svg>
    ),

    Python: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <linearGradient
          id="python-original-a"
          gradientUnits="userSpaceOnUse"
          x1="70.252"
          y1="1237.476"
          x2="170.659"
          y2="1151.089"
          gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
        >
          <stop offset="0" stopColor="#5A9FD4" />
          <stop offset="1" stopColor="#306998" />
        </linearGradient>
        <linearGradient
          id="python-original-b"
          gradientUnits="userSpaceOnUse"
          x1="209.474"
          y1="1098.811"
          x2="173.62"
          y2="1149.537"
          gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
        >
          <stop offset="0" stopColor="#FFD43B" />
          <stop offset="1" stopColor="#FFE873" />
        </linearGradient>
        <path
          fill="url(#python-original-a)"
          d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.654-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
        />
        <path
          fill="url(#python-original-b)"
          d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.678-8.735 2.538-14.171 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521H91.682zm-22.891 81.053c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
        />
      </svg>
    ),
  };
  // Prefer images from public/ when available (keeps official logos in public/)
  const publicIconMap: Record<string, string> = {
    React: "/react.png",
    "Node.js": "/node.png",
    Express: "/express.png",
    "Tailwind CSS": "/tailwind.png",
    C: "/c.png",
    "C++": "/c++.png",
    Python: "/python.png",
    Vercel: "/vercel.png",

    Netlify: "/netlify.png",
    html: "/html.png",
    CSS: "/css.png",
    MongoDB: "/mongodb.png",
    JWT: "/jwt.png",
    Git: "/git.png",
  };

  if (publicIconMap[name]) {
    return (
      <img
        src={publicIconMap[name]}
        alt={name}
        className="w-12 h-12 object-contain"
      />
    );
  }

  const icon = iconMap[name];
  if (!icon) {
    // Fallback: return first letter
    return (
      <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-lg text-slate-300 font-bold text-lg">
        {name.charAt(0)}
      </div>
    );
  }

  return <>{icon}</>;
}

export const projects = [
  {
    id: "tutoria",
    title: "TuToria",
    summary:
      "TuToria — reshaping the tuition ecosystem in Bangladesh with secure, role-based tuition matching and location-aware features.",
    fullDescription:
      "TuToria is not only a digital solution but a catalyst for reshaping the tuition ecosystem in Bangladesh, promoting professionalism, accountability, and inclusivity.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "JWT",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SSL Commerce",
      "Leaflet",
    ],
    features: [
      "Secure Login & Role-based Access (Student, Tutor, Admin)",
      "Post Tuition Requests & Tutor Applications",
      "Safe Online Payments with SSL Commerce",
      "Smart Search, Filter & Sorting System",
      "Location Tracking with Leaflet Map",
    ],
    liveUrl: "https://tutoria-jet.vercel.app",
    githubUrl: "https://github.com/HFsa-RaShid/tutoria-client",
    clientGithub: "https://github.com/HFsa-RaShid/tutoria-client",
    serverGithub: "https://github.com/HFsa-RaShid/tutoria-server",
    image: "/tutoria.png",
  },
  {
    id: "meetup",
    title: "MeetUp",
    summary:
      "MeetUp is a video conferencing app designed to make collaboration and connection easier, with instant calls, scheduling, and support features.",
    fullDescription:
      "MeetUp is a video conferencing app designed to make collaboration and connection easier, no matter where you are. It supports team meetings, scheduling, and an AI/human-assisted support chatbot.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Ripple UI",
      "JWT",
      "Node.js",
      "Express.js",
      "MongoDB",
      "ZEGOCLOUD",
    ],
    features: [
      "Team Meeting: group calls with chat, screen share, whiteboard, and host controls",
      "Schedule A Meeting with countdowns and details",
      "Support Chatbot with AI or human-assisted replies",
    ],
    liveUrl: "https://meetup-d48c4.web.app",
    githubUrl: "https://github.com/takbirgazi/meetup-client/tree/main",
    clientGithub: "https://github.com/takbirgazi/meetup-client/tree/main",
    serverGithub: "https://github.com/takbirgazi/meetup-server",
    image: "/meetup.png",
  },
  {
    id: "educonnect",
    title: "EduConnect",
    summary:
      "EduConnect is a collaborative study platform to connect students, tutors, and admins for sessions, materials, and bookings.",
    fullDescription:
      "EduConnect is a comprehensive Collaborative Study Platform designed to connect students, tutors, and administrators, enhancing educational collaboration, resource sharing, and user management.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Managed secure user roles for students, tutors, and administrators",
      "Streamlined session creation, approval, and viewing",
      "Students can book sessions and download materials",
    ],
    liveUrl: "https://educonnect-9f39f.web.app",
    githubUrl: "https://github.com/HFsa-RaShid/edu-connect-client",
    clientGithub: "https://github.com/HFsa-RaShid/edu-connect-client",
    serverGithub: "https://github.com/HFsa-RaShid/edu-connect-server",
    image: "/educonnect.png",
  },
  {
    id: "resty",
    title: "RestY",
    summary:
      "RestY is a user-friendly hotel booking platform to find and book accommodations efficiently.",
    fullDescription:
      "RestY is a user-friendly hotel booking platform designed to make finding and booking accommodations easy and efficient.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    features: [
      "List and filter available rooms for seamless booking",
      "Manage bookings, updates, and cancellations",
      "User feedback with ratings and comments",
    ],
    liveUrl: "https://ass10-resty-client.web.app",
    githubUrl: "https://github.com/HFsa-RaShid/resty-client",
    clientGithub: "https://github.com/HFsa-RaShid/resty-client",
    serverGithub: "https://github.com/HFsa-RaShid/resty-server",
    image: "/resty.png",
  },
] as const;

const education = [
  {
    title: "B.Sc. in Computer Science & Engineering",
    place: "University of Barishal, Barishal",
    period: "2020-2026",
    details: "CGPA: 3.54/4.00",
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    place: "Barishal Govt. Women’s College",
    period: "2017 - 2019",
    details: "GPA: 5.00/5.00",
  },
  {
    title: "Secondary School Certificate (SSC)",
    place: "Barishal Model School & College",
    period: "2015 - 2017",
    details: "GPA: 5.00/5.00",
  },
] as const;

export default function Home() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = React.useRef<HTMLFormElement | null>(null);

  React.useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-[Inter]">
      {/* Top nav */}
      <header className="fixed top-0 inset-x-0 z-30 bg-[#050816]/80 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="text-slate-100 font-semibold tracking-wide">
            &lt;Hafsa_Rashid&gt;
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-200 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-slate-200 text-xl">
            <a
              href="https://github.com/HFsa-RaShid"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/hafsarashid28"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 animate-fade-up">
        {/* Hero */}
        <section
          id="hero"
          className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-12 items-center justify-around"
        >
          <div className="space-y-6 max-w-xl mt-10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Hafsa Rashid
            </h1>
            <p className="text-xl text-slate-100">
              I am a <span className="text-cyan-400">MERN Stack Developer</span>
            </p>
            <p className="text-sm md:text-base text-slate-100 max-w-xl">
              I&apos;m a passionate MERN Stack Developer who loves turning ideas
              into interactive, user‑friendly web applications. With a strong
              foundation in React.js and modern UI frameworks, I focus on
              creating responsive and performance‑optimized solutions.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-full border border-cyan-500/60 bg-cyan-500/10 px-6 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800/70 transition-colors"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>

          <div className="relative flex justify-center mt-16">
            <div className="relative h-72 w-72 md:h-80 md:w-80 overflow-hidden rounded-full bg-gradient-to-br from-cyan-500/40 via-slate-800 to-purple-600/40 shadow-[0_0_80px_rgba(56,189,248,0.35)] animate-float">
              <img
                src="/profile.png"
                alt="Hafsa Rashid"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Programming journey / about cards */}
        <section id="about" className="mx-auto max-w-6xl px-4 mt-32 space-y-8">
          {/* <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              About Me
            </h2>
            <div className="w-20 h-0.5 bg-cyan-500 mx-auto"></div>
          </div> */}
          {/* <div className="max-w-3xl mx-auto">
            <p className="text-base text-slate-300 leading-relaxed text-center mb-8">
              Hi, I&apos;m Hafsa Rashid, a passionate MERN stack developer who
              loves bringing ideas to life with clean UI, smooth interactions,
              and modern web technologies. I enjoy turning complex problems into
              simple, elegant solutions.
            </p>
          </div> */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6">
              <h2 className="text-lg font-semibold mb-3 text-slate-50">
                My Programming Journey
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                I started my programming journey with curiosity about how
                software works, beginning with C and C++. Over time, I explored
                JavaScript and eventually found my passion in web development
                with JavaScript, React and the MERN stack.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6">
              <h2 className="text-lg font-semibold mb-3 text-slate-50">
                The Work I Enjoy
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                I focus on building responsive, accessible, and
                performance‑driven web applications. From dashboards and
                management systems to interactive landing pages, I love solving
                complex problems and turning them into elegant solutions using
                modern JavaScript, React.js, and Node.js.
              </p>
            </div>
          </div>
        </section>

        {/* Academic background */}
        <section
          id="education"
          className="mx-auto max-w-6xl px-4 mt-24 space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              Academic Background
            </h2>
            <div className="w-20 h-0.5 bg-cyan-500 mx-auto"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {education.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 hover:border-cyan-500/70 transition-colors"
              >
                <h3 className="text-base font-semibold text-slate-50 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300">{item.place}</p>
                <p className="text-xs text-slate-400 mt-2">{item.period}</p>
                <p className="text-xs text-cyan-300 mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-4 mt-24 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Skills
            </p>
            
            <h2 className="text-3xl font-bold text-slate-50">Skills</h2>
            <div className="w-20 h-0.5 bg-cyan-500 mx-auto"></div>
            <p className="text-sm text-slate-400">
              Here are the technologies, tools, and programming languages I use
              to build modern web applications.
            </p>
          </div>

          <SkillsSection />
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="mx-auto max-w-6xl px-4 mt-24 space-y-8"
        >
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Projects
            </p>
            <h2 className="text-3xl font-bold text-slate-50">My Projects</h2>
            <div className="w-20 h-0.5 bg-cyan-500 mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800/90 hover:border-cyan-500/70 transition-colors"
            >
              View All Projects
            </a>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto max-w-6xl px-4 mt-24 grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] items-start"
        >
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Contact
              </p>
              <h2 className="text-3xl font-bold text-slate-50">Get in Touch</h2>
              <div className="w-20 h-0.5 bg-cyan-500 mx-auto"></div>
              <p className="text-sm text-slate-400">
                Have a project in mind or want to collaborate? Send me a
                message, and I&apos;ll get back to you as soon as I can.
              </p>
            </div>

            <div className="md:flex justify-between gap-6">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-5 space-y-4 w-full md:w-[48%]">
                {actionData?.error && (
                  <p className="text-sm text-red-400 bg-red-950/60 border border-red-700/70 px-3 py-2 rounded-lg">
                    {actionData.error}
                  </p>
                )}
                {actionData?.ok && !actionData.error && (
                  <p className="text-sm text-emerald-300 bg-emerald-950/60 border border-emerald-700/70 px-3 py-2 rounded-lg">
                    Thank you! Your message has been sent.
                  </p>
                )}

                <Form ref={formRef} method="post" className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg bg-slate-900/90 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/70"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg bg-slate-900/90 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/70"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full rounded-lg bg-slate-900/90 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/70 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-500/90 px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>

                <div className="flex gap-4 text-sm text-slate-300 pt-2">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-100">Location</p>
                    <p className="text-xs text-slate-400">
                      Sagordi, Barishal, Bangladesh
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-100">Phone</p>
                    <p className="text-xs text-slate-400">+880 1838551941</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700/70 bg-slate-900/80  w-full md:w-[48%]">
                <iframe
                  title="Barishal, Bangladesh map"
                  src="https://www.google.com/maps?q=Sagordi,+Barishal,+Bangladesh&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-2 border-t border-white/5 bg-[#050816]">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2025 Hafsa Rashid. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/HFsa-RaShid"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hafsarashid28"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="hafsarashid028@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SkillsSection() {
  const [activeFilter, setActiveFilter] =
    React.useState<(typeof skillFilters)[number]>("All");

  const filteredSkills =
    activeFilter === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        {skillFilters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "rounded-full px-4 py-1.5 text-xs font-medium border transition-colors",
                isActive
                  ? "bg-cyan-500 text-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-500/70 hover:text-cyan-200",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 flex flex-row items-center gap-3 text-sm font-medium text-slate-100 hover:border-cyan-500/70 hover:text-cyan-200 transition-colors animate-fade-up justify-center"
          >
            <div className="flex-shrink-0 transform scale-75">
              <SkillIcon name={skill.icon ?? skill.name} />
            </div>
            <span className="text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <article className="flex flex-col rounded-2xl border border-slate-700/70 bg-slate-900/70 overflow-hidden hover:border-cyan-500/70 transition-colors transform transition-transform duration-200 hover:-translate-y-1 animate-fade-up">
        <div className="h-32 relative">
          {project.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-slate-900 to-emerald-500/30" />
          )}
          <div className="absolute inset-0 bg-cyan-600/20" />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="text-lg font-semibold text-slate-50">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-800/80 border border-slate-600/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center justify-center rounded-full border border-cyan-500/60 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/20 transition-colors"
            >
              See Details
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 rounded-2xl border border-slate-700/70 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-50 mb-3">
              {project.title}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3 flex items-center gap-2">
              <span className="text-cyan-400">*</span>
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3 flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-700/70">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20 transition-colors"
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-slate-600/60 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-slate-600/60 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700/80 transition-colors ml-auto"
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
