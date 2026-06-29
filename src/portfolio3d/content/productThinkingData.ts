import type { ProductThinkingContent } from "./types";

export const PRODUCT_THINKING_DATA: ProductThinkingContent = {
  headline: "Product thinking behind the interface",
  intro: "Every interface starts with a path: what the user wants, what the system needs, and how the product guides both clearly.",
  principles: [
    "User flow before screen design",
    "Reusable components before repeated UI",
    "Accessible states from the start",
    "Clear feedback for every action",
    "Responsive behavior planned early"
  ],
  steps: [
    {
      id: "step-1",
      title: "User Goal",
      description: "Clarify what the user needs before building the screen."
    },
    {
      id: "step-2",
      title: "Flow Logic",
      description: "Map the route from intent to action to feedback."
    },
    {
      id: "step-3",
      title: "Component System",
      description: "Turn repeated patterns into reusable, maintainable UI."
    },
    {
      id: "step-4",
      title: "State Coverage",
      description: "Plan loading, empty, error, disabled, focus, and success states."
    },
    {
      id: "step-5",
      title: "Responsive Rules",
      description: "Define how the product adapts before layout breaks."
    }
  ]
};
export default PRODUCT_THINKING_DATA;
