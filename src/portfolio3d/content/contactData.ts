/**
 * contactData.ts
 *
 * Foundational content config for Scene 08 Final Contact.
 * Defines copy and CTA/link structures using clear placeholders/status indicators.
 */

import type { ContactContent } from "./types";

export const CONTACT_DATA: ContactContent = {
  developerName: "Hazem Al-Melli",
  developerRole: "Full-Stack Developer",
  headline: "Let’s build the next system.",

  intro:
    "From interface to backend logic, the work is designed to feel clear, reliable, and ready to scale.",

  primaryCta: {
    label: "Start a conversation",
    href: "mailto:placeholder@example.com",
    type: "email",
    status: "placeholder",
  },

  secondaryLinks: [
    {
      id: "link-email",
      label: "Email",
      href: "mailto:placeholder@example.com",
      type: "email",
      status: "placeholder",
    },
    {
      id: "link-linkedin",
      label: "LinkedIn",
      href: "#",
      type: "linkedin",
      status: "placeholder",
    },
    {
      id: "link-github",
      label: "GitHub",
      href: "#",
      type: "github",
      status: "placeholder",
    },
    {
      id: "link-cv",
      label: "CV / Resume",
      href: "#",
      type: "cv",
      status: "missing", // No CV PDF file found in repository
    },
  ],
};

export default CONTACT_DATA;
