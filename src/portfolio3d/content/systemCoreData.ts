/**
 * systemCoreData.ts
 * Structured content configuration for Scene 07 System Core.
 *
 * This config defines engineering-linked copy for each backend layer:
 * API, Auth, Database, Cache, Jobs, Deployment, Testing, Security, Scalability.
 *
 * Node IDs map to Scene 07 geometry for later animation tasks.
 */

import type { SystemCoreContent } from "./types";

export const SYSTEM_CORE_DATA: SystemCoreContent = {
  headline: "Systems that keep the interface reliable",

  intro:
    "Behind every smooth screen is a set of boundaries, services, data paths, and safeguards that make the product stable.",

  layers: [
    {
      id: "layer-api",
      title: "API Layer",
      description:
        "Defines how the interface talks to the system through clear request and response contracts.",
      node: "api",
    },
    {
      id: "layer-auth",
      title: "Authentication",
      description:
        "Protects user actions with session rules, role checks, and secure access boundaries.",
      node: "auth",
    },
    {
      id: "layer-database",
      title: "Database",
      description:
        "Persists product data with structure, relationships, and reliable retrieval paths.",
      node: "database",
    },
    {
      id: "layer-cache",
      title: "Cache",
      description:
        "Reduces repeated work and keeps frequent reads fast without breaking correctness.",
      node: "cache",
    },
    {
      id: "layer-jobs",
      title: "Jobs / Queue",
      description:
        "Moves slow or repeated work outside the main user interaction path.",
      node: "queue",
    },
    {
      id: "layer-deploy",
      title: "Deployment",
      description:
        "Moves tested code from local build to production through a controlled release path.",
      node: "deploy",
    },
    {
      id: "layer-testing",
      title: "Testing",
      description:
        "Catches regressions across logic, integration points, and critical user flows.",
      node: "tests",
    },
    {
      id: "layer-security",
      title: "Security",
      description:
        "Treats validation, permissions, secrets, and failure cases as part of the system design.",
      node: "security",
    },
    {
      id: "layer-scalability",
      title: "Scalability",
      description:
        "Keeps the architecture ready for more users, more data, and more traffic.",
      node: "core",
    },
  ],
};
