
//-----------------------------------------------------------------------
// HTML

// filepath: index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign in - Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
        <script src="src/js/index.js" defer type="module"></script>
    </head>
    <body class="body-signin container px-0">
        <main class="form-signin d-flex flex-column col-sm-11 col-md-8 col-lg-6 col-xl-5 vh-100 m-auto py-5 px-5">
            <img src="images/Logo-stronger-together.png" class="pt-5 pb-4 mt-5" alt="" />
            <div class="signin-content px-2 px-sm-5">
                <!--Login form  -->
                <form id="loginForm">
                    <h1 class="h2 mb-3 text-center">Sign in</h1>
                    <div class="form-group mb-3">
                        <label>E-mail</label>
                        <input
                            class="form-control"
                            type="email"
                            name="email"
                            placeholder="email@stud.noroff.no"
                            required
                            pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
                            title="Only @(stud.)noroff.no domains are allowed to register"
                        />
                    </div>
                    <div class="form-group mb-3">
                        <label>Password (min 8 characters)</label>
                        <input class="form-control" type="password" name="password" placeholder="Password" required minlength="8" />
                    </div>
                    <div class="checkbox mb-3 text-center">
                        <label class="remember mb-0"> <input type="checkbox" value="remember-me" /> Remember me </label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary">Sign in</button>
                    <a href="#">Forgot password?</a>
                </form>
                <a href="/profile/register/" class="w-100 btn btn-lg btn-secondary btn-create mt-5">Create account</a>
            </div>
        </main>
    </body>
</html>

//-------------------------------------------------------
// filepath: posts/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Posts | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script type="module" src="/src/js/index.js" defer></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
    </head>
    <body class="body-feed">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2 current" aria-current="page" href="#">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="../index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="pb-5 text-center container feed__share">
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto py-5">
                    <h1 class="text-center border-bottom border-primary border-3">Share your latest workout</h1>
                    <div class="btn-share mt-3">
                        <h3>Update followers on your latest achievements and get kudos for beeing a beast!</h3>
                        <a href="/post/create/index.html" class="w-100 btn btn-lg btn-secondary btn-create mt-3">Create post</a>
                    </div>
                </div>
            </section>

            <section class="feed__posts container bg-light py-5">
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <div class="row d-flex flex-column flex-sm-row justify-content-between ms-2 mb-3">
                        <div class="feed__posts-heading ps-0">
                            <h1 class="border-bottom border-primary border-3">Latest workouts</h1>
                        </div>
                        <select class="text-start fs-6 btn form-select form-control h-100" id="select-workout" required="">
                            <option selected="" disabled="" value="">Sort by activity</option>
                            <option>All activities</option>
                            <option>Running outdors</option>
                            <option>Weight lifting</option>
                            <option>Body strength</option>
                            <option>Yoga</option>
                            <option>Skiing</option>
                            <option>Cycling</option>
                            <option>Spinning</option>
                            <option>Threadmill</option>
                            <option>Aerobic</option>
                            <option>Stretching</option>
                            <option>Crossfit</option>
                            <option>Swimming</option>
                            <option>Hiking</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <!-- List of post thumbnails -->
                    <div id="postList" class="col-12"></div> 
                </div>
            </section>
        </main>
    </body>
</html>

// ------------------------------------------------------------------
// filepath: post/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Post | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
        <script type="module" defer src="/src/js/index.js"></script>
    </head>
    <body class="body-feed">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="feed__posts container bg-light py-5">
                <div id="postContainer" class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
                    <!-- Post goes here  -->
                </div>
                <div class="d-grid mt-4 mb-5 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <a href="/posts/index.html" class="btn btn-sm btn-secondary mb-2">Feed</a>
                    <a href="/profile/index.html" class="btn btn-sm btn-primary">Profile</a>
                </div>
            </section>
        </main>
    </body>
</html>

// -----------------------------------------------------------------
// filepath: post/create/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Create Post | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script type="module" src="/src/js/index.js" defer></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
    </head>
    <body class="body-feed">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="feed__posts container bg-light py-5">
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
                    <!-- Create post -->
                    <div id="post" class="card feed-post col-12 mb-3 pb-3 mt-5">
                        <form id="createPost" class="needs-validation" novalidate>
                            <div class="row py-2 px-3">
                                <h1>Create Post</h1>

                                <div class="form-group mb-2 text-start">
                                    <label class="mb-0">Title</label>
                                    <input type="text" class="form-control" name="title" placeholder="Give your workout a title" required />
                                </div>

                                <div class="form-group mb-2 text-start">
                                    <label class="mb-0">Body</label>
                                    <textarea type="text" class="form-control" name="body" placeholder="Describe your workout" required></textarea>
                                </div>

                                <div class="form-group mb-2 text-start">
                                    <label class="mb-0">Tags</label>
                                    <input type="text" class="form-control" name="tags" />
                                </div>

                                <div class="form-group mb-2 text-start">
                                    <label class="mb-0">Media</label>
                                    <input type="url" class="form-control" name="media" placeholder="Paste in URL for image" />
                                </div>

                                <div class="btn-share mt-2">
                                    <button class="w-100 btn btn-lg btn-secondary btn-create">Create Post</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </body>
</html>

//--------------------------------------------------------------------------
// filepath: post/edit/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Post | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
        <script type="module" defer src="/src/js/index.js"></script>
    </head>
    <body class="body-feed">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="feed__posts container bg-light py-5">
                <div id="postContainer" class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
                    <!-- Post goes here  -->
                </div>
                <div class="d-grid mt-4 mb-5 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <a href="/posts/index.html" class="btn btn-sm btn-secondary mb-2">Feed</a>
                    <a href="/profile/index.html" class="btn btn-sm btn-primary">Profile</a>
                </div>
            </section>
        </main>
    </body>
</html>

//------------------------------------------------------------------
// filepath: profile/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script src="/src/js/index.js" type="module" defer></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
    </head>
    <body class="body-profile">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" aria-current="page" href="/posts/index.html">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2 current" href="#">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="../index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="profile pb-4 text-center container">
                <div class="card profile__box bg-dark text-light shadow-sm col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto p-2">
                    <div class="d-sm-flex">
                        <div class="profile__info text-center mt-2 border border-white p-2 p-md-3 m-2 mb-sm-0">
                            <img src="../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile Picture" class="profile__user-img img-fluid rounded-circle w-25 shadow-sm" />
                            <h3 class="mb-0 color-secondary">Cathy Catyson</h3>
                            <p class="mb-0">yoga-cathy@mail.com</p>
                            <p class="mb-0">New York, USA</p>
                        </div>
                        <div class="profile__follow mt-2 border border-white p-2 p-md-3 mx-2 mt-2 mb-0 d-flex align-items-center">
                            <div class="text-center follow mx-auto pb-1 pb-sm-0">
                                <div class="d-flex justify-content-center">
                                    <a class="nav-link follow__count p-2 me-1" href="#">
                                        <p class="mb-0 fs-4">435</p>
                                        <p class="mb-0">Followers</p>
                                    </a>
                                    <a class="nav-link follow__count p-2 ms-1" href="#">
                                        <p class="mb-0 fs-4">378</p>
                                        <p class="mb-0">Following</p>
                                    </a>
                                </div>
                                <button class="btn btn-secondary follow-button mt-2 mt-md-3">Follow</button>
                            </div>
                        </div> 
                    </div>
                    <div class="profile__bio mt-2 border border-white p-2 p-md-3 mx-2 mt-0 mb-2">
                        <p class="mb-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores maxime labore cumque nobis repellendus officiis voluptatem assumenda natus sunt.</p>
                    </div>
                </div>
            </section>
            <section class="feed__posts profile__posts container bg-light py-2">
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <div class="btn-share pb-5">
                        <a href="/post/create/" class="w-100 btn btn-lg btn-secondary btn-create mt-3">Create post</a>
                    </div>
                    <div class="feed__posts-heading ms-3 mb-3">
                        <h1 class="border-bottom border-primary border-3">My workouts</h1>
                    </div>
                    <div class="card feed-post col-12 mb-3 pb-3">
                        <div class="col-11 mx-auto pt-3">
                            <div class="d-flex">
                                <div class="mx-2 mb-2">
                                    <img src="../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile image" title="Profile image" width="100%" class="card shadow-sm profile-image" />
                                </div>
                                <div>
                                    <h1 class="feed-heading feed-name mb-0 fs-3">Cathy Catyson</h1>
                                    <p class="feed-heading feed-title fs-2 lh-1">Yoga and restitution!</p>
                                </div>
                            </div>
                            <div class="card shadow-sm bg-light">
                                <img
                                    src="../images/yoga-girl-amauri-mejia-n5trbdfW7fM-unsplash.jpg"
                                    alt="Workout image feed"
                                    title="Workout image"
                                    class="bd-placeholder-img card-img-top"
                                    width="100%"
                                />
                                <div class="card-body">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius magnam..</p>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-secondary me-1">View</button>
                                            <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                        </div>
                                        <small class="text-muted">Yesterday, 4:20 PM</small>
                                    </div>
                                    <div>
                                        <div class="d-flex mb-3">
                                            <div>
                                                <img
                                                    src="../images/profile-2-christian-buehner-DItYlc26zVI-unsplash.jpg"
                                                    alt="Profile image"
                                                    title="Profile image"
                                                    width="100%"
                                                    class="card shadow-sm user-img"
                                                />
                                            </div>
                                            <p class="comment ms-1 p-2 w-100 mb-0">
                                                Wow, that looks like a nice treat for mind and body! I am currently trying to do some more flexibility training, but it's difficult to find the
                                                time. Maybe yoga would do me good. Where are you on these images?
                                            </p>
                                        </div>
                                        <div class="add-comment input-group shadow-sm mb-1">
                                            <button type="button" id="button-addon1" class="btn btn-secondary">Comment</button>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Write a comment"
                                                aria-label="Example     text with button addon"
                                                aria-describedby="button-addon1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card feed-post col-12 mb-3 pb-3">
                        <div class="col-11 mx-auto pt-3">
                            <div class="d-flex">
                                <div class="mx-2 mb-2">
                                    <img src="../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile image" title="Profile image" width="100%" class="card shadow-sm profile-image" />
                                </div>
                                <div>
                                    <h1 class="feed-heading feed-name mb-0 fs-3">Cathy Catyson</h1>
                                    <p class="feed-heading feed-title fs-2 lh-1">30 min morning yoga!</p>
                                </div>
                            </div>
                            <div class="card shadow-sm bg-light">
                                <img src="../images/yoga-AdobeStock_188792392.jpg" alt="Workout image feed" title="Workout image" class="bd-placeholder-img card-img-top" width="100%" />
                                <div class="card-body">
                                        <p class="card-text">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam velit beatae minus quos debitis temporibus voluptas minima impedit. Dolore accusantium
                                            libero qui rerum odio. Amet ea similique provident delectus laborum!
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-secondary me-1">View</button>
                                                <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                            </div>
                                            <small class="text-muted">September 12, 9:13 AM</small>
                                        </div>
                                        <div class="add-comment input-group shadow-sm mb-1">
                                            <button type="button" id="button-addon1" class="btn btn-secondary">Comment</button>
                                            <input type="text" class="form-control" placeholder="Write a comment" aria-label="Example     text with button addon" aria-describedby="button-addon1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
</html>

//-----------------------------------------------------------
// filepath: profile/edit/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile | Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script src="../../src/js/bsFormValidation.js" defer></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
    </head>
    <body class="body-profile">
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-symbols-outlined display-3"> menu </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" aria-current="page" href="/feed/">Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2 current" href="#">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="../../index.html">Sign out</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
        <main class="row g-0 m-0">
            <section class="profile pb-4 text-center container">
                <div class="card profile__box bg-dark text-light shadow-sm col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto p-2">
                    <div class="d-sm-flex">
                        <div class="profile__info text-center mt-2 border border-white p-2 p-md-3 m-2 mb-sm-0">
                            <img src="../../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile Picture" class="profile__user-img img-fluid rounded-circle w-25 shadow-sm" />
                            <h3 class="mb-0 color-secondary">Cathy Catyson</h3>
                            <p class="mb-0">yoga-cathy@mail.com</p>
                            <p class="mb-0">New York, USA</p>
                        </div>
                        <div class="profile__follow mt-2 border border-white p-2 p-md-3 mx-2 mt-2 mb-0 d-flex align-items-center">
                            <div class="text-center follow mx-auto pb-1 pb-sm-0">
                                <div class="d-flex justify-content-center">
                                    <a class="nav-link follow__count p-2 me-1" href="#">
                                        <p class="mb-0 fs-4">435</p>
                                        <p class="mb-0">Followers</p>
                                    </a>
                                    <a class="nav-link follow__count p-2 ms-1" href="#">
                                        <p class="mb-0 fs-4">378</p>
                                        <p class="mb-0">Following</p>
                                    </a>
                                </div>
                                <button class="btn btn-secondary follow-button mt-2 mt-md-3">Follow</button>
                            </div>
                        </div> 
                    </div>
                    <div class="profile__follow mt-2 border border-white p-2 p-md-3 mx-2 mt-0 mb-2">
                        <p class="mb-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores maxime labore cumque nobis repellendus officiis voluptatem assumenda natus sunt.</p>
                    </div>
                </div>
            </section>
            <section class="feed__posts profile__posts container bg-light py-5">
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <div class="feed__posts-heading ms-3 mb-3">
                        <h1 class="border-bottom border-primary border-3">My workouts</h1>
                    </div>
                    <div class="card feed-post col-12 mb-3 pb-3">
                        <div class="col-11 mx-auto pt-3">
                            <div class="d-flex">
                                <div class="mx-2 mb-2">
                                    <img src="../../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile image" title="Profile image" width="100%" class="card shadow-sm profile-image" />
                                </div>
                                <div>
                                    <h1 class="feed-heading feed-name mb-0 fs-3">Cathy Catyson</h1>
                                    <p class="feed-heading feed-title fs-2 lh-1">Yoga and restitution!</p>
                                </div>
                            </div>
                            <div class="card shadow-sm bg-light">
                                <img
                                    src="../../images/yoga-girl-amauri-mejia-n5trbdfW7fM-unsplash.jpg"
                                    alt="Workout image feed"
                                    title="Workout image"
                                    class="bd-placeholder-img card-img-top"
                                    width="100%"
                                />
                                <div class="card-body">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius magnam..</p>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-secondary me-1">View</button>
                                            <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                        </div>
                                        <small class="text-muted">Yesterday, 4:20 PM</small>
                                    </div>
                                    <div>
                                        <div class="d-flex mb-3">
                                            <div>
                                                <img
                                                    src="../../images/profile-2-christian-buehner-DItYlc26zVI-unsplash.jpg"
                                                    alt="Profile image"
                                                    title="Profile image"
                                                    width="100%"
                                                    class="card shadow-sm user-img"
                                                />
                                            </div>
                                            <p class="comment ms-1 p-2 w-100 mb-0">
                                                Wow, that looks like a nice treat for mind and body! I am currently trying to do some more flexibility training, but it's difficult to find the
                                                time. Maybe yoga would do me good. Where are you on these images?
                                            </p>
                                        </div>
                                        <div class="add-comment input-group shadow-sm mb-1">
                                            <button type="button" id="button-addon1" class="btn btn-secondary">Comment</button>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Write a comment"
                                                aria-label="Example     text with button addon"
                                                aria-describedby="button-addon1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card feed-post col-12 mb-3 pb-3">
                        <div class="col-11 mx-auto pt-3">
                            <div class="d-flex">
                                <div class="mx-2 mb-2">
                                    <img src="../../images/profile-3-gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="Profile image" title="Profile image" width="100%" class="card shadow-sm profile-image" />
                                </div>
                                <div>
                                    <h1 class="feed-heading feed-name mb-0 fs-3">Cathy Catyson</h1>
                                    <p class="feed-heading feed-title fs-2 lh-1">30 min morning yoga!</p>
                                </div>
                            </div>
                            <div class="card shadow-sm bg-light">
                                <img src="../../images/yoga-AdobeStock_188792392.jpg" alt="Workout image feed" title="Workout image" class="bd-placeholder-img card-img-top" width="100%" />
                                <div class="card-body">
                                        <p class="card-text">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam velit beatae minus quos debitis temporibus voluptas minima impedit. Dolore accusantium
                                            libero qui rerum odio. Amet ea similique provident delectus laborum!
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-secondary me-1">View</button>
                                                <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                            </div>
                                            <small class="text-muted">September 12, 9:13 AM</small>
                                        </div>
                                        <div class="add-comment input-group shadow-sm mb-1">
                                            <button type="button" id="button-addon1" class="btn btn-secondary">Comment</button>
                                            <input type="text" class="form-control" placeholder="Write a comment" aria-label="Example     text with button addon" aria-describedby="button-addon1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
</html>

//---------------------------------------------------
// filepath: profile/register/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign in - Stronger together</title>
        <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
        <link rel="stylesheet" href="/dist/css/index.css" />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"
            defer
        ></script>
        <script src="/src/js/index.js" defer type="module"></script>

        <!-- <script src="/src/js/handlers/register.js" defer type="module"></script> -->
    </head>
    <body class="body-signin bg-dark container px-0">
        <main class="form-signin d-flex flex-column col-sm-11 col-md-8 col-lg-6 col-xl-5 vh-100 m-auto py-5 px-5">
            <img src="../../images/Logo-stronger-together.png" class="pt-5 pb-4 mt-5" alt="" />
            <div class="signin-content px-2 px-sm-5">
                <form id="registerForm">
                    <!-- <form id="registerForm" method="post" action="/auth/register"> -->
                    <!-- <form id="registerForm" method="get" action="/profile/"> -->
                    <h1 class="h2 mb-3 text-center">Create account</h1>
                    <div class="form-group mb-3">
                        <label>User name</label>
                        <input
                            class="form-control"
                            type="text"
                            name="name"
                            placeholder="UserName_87"
                            required
                            pattern="^[\w]+$"
                            title="User name must only contain lower case and upper case letters, numbers and underscore. Example: GoodUserName_87"
                        />
                        <div class="help bg-dark text-white mt-1 py-1 ps-1">Lower and upper case letters, numbers and underscore allowed</div>
                    </div>
                    <div class="form-group mb-3">
                        <label>E-mail</label>
                        <input
                            class="form-control"
                            type="email"
                            name="email"
                            placeholder="email@stud.noroff.no"
                            required
                            pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
                            title="Only @(stud.)noroff.no domains are allowed to register"
                        />
                        <div class="help bg-dark text-white mt-1 py-1 ps-1">Only @(stud.)noroff.no domains</div>
                    </div>
                    <div class="form-group mb-3">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" placeholder="Password" required minlength="8" />
                        <div class="help bg-dark text-white mt-1 py-1 ps-1">Minimum 8 characters</div>
                    </div>
                    <div class="form-group mb-3">
                        <label>Banner</label>
                        <input class="form-control" type="url" name="banner" placeholder="URL" />
                    </div>
                    <div class="form-group mb-4">
                        <label>Avatar</label>
                        <input class="form-control" type="url" name="avatar" placeholder="URL" />
                    </div>
                    <button class="w-100 btn btn-lg btn-primary">Create account</button>
                </form>
                <a href="/index.html" class="w-100 btn btn-lg btn-secondary btn-create mt-5">Sign in</a>
            </div>
        </main>
    </body>
</html>

//---------------------------------------------------------------------
// JavaScript code 

// filepath: src/js/index.js

import * as listeners from "./handlers/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";

// Routing behaviour to make sure the wrong scripts are not running

const path = location.pathname;
console.log(path);

switch (location.pathname) {
    case "/":
    case "/index.html":
        listeners.setLoginFormListener();
        break;
    case "/profile/register/":
    case "/profile/register/index.html":
        listeners.setRegisterFormListener();
        break;
    // case "/post/":
    // case "/post/index.html":
    //     listeners.setRemovePostFormListener();
    //     break;
    case "/post/create/":
    case "/post/create/index.html":
        listeners.setCreatePostFormListener();
        break;
    case "/post/edit/":
    case "/post/edit/index.html":
        listeners.setUpdatePostFormListener();
        break;
    default:
}

// Code to click on view more link and see post details:
if (location.pathname.includes("/post/index.html")) {
    // Executes for the post detail page
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get("id");

    if (postId) {
        async function renderPost() {
            // Fetch the specific post by ID using the getPost method
            const post = await postMethods.getPost(postId);
            const container = document.querySelector("#postContainer");
            templates.renderPostTemplate(post, container);
            console.log(post);
            const removePostButton = document.querySelector("#removePostButton");
            console.log(removePostButton);

            if (removePostButton) {
                removePostButton.addEventListener("click", async (event) => {
                    console.log(removePostButton);
                    event.preventDefault();
                    // Remove post
                    try {
                        await postMethods.removePost(postId);
                        // Message indicating the post has been deleted.
                        alert("Post has been deleted.");
                        // Remove the post UI from the page.
                        const postContainer = document.querySelector("#postContainer");
                        if (postContainer) {
                            templates.afterDeleteTemplate();
                        }
                    } catch (error) {
                        console.error("Error deleting post:", error);
                        alert("An error occurred while deleting the post.");
                    }
                });
            }
        }

        renderPost();
    } else {
        templates.afterDeleteTemplateError();
    }
} else {
    // Executes for the posts/index.html page
    // Rendering the list of posts
    async function renderPosts() {
        const posts = await postMethods.getPosts();
        console.log(posts);
        const container = document.querySelector("#postList");
        templates.renderPostTemplates(posts, container);
    }

    renderPosts();
}

//--------------------------------------------------------------------------------------
// filepath: src/js/storage/index.js

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}

//---------------------------------------------------------
// filepath: src/js/api/authFetch.js

import { load } from "../storage/index.js";

export function headers() {
    const token = load("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options, //spread everything we are getting provided from postData
        headers: headers(),
    });
}

//-----------------------------------------------------------------------
// filepath: src/js/api/constants.js

export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE = "/api/v1";
export const API_SOCIAL_BASE = "/social";
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

//----------------------------------------------------------------------
// filepath: src/js/api/auth/login.js

import { API_SOCIAL_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_SOCIAL_URL + action;
    // console.log("This is the login URL:", loginURL);

    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    // const result = await response.json();
    // console.log("This is a new user logged in, with an ID and token", result);
    // storage.save("token", result.accessToken);
    // storage.save("profile", result);
    //Instead of grabbing the whole object and picking them apart like above, we can destructure

    const { accessToken, ...user } = await response.json(); //the first is the token and then we want everything else to be called user
    console.log("This is a new user logged in, with a token", accessToken, user);
    storage.save("token", accessToken); // Saves the token seperatly
    storage.save("profile", user); // saves all the other details apart from the token as user

    alert("You are now logged in");
    window.location.href = "/posts/index.html";
}

//----------------------------------------------------------
// filepath: src/js/api/auth/register.js

import { API_SOCIAL_URL } from "../constants.js";
import { login } from "./login.js";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
    const registerURL = API_SOCIAL_URL + action;

    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    const result = await response.json();
    console.log("register result:", result);

    alert("You are now registered");
    window.location.href = "/index.html";
}

//--------------------------------------------------------------------
// filepath: src/js/api/posts/index.js

export * from "./create.js";
export * from "./read.js";
export * from "./update.js";
export * from "./delete.js";

//--------------------------------------------------------------------
// filepath: src/js/api/posts/create.js

import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
    const createPostURL = API_SOCIAL_URL + action;

    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData),
    });

    return await response.json();
}

//-----------------------------------------------------------------
// filepath: src/js/api/posts/delete.js

import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const deletePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(deletePostURL, {
        method,
    });

    return await response.json();
}

//--------------------------------------------------------------------
// filepath: src/js/api/posts/read.js

import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get"; //do not have to write this

export async function getPosts() {
    const getPostURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(getPostURL);

    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(getPostURL);

    return await response.json();
}

//------------------------------------------------------------------
// filepath: src/js/api/posts/update.js

import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postID");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        body: JSON.stringify(postData),
    });

    return await response.json();
}

//---------------------------------------------------------------------
// filepath: src/js/handlers/index.js

export * from "./login.js";
export * from "./register.js";
export * from "./createPost.js";
export * from "./updatePost.js";

//-------------------------------------------------------------------
// filepath: src/js/handlers/register.js

import { register } from "../api/auth/register.js";

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");
    // console.log(form);

    if (form) {
        //this says: do not proceed if there is no form/proceed if there is a form. If it fails to find the registerform it won't do anything
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            // console.log(form);

            const formData = new FormData(form); //provide the form data to this constructor
            // const password = formData.get("password");

            //but since we want an object, not an array, we can say
            const profile = Object.fromEntries(formData.entries());
            console.log("This is the users profile info when register", profile);

            //Send it to the API
            register(profile);
        });
    }
}

//--------------------------------------------------------------------
// filepath: src/js/handlers/login.js
import { login } from "../api/auth/login.js";

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");
    //this says: proceed if there is a form. If it fails to find the loginform it won't do anything
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor

            // const profile = formData.entries() //Loop through an object an gives you the key AND the value. Gives you an array with key and value.
            //want an object, not an array, we can say
            const profile = Object.fromEntries(formData.entries());
            console.log("This is the users profile info when logging in", profile);

            //Now we have collected the profile data.
            //Send it to the API
            login(profile);
        });
    }
}

//---------------------------------------------------------------
// filepath: src/js/handlers/createPost.js

import { createPost } from "../api/posts/index.js";

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            console.log("This is a post created", post);

            try {
                const createdPost = await createPost(post);
                const createdPostId = createdPost.id;
                alert("Your post was successfully created.");
                location.href = `/post/index.html?id=${createdPostId}`;
            } catch (error) {
                console.error("Error creating post:", error);
                alert("An error occurred while creating the post.");
            }
        });
    }
}

//----------------------------------------------------
// filepath: src/js/handlers/updatePost.js

import { getPost, updatePost } from "../api/posts/index.js";

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPost");
    const container = document.querySelector("#editPostContainer");
    //console.log(form);

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        //disable the form with the button before it is uploaded
        const button = form.querySelector("button");
        button.disabled = true;

        //loading the form
        const postEdit = await getPost(id);
        form.title.value = postEdit.title;
        form.body.value = postEdit.body;
        form.tags.value = postEdit.tags;
        form.media.value = postEdit.media;

        //Once we have loaded the form
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            post.id = id;
            console.log("This is the updated post", post);

            // Send it to the API
            updatePost(post);

            container.appendChild(form);

            alert("You're post was successfully updated.");
            location.href = `/post/index.html?id=${id}`;
        });
    }
}

//----------------------------------------------------------------------
// filepath: src/js/templates/index.js

export * from "./post.js";
export * from "./afterDelete.js";

//-----------------------------------------------------------------------
// filepath: src/js/templates/post.js

// Post template for post in FEED postList
export function postTemplateForFeed(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = "../images/profile-1-harry-cunningham-EPi3TRQc5Z0-unsplash.jpg";
    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-3";
    nameHeading.textContent = "Peter Peterson";

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media; // Use the API-provided image URL
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    cardTextParagraph.textContent = postData.body;

    //Button view more in posts in feed-----------------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-flex justify-content-between align-items-center mb-3";
    const viewMoreButton = document.createElement("a");
    viewMoreButton.href = `/post/index.html?id=${postData.id}`;
    viewMoreButton.className = "btn btn-sm btn-secondary";
    viewMoreButton.textContent = "View more";
    //---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted text-end";
    timeSmall.textContent = "9 mins";

    buttonDiv.appendChild(viewMoreButton);
    buttonDiv.appendChild(timeSmall);

    const commentDiv = document.createElement("div");
    commentDiv.className = "d-flex mb-3";

    const userImageDiv = document.createElement("div");
    userImageDiv.appendChild(profileImage.cloneNode(true));

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = "Hi there! Nice work! Would love to hear more about your marathon training! DM me!";

    commentDiv.appendChild(userImageDiv);
    commentDiv.appendChild(commentParagraph);

    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentDiv);
    cardBodyDiv.appendChild(addCommentDiv);
    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

// Post template for post details
export function postTemplateDetails(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = "../images/profile-1-harry-cunningham-EPi3TRQc5Z0-unsplash.jpg";
    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-3";
    nameHeading.textContent = "Peter Peterson";

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media; // Use the API-provided image URL
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    cardTextParagraph.textContent = postData.body;

    //Buttongroup for the post details page: ----------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-grid align-items-center mb-3";

    const updateButton = document.createElement("a");
    updateButton.href = `/post/edit/?id=${postData.id}`;
    updateButton.className = "btn btn-sm btn-secondary";
    updateButton.innerHTML = '<i class="bi bi-pencil-square"></i> Update';

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-primary ms-2";
    removeButton.id = "removePostButton";
    removeButton.innerHTML = '<i class="bi bi-trash-fill"></i> Remove';

    buttonDiv.appendChild(updateButton);
    buttonDiv.appendChild(removeButton);
    // console.log(removeButton);
    innerDiv.appendChild(buttonDiv);
    //Buttongroup finished---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted text-end";
    timeSmall.textContent = "9 mins";
    buttonDiv.appendChild(timeSmall);

    const commentDiv = document.createElement("div");
    commentDiv.className = "d-flex mb-3";

    const userImageDiv = document.createElement("div");
    userImageDiv.appendChild(profileImage.cloneNode(true));

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = "Hi there! Nice work! Would love to hear more about your marathon training! DM me!";

    commentDiv.appendChild(userImageDiv);
    commentDiv.appendChild(commentParagraph);

    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentDiv);
    cardBodyDiv.appendChild(addCommentDiv);
    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

export function renderPostTemplate(postData, parent) {
    //Put the post template inside the parent
    parent.append(postTemplateDetails(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplateForFeed));
}

//-------------------------------------------------------------------------
// filepath: src/js/templates/afterDelete.js

export function afterDeleteTemplate() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<div class="d-flex mt-5">
                                    <i class="bi bi-check-circle-fill h1 text-success me-2"></i>
                                    <h1>Your post was deleted!</h1>
                                </div>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}

export function afterDeleteTemplateError() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<h1>Sorry, post not found</h1>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}

//--------------------------------------------------------------------------

