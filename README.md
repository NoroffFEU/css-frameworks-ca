# css-frameworks-ca

**Note**: The following instructions are tailored for the `js2-laura-karaliene` branch of this project.

![vibn-screenshot](https://github.com/LauraKaraliene/css-frameworks-ca/assets/98472609/4d9205c4-382d-4d60-affe-fa002f7c75cf)

A fictional social media platform Vib`n! A cool place for cool people to vibe together.

## Description

After laying the groundwork with design and initial coding using HTML, CSS, JavaScript, the Bootstrap framework, and SASS, the project evolved to incorporate a more interactive and dynamic user experience in line with the assignment's objectives. Here's an overview of the added functionalities and the goals they aim to achieve:

### Goal
The primary goal was to leverage JavaScript to enrich the front-end functionality of a social media application, making it not only visually appealing but also responsive and user-friendly.

### API Integration
The project utilizes the Noroff API, specifically the Social Endpoints, to interact with social media content. This integration required:

- Authentication with JWT tokens, necessitating user registration and login processes.
- Utilizing GET, POST, PUT, and DELETE HTTP methods to enable full CRUD (Create, Read, Update, Delete) capabilities for social media content.

### Required Features
In accordance with the project brief, the following user stories were implemented to ensure a comprehensive and functional user interface:

- **User Registration and Login**: Only users with @noroff.no or @stud.noroff.no email addresses can register and log in, ensuring a secure and exclusive environment.
- **Content Interaction**: Users can view, filter, search, create, update, and delete post content, providing a rich social media experience.
- **Persistence**: The use of localStorage for JWT token storage, among other things, enhances user experience by maintaining session states and preferences.

### Brief
The project's aim was to create a new JavaScript front-end client for an existing social media platform. This entailed developing a user interface that is not only attractive and responsive but also capable of interacting with the provided API to manage social media content effectively.

## Built With

- [Visual Studio Code](https://code.visualstudio.com/) (HTML5, CSS, JavaScript)
- [Bootstrap](https://getbootstrap.com/)
- [SASS]

## Getting Started

### Installing

1. Clone the repo:

```
git clone https://github.com/LauraKaraliene/css-frameworks-ca
```

2. Navigate to the Project Directory.
   Change your current directory to the cloned repository:

```
cd css-frameworks-ca
```

Then, switch to the `js2-laura-karaliene` branch:

```
git checkout js2-laura-karaliene
```

3. Open the project in the code editor of your choice.
   For Visual Studio Code, you might use:

```
code .
```

4. Install instructions.

```
npm install
```

5. For development

```
 `npm run watch`: Watches for changes in your SASS files and compiles them to CSS in real-time, also launches a local development server to preview changes.
```

6. To build

```
 `npm run build`: Compiles all project assets for production, optimizing for the best performance.
```
