# css-frameworks-ca
# Social Media Platform - Course Assignment

## In Brief
As part of my course assignment, I've developed this responsive social media site to showcase my proficiency with Bootstrap and SASS.

## Assignment Goals
- **Bootstrap and SASS Application**: Utilized these frameworks to craft a responsive front-end interface.
- **Page Creation**: Developed an Authentication page, a Feed page, and a Profile page, each with unique functionalities and design requirements.

## Key Features
- **Authentication Page**: A form with HTML validation for user login or registration, redirecting to the profile page.
- **Feed Page**: Displays post thumbnails, a search bar, sorting options, and a form for new post submissions.
- **Profile Page**: Shows user information, posts, and social interaction options like follow/unfollow.

## Development Process
- Began with page prototyping on Figma. [Link to Netlify Live Site](https://www.figma.com/proto/P1fgLkvEUToDAHAaAalnSy/CSS-Frameworks-Prototype?page-id=0%3A1&type=design&node-id=29-166&viewport=777%2C550%2C0.52&t=q70jBb6D2RK1j3kq-1&scaling=scale-down&starting-point-node-id=13%3A3&mode=design)
- Forked the base repository and created a `css-frameworks` branch.
- Configured Bootstrap, SASS, and Live Server for development.
- Set up NPM scripts for task automation.
- Designed using Bootstrap components and SASS customizations.
- Engaged in peer reviews and refined the project based on feedback.
- Bundled JavaScript files with Webpack, creating `bundle.js` for Netlify deployment.

## Netlify Deployment
- Published the site on Netlify, ensuring full operational capability of Bootstrap JavaScript features through `bundle.js`.

## Submission and Review
- Shared the repository link on Moodle for peer review.
- Submitted the GitHub repository URL for assessment.
- Maintained an active Pull Request for review purposes.
- Excluded `node_modules` using `.gitignore`.

## Technical Details
- **Bootstrap 5**: For responsive design and pre-styled components.
- **SASS**: For advanced CSS styling capabilities.
- **JavaScript**: Limited to Bootstrap's built-in functionality; no custom scripts required.

## Clone Instructions

To clone the `css-frameworks` branch of the `css-frameworks-ca` repository, follow these steps:

1. Open your terminal (Command Prompt, PowerShell, Terminal, iTerm, etc.).
2. Navigate to the directory where you want to clone the repository.
3. Run the following git command:

git clone --branch css-frameworks https://github.com/lordaake/css-frameworks-ca.git

## A Personal Note from Tord Åke Larsson
I've endeavored to merge current web development practices to deliver an engaging and user-friendly social media platform.

## License
This project is open-source under the ISC license, promoting the use and distribution of free and open-source software.

---

This `README.md` provides an overview of my social media platform project, detailing the objectives, my approach, and the technologies used.

File tree:
```
css-frameworks-ca
├─ .babelrc
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ css-frameworks
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ css-frameworks
│  │           └─ HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ css-frameworks
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ css-frameworks
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ feed
│  └─ index.html
├─ images
│  ├─ 2.png
│  ├─ 3.png
│  ├─ 4.png
│  ├─ car-snow.png
│  ├─ post.png
│  ├─ profile-image.png
│  ├─ profile-image2.png
│  └─ sunset.png
├─ index.html
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ profile
│  └─ index.html
├─ README.md
├─ settings.json
├─ src
│  ├─ js
│  │  └─ main.js
│  └─ scss
│     ├─ index.scss
│     └─ _variables.scss
└─ webpack.config.js

```