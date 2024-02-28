# css-frameworks-ca
Replace this text with a description of your social media project.
![image](./image/Screenshot-ArtConnect.png)

A socialmedia app for people to share their art

## Description

A project to learn bootstrap and SASS

created a social media app where people can share pictures of art and get feedback

- Profile page with profile image, username, user posts, area to display followers and follow button
- Login page with authentication, HTML form validation
- Feed page with list of posts, search bar, sort options


## Built With

- HTML
- CSS
- JS
- Bootstrap
- SCSS
- SASS

## Getting Started

### Installing

clone the repo and install.

1. Clone the repo:

```bash
git clone https://github.com/IceGreenGalactic/css-frameworks-ca.git

2. Install the dependencies:
```
```bash
npm install-D sass
```
```bash
npm install bootstrap@5.3.2
```
```bash
npm install-D live-server
```
### Running

To run the app, run the following commands:

```bash
npm run dev
```

## Contact

[My LinkedIn page](https://www.linkedin.com/in/kristine-tyrholm-7902172a4)





saving things

<!--feed without extra html -->
 <main>
        <section class="container mt-5">
            <div class="row justify-content-evenly">
                <div class="col-8 col-sm-6 d-flex mb-2">
                    <!-- Search Bar -->
                    <div class="input-group ">
                        <input type="text" class="form-control form-group" placeholder="Search for posts..."
                            aria-label="Search for posts" aria-describedby="button-search">
                        <div class="input-group-append">
                            <button class="btn btn-outline-success z-0" type="button" id="button-search">Search</button>
                        </div>
                    </div>
                </div>

                <!-- Sort Options-- >
                <div class="col-10 col-sm-5 ">
                    <div class="d-flex align-items-center">
                        <label for="sortOptions" class="col-3 col-sm-4 col-md-3 col-lg-2 sort-small">Sort By:</label>
                        <select class="form-control w-50 w-sm-25" id="sortOptions">
                            <option>Newest </option>
                            <option>Oldest</option>
                            <option>Most Liked</option>
                        </select>
                        <i class="fa-solid fa-arrow-down-wide-short fs-5 ms-1"></i>

                    </div>
                </div>
            </div>

            <div class="container mt-5 justify-content-center m-auto col-12 col-lg-8">
                <div class="row">
                    <div class=" m-auto ">
                        <div class="container">

                            <!-- New Post Button -->
                            <div class="card-body">
                                <div class="row g-0 mb-5">
                                    <div class="col-2">
                                        <img src="../image/userIMG1.JPG" class="card-img replace-avatar"
                                            alt="Profile image">
                                    </div>
                                    <div class="card col-10 bg-light text-dark">

                                        <div class="card-body">
                                            <h5 class="card-title">Do you have some new art to show off?</h5>
                                            <button type="button" class="btn btn-outline-primary btn-sm"
                                                data-bs-toggle="modal" data-bs-target="#createPostModal">
                                                Create New Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container" id="posts">
                </div>
            </div>
        </section>
    </main>