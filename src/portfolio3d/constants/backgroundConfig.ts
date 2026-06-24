export interface CodeFragmentData {
  content: string;
  pos: [number, number, number];
}

export const CODE_FRAGMENTS: CodeFragmentData[] = [
  { content: "const", pos: [-3.5, 1.2, -4.5] },
  { content: "async", pos: [4.0, -0.8, -5.0] },
  { content: "await", pos: [-2.8, -1.5, -4.8] },
  { content: "=>", pos: [3.2, 1.5, -5.2] },
  { content: "{}", pos: [0.5, 2.0, -5.5] },
  { content: "type", pos: [-1.2, -2.0, -4.3] },
  { content: "interface", pos: [2.5, -1.8, -4.7] },
  { content: "try", pos: [-4.0, -0.2, -5.0] },
];
