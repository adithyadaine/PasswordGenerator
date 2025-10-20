# Secure Password Generator

A modern, secure, and feature-rich password generator built with vanilla HTML, CSS, and JavaScript. This application provides users with cryptographically strong passwords and real-time feedback on their security strength, all wrapped in a clean, responsive, dark-themed UI.

[![Deploy with GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github)](https://your-username.github.io/your-repository-name/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Live Demo:** [https://your-username.github.io/your-repository-name/](https://your-username.github.io/your-repository-name/)

![Password Generator Screenshot](./img/static/screenshot.png)

## About The Project

This project started as a simple password generator and evolved into a robust, security-focused web application. The goal was to build a tool that not only creates strong passwords but also educates the user on password security concepts like entropy. It was built with modern web standards, prioritizing performance, security, and a clean user experience without relying on external frameworks like jQuery or Bootstrap.

## Features

-   🔐 **Cryptographically Secure:** Uses the `window.crypto` API for generating truly unpredictable random numbers, instead of the insecure `Math.random()`.
-   🎛️ **Customizable Options:** Users can easily control password length and include/exclude character sets (alphabets, numbers, special characters).
-   ⚙️ **Advanced Settings:** A settings modal allows for fine-tuned control, including:
    -   Excluding similar-looking characters (e.g., `i`, `l`, `1`, `O`, `0`).
    -   Enforcing minimum character type requirements (e.g., at least 1 number).
-   📊 **Real-Time Strength Analysis:** Calculates password entropy in bits and provides instant feedback on its strength (Weak, Medium, Strong) with actionable suggestions.
-   ✨ **Secure Shuffle Algorithm:** Implements the Fisher-Yates shuffle algorithm to ensure the final character order is completely random and unbiased.
-   📋 **One-Click Copy:** A convenient copy-to-clipboard button with clear user feedback.
-   💾 **Persistent Settings:** User preferences are automatically saved to `localStorage`, so they are remembered on the next visit.
-   📱 **Fully Responsive Design:** A sleek, modern dark theme that looks great on all devices, from mobile phones to desktops.

## Tech Stack

This project was built from the ground up using core web technologies, with a focus on modern best practices.

-   **HTML5:** Structured with semantic tags (`<article>`, `<section>`, `<dialog>`) for improved accessibility and SEO.
-   **CSS3:** Custom-styled with a mobile-first approach. Uses modern features like CSS Custom Properties (Variables), Flexbox, and Grid for a clean and maintainable dark-theme design.
-   **Vanilla JavaScript (ES6+):** All logic is handled with modern JavaScript, including:
    -   The **Web Crypto API** for secure random number generation.
    -   The native **`<dialog>` element** for the settings modal, removing external dependencies.
    -   The **Clipboard API** for secure copying.
    -   **Event Listeners** to cleanly separate behavior (JS) from structure (HTML).

## Project Journey & Key Learnings

This project served as a deep dive into modern front-end development practices, focusing on security and performance.

-   **Security First:** The most significant learning was the critical difference between `Math.random()` and the Web Crypto API. Refactoring the core generation logic to be cryptographically secure was a major milestone.
-   **Dependency Elimination:** The project was intentionally refactored from an initial Bootstrap and jQuery-based structure to a pure "vanilla" stack. This process highlighted the power of modern CSS and JavaScript APIs (like the native `<dialog>` element) to achieve complex UI without the overhead of large frameworks.
-   **Separation of Concerns:** A key goal was to remove all JavaScript calls (`onclick`, etc.) from the HTML, instead attaching all behavior through event listeners in the `code.js` file. This resulted in much cleaner, more maintainable code.
-   **Deployment & Paths:** Successfully deploying to GitHub Pages brought practical experience in debugging common issues, such as fixing broken CSS links by understanding the difference between relative and absolute file paths.

## How To Run Locally

This project requires no complex build steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repository-name
    ```
3.  **Open `index.html` in your browser.**
    -   You can simply double-click the file.
    -   For the best experience, use a live server extension (like "Live Server" in VS Code) to run it on a local development server.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.