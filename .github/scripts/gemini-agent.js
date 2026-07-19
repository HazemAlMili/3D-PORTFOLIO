import { execSync } from 'child_process';

async function runReview() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Error: GEMINI_API_KEY is missing in GitHub Secrets!");
      process.exit(1);
    }

    console.log("🔄 Fetching latest code changes (Git Diff)...");
    let gitDiff = "";
    try {
      gitDiff = execSync('git diff HEAD~1 HEAD').toString();
    } catch (e) {
      gitDiff = execSync('git diff').toString();
    }

    if (!gitDiff.trim()) {
      console.log("✅ No code changes detected to review.");
      return;
    }

    const prompt = `
You are an elite Automated QA Engineer and Senior Full-Stack Software Developer. Your sole responsibility is to audit the provided Git Diff code changes and generate a rigorous, production-grade review report.

Analyze the code changes deep down to the logical flow, state management, and asynchronous operations.

### ASSESSMENT CRITERIA:
1. **Critical Bugs & Logic Flaws:** Identify any syntax errors, potential runtime crashes, race conditions, memory leaks, unhandled Promise rejections, or edge cases where the code will break.
2. **Security Vulnerabilities:** Check for hardcoded secrets, exposed API keys, unsafe data handling, or lack of input validation.
3. **Clean Code & Performance:** Spot redundant code, suboptimal loops, unnecessary re-renders (if frontend), or bad naming conventions. Suggest modern refactoring patterns (e.g., using ES6+, cleaner async/await).
4. **Automated Unit Testing:** Generate clear, actionable Unit Test cases for the newly added logic/functions. Provide concrete, copy-pasteable test snippets using standard testing frameworks (like Jest, Vitest, or Mocha depending on the detected language environment).

### OUTPUT FORMAT:
You MUST structure your response strictly using the following Markdown template. If a section has no findings, write "✅ No issues detected."

---
## 🤖 AI AGENT QA REPORT

### 🚨 1. Critical Bugs & Edge Cases
*   **Issue:** [Describe the bug/edge case short and clear]
    *   **Why it happens:** [Brief technical explanation]
    *   **How to fix:** 
        \`\`\`
        // Code snippet showing the fix
        \`\`\`

### 🔒 2. Security Review
*   [List security concerns or confirm it's safe]

### ⚡ 3. Code Optimization & Refactoring
*   [Provide suggestions to make the code faster, cleaner, or more readable]

### 🧪 4. Required Unit Tests
*   **Test Scenario:** [What is being tested]
*   **Test Code:**
    \`\`\`
    // Ready-to-use unit test code snippet
    \`\`\`
---

### Code Changes (Git Diff) to Review:
\${gitDiff}
`;

    console.log("🧠 Analyzing code via Gemini AI Agent...");
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const report = data.candidates[0].content.parts[0].text;
      console.log("\n=============================================");
      console.log("🤖 AI AGENT QA REPORT GENERATED SUCCESSFUL 🤖");
      console.log("=============================================\n");
      console.log(report);
      console.log("\n=============================================");
    } else {
      console.error("❌ Unexpected AI Response Format:", JSON.stringify(data));
    }

  } catch (error) {
    console.error("❌ Agent execution failed:", error);
    process.exit(1);
  }
}

await runReview();
