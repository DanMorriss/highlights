[Deployed Frontend Site](https://pp5-highlights-a86c2f8f4016.herokuapp.com/)
[Deployed API](https://drf-highlights-319d26c2d75e.herokuapp.com/)

Needed to run the following commands to use the correct version of npm:
`nvm install 16`  
``nvm use 16`  

**Portfolio Project 5**

# Highlights // Your Highlights Journal

**What was the best part of your day?**

Possible features to implement that are not in the Moments walkthrough:

- Link to another user in a highlight
- Add a category to a highlight
- Add a location to a highlight
- A calendar view at the top of users profiles with links to the highlights
- Feedback form for users to send to admin

## About

Highlights ia a social media platform designed to cultivate gratitude and positivity in everyday life. Inspired by the principles of the Five Minute Journal, our platform provides users with a space to share the highlights of their day and connect with others in a supportive online community.

Key Features:
- Highlight Sharing: Easily post and share the highlights of your day, complete with text descriptions, images, user tags and locations.
- Interactive Features: Engage with other users' highlights through likes, comments, and following other users.
- Search and Discovery: Explore highlights by keywords, categories, and user tags to find inspiration and connect with like-minded individuals.
- Calendar Integration: Visualize and track your daily highlights over time with a convenient calendar interface.

## UX

I followed the five planes of Website Design in the creation of this project.

### 1. Strategy

My strategy is to develop a social media platform designed to foster gratitude and enhance users perspective on life. Drawing inspiration from the principal of the five minute journal, the platform aims to provide a space where individuals can share their best highlights of their day. Grounded in scientific research on the benefits of gratitude, the platform aims to cultivate a positive online community.

Key features:
- Highlight sharing: Users can post the highlights of their day, promoting reflection and appreciation for positive moments.
- Interactive Features: To encourage engagement, user have the option to add categories, attach images, tag other users in their posts and add locations.
- Search Functionality: Users can search for highlights by tags, category, or location.
- User profiles: Users can view their profile and share their highlights with other users.
- Calendar display: Users can view their highlights on a calendar view.
- Follow and Un-follow: Users can follow and un-follow other users.

#### User Stories

Create an account & Login
- Landing Page
- Navbar
- Create Account
- Log in
- Log out
- Remain logged in


Creating Highlights
- Create Highlight
- View Highlight
- Update a Highlight
- Delete Highlight

Highlight Feeds
- Highlights Feed
- Liked Highlights
- Discover Highlights

Profile pages
- Edit Profile
- Change Password
- Who to Follow List
- User Profiles

Interactivity
- Like/un-like a Highlight
- Comment on a Highlight
- View comments
- Edit a Comment
- Delete a Comment
- Follow/un-follow a User

General
- Contact Form
- Tag users in a highlight.
- Add location.
- As a site owner I want the site to be fully responsive across all screen sizes so it can be used on any device.
- As a site owner I want the site to be easy to use so I can easily navigate and use it.
- As a site owner I want the site to be secure so I can use it safely and securely.
- As a site owner I want a 404 page so users know when they have tried to access a page that does not exist.
- As a user I want messages feedback messages to be shown when I create, update or delete a highlight or comment so that I can see if I am using the site correctly.

Features to add once MVP is created
- Location data

### 2. Scope

- Purpose: The purpose of the website is to provide a platform for users to share the highlight of their day, fostering gratitude and a positive outlook on life. The website aims to create a supportive online community where users can connect, inspire and uplift each other.
- Target Audience: The target audience includes individuals who are interested in personal development, mindfulness, and self-improvement. This may include a diverse range of demographics, including young adults, professionals, parents, and students, who share a common interest in cultivating gratitude and positivity.
- Core Functionality:
    - Highlight sharing: Users can easily post and share the highlights of their day, including text descriptions, images, locations, categories and other users.
    - Interactive features: The website enables users to engage with each others highlights through likes and comments, fostering a sense of community and connection.
    - Search and Discovery: Robust search functionality allows users to search for highlights by tags, category, or location.
    - User profiles: Users can view each others profiles and comment on individual highlights.
    - Calendar display: The user can view their highlights on a calendar view, providing a convenient and efficient way to keep track of their highlights over time.
    - Follow and Un-follow: Users are able to follow or un-follow other users to foster a more engaged and connected community.

### 3. Structure
### 4. Skeleton

#### Database

Visit backend repo.

#### Wireframes

![Landing page wireframe](/docs/wireframes/landing-page-wireframe.png)
![signup wireframe](/docs/wireframes/signup-wireframe.png)
![login wireframe](/docs/wireframes/login-wireframe.png)
![feed wireframe](/docs/wireframes/feed-wireframe.png)
![create highlight wireframe](/docs/wireframes/add-a-highlight-woreframe.png)
![highlight wireframe](/docs/wireframes/highlight-wireframe.png)
![profile wireframe](/docs/wireframes/profile-wireframe.png)

### 5. Surface

![Color Palette](/docs//readme/color-palette.png)

## Technologies Used

### Languages and Frameworks

### Libraries & Tools

[React Bootstrap](https://react-bootstrap-v4.netlify.app/)

[Favicon.io](https://favicon.io/favicon-converter/) for the favicon conversion

React Router

[Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component)

## Validation

## Testing

## Bugs

- The console was refreshing continuity when a user was not logged in in the local version of the code, in the deployed version once a successful login happened a white page was displayed and the following error was displayed to the console:  
`Access to XMLHttpRequest at 'https://drf-highlights-319d26c2d75e.herokuapp.com/dj-rest-auth/user/' from origin 'https://pp5-highlights-a86c2f8f4016.herokuapp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`  
Inside the CurrentUserContext.js file I was trying to return axiosReq(err.config) rather than axios(err.config). I also needed to add in Add CORS_ALLOWED_ORIGINS back into settings.py for DRF code.

- The form for creating a highlight was throwing a 400 error when an image was not attached. I added the null=True field to the backend model but it still didn't work. So I added a check in the HighlightCreateForm to check if an image is present before appending it to the data.

- Trying to change the way the date is displaying on the highlights in the backend was causing the frontend form to throw a 400 error, so the logic was moved into the highlight.js file in the frontend.

- The liked page was not loading. There was a type in the filter prop in App.js, that let the liked page load. 

- The like button was not displaying the like when clicked on the feel and discover pages but the changes was reaching the database. The page needed to be reloaded to show the like/unlike. There were typos in the Highlight.js handleLike and handleUnlike functions.

- The liked page was showing any result with a like, not ones that are liked by the signed in user. In the backend the filter I had setup was for like__owner__profile and I had typed likes__owner__profile in the frontend. The filters need to match, so I fixed the typo.

- The HighlightEditForm was not allowing me to add or change an image. Access to XMLHttpRequest at 'https://drf-highlights-319d26c2d75e.herokuapp.com/highlights/25' from origin 'https://3000-danmorriss-highlights-4j7i000g906.ws-eu108.gitpod.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. The title was not being sent wth the picture change. Then a 404 error was being thrown. I was missing a trailing / on the axiosReq request, adding it fixed the issue.

- Posting a comment was throwing a 400 error. I had named the highlight prop in the parent component post so the highlight field was showing up as empty.

- The date was not showing up on the comments. I had named the prop wrong (again). As I had made a similar mistake previously it was easy to spot and fix.

- The like button was only showing a new like on a page refresh. I had named the method setHighlights instead of setHighlight (as I did in the parent element), renaming the method fixed it.