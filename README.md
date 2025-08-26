# JavaScript-ca

**Note**: The following instructions are tailored for the `js2-laura-karaliene` branch of this project.

![Image](https://github.com/user-attachments/assets/994d0302-8e8d-487c-b802-5c23acd4ff2d)

A fictional social media platform Vib`n! A cool place for cool people to vibe together.

## Description

After building the design foundation with HTML, CSS, Bootstrap, and SASS, this project evolved to meet the JavaScript 2 assignment objectives by incorporating interactive functionality and API integration.

### Goal
The primary goal was to use JavaScript to create a responsive, interactive social media application that connects with the Noroff API for full CRUD (Create, Read, Update, Delete) functionality.

### API Integration
Utilizing the official **Noroff API** (Social Endpoints), the application features:

- **Authentication with JWT tokens** – secure user login and registration  
- **GET, POST, PUT, DELETE** requests – enabling full content management  
- **LocalStorage** – for token storage and session persistence  

### Features Implemented
- **User Registration and Login** (restricted to @noroff.no and @stud.noroff.no emails)  
- **Post Management** (view, search, create, update, delete content)  
- **Session Persistence** with localStorage  
- Responsive and interactive UI 

### Brief
The project's aim was to create a new JavaScript front-end client for an existing social media platform. This entailed developing a user interface that is not only attractive and responsive but also capable of interacting with the provided API to manage social media content effectively.

## Built With

- [Visual Studio Code](https://code.visualstudio.com/) (HTML5, CSS, JavaScript)
- [Bootstrap](https://getbootstrap.com/)
- [SASS]
- Noroff Social API

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
