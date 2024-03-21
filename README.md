![Mockup image](./docs/readme/mockup.jpg)

# Highlights
[Deployed Frontend Site](https://pp5-highlights-a86c2f8f4016.herokuapp.com/)  
[Deployed API](https://drf-highlights-319d26c2d75e.herokuapp.com/)  
[API Repo](https://github.com/DanMorriss/drf-highlights)

## About

Highlights ia a social media platform designed to cultivate gratitude and positivity in everyday life. Inspired by the principles of the Five Minute Journal, our platform provides users with a space to share the highlights of their day and connect with others in a supportive online community.

Key Features:
- Highlight Sharing: Easily post and share the highlights of your day, complete with text descriptions and images.
- Interactive Features: Engage with other users' highlights through likes, comments, and following other users.
- Search and Discovery: Explore highlights by keywords, categories, and following other users to find inspiration and connect with like-minded individuals.
- User Profiles: View your profile and share your highlights with other users.
- Follow and Un-follow: Follow and un-follow other users to build a more engaged online community.

## UX

I followed the five planes of Website Design in the creation of this project.

### 1. Strategy

- Develop a social media platform designed to foster gratitude and enhance users perspective on life. 
- Drawing inspiration from the principal of the five minute journal, the platform aims to provide a space where individuals can share their best highlights of their day. Grounded in scientific research on the benefits of gratitude, the platform aims to cultivate a positive online community.

Key features:
- Highlight sharing: Users can post the highlights of their day, promoting reflection and appreciation for positive moments.
- Interactive Features: To encourage engagement, user have the option to add categories, attach images, and think about things they could improve on.
- Search Functionality: Users can search for highlights by content, category, or user.
- User profiles: Users can view their profile and share their highlights with other users.
- Follow and Un-follow: Users can follow and un-follow other users.

#### User Stories

For more details on the user stories go to the [projects KANBAN board](https://github.com/users/DanMorriss/projects/8)

**First Sprint**

Create an account & Login
- Landing Page
- Navbar
- Create Account
- Log in
- Log out
- Remain logged in

**Second Sprint**

Creating Highlights
- Create Highlight
- View Highlight
- Update a Highlight
- Delete Highlight

Highlight Feeds
- Highlights Feed
- Liked Highlights
- Discover Highlights

**Third Sprint**

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

**Fourth Sprint**

General
- Contact Form
- Tag users in a highlight.
- Add location.
- Responsive site.
- Simple user navigation.
- 404 page.
- User messages.

### 2. Scope

- Purpose: The purpose of the website is to provide a platform for users to share the highlight of their day, fostering gratitude and a positive outlook on life. The website aims to create a supportive online community where users can connect, inspire and uplift each other.
- Target Audience: The target audience includes individuals who are interested in personal development, mindfulness, and self-improvement. This may include a diverse range of demographics, including young adults, professionals, parents, and students, who share a common interest in cultivating gratitude and positivity.
- Core Functionality:
    - Highlight sharing: Users can easily post and share the highlights of their day, including text descriptions, images, categories and things to improve your day.
    - Interactive features: The website enables users to engage with each others highlights through likes and comments, fostering a sense of community and connection.
    - Search and Discovery: Robust search functionality allows users to search for highlights by content, category, or user.
    - User profiles: Users can view each others profiles and comment on individual highlights.
    - Follow and Un-follow: Users are able to follow or un-follow other users to foster a more engaged and connected community.

### 3. Structure

For the database schema visit the [Backend API Repo](https://github.com/DanMorriss/drf-highlights#3-structure)

![Sitemap](docs/wireframes/sitemap.png)
The sitemap was made using [Lucid Chart](https://lucid.app/)

### 4. Skeleton

#### Wireframes

![Landing page wireframe](/docs/wireframes/landing-page-wireframe.png)
![signup wireframe](/docs/wireframes/signup-wireframe.png)
![login wireframe](/docs/wireframes/login-wireframe.png)
![feed wireframe](/docs/wireframes/feed-wireframe.png)
![create highlight wireframe](/docs/wireframes/add-a-highlight-woreframe.png)
![highlight wireframe](/docs/wireframes/highlight-wireframe.png)
![profile wireframe](/docs/wireframes/profile-wireframe.png)
[Canva](https://www.canva.com/en_gb/) was used to create the wireframes.
### 5. Surface

- Color and themes were based on the five minute journal, using earthy calming colors and a mix of clean and handwritten fonts.

![Color Palette](/docs//readme/color-palette.png)
The color palette was built using [Adobe Color](https://color.adobe.com/)
- #FFF5E6
- #DECFBC
- #453A2C
- #CDB990
- #CF8562

![Fonts](/docs/readme/fonts.jpg)
[Google Fonts](https://fonts.google.com/) supplied the fonts
- Montserrat
- Homemade Apple

## Features

### Components

### Pages

### Future Features

- Location data
- Calendar view

## Technologies Used

### Languages

- HTML
- CSS
- JavaScript

### Frameworks, Libraries & Tools

- [Django Rest Framework](https://www.django-rest-framework.org/) - Backend API
- [React](https://react.dev/) - Library for JS
- [React Bootstrap](https://react-bootstrap-v4.netlify.app/) - CSS libraby
- [Canva](https://www.canva.com/en_gb/) - Wire-frame and design
- [GitPod](https://gitpod.io/workspaces) - Virtual IDE
- [GitHub](https://github.com/) - Repo hosting
- [Heroku](https://dashboard.heroku.com/apps) - Deployment
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Fonts
- [LucidChart](https://lucid.app/) - Development of flowchart
- [Chrome Dev Tools](https://developer.chrome.com/docs/devtools) - Development and bug fixing
- [Favicon.io](https://favicon.io/favicon-converter/) - Favicon conversion
- [React Router](https://v5.reactrouter.com/web/guides/quick-start) - Dynamic routing
- [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) - for instant loading and infinite scrolling
- [Axios](https://github.com/axios/axios) - Promise-based HTTP requests
- [Adobe Color](https://color.adobe.com/) - Color Palette
- [Am I Responsive?](https://ui.dev/amiresponsive) - Multi-device mockup

Validation:
[WC3 Validator](https://validator.w3.org/) - validate the html
[Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/) - validate the css
[ESLint](https://eslint.org/) - validate JS code
[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) - validate performance, accessibility, best practice and SEO

## Resources

- Code Institute Moments walkthrough
- React Bootstrap Docs
- Stack Overflow
- Slack Community

## Testing & Validation
Needed to run the following commands to use the correct version of npm:  
`nvm install 16 && use 16`  

For details on testing and validation view the dedicated [testing.md](./TESTING.md) file.

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

- After deleting a highlight, the user was being sent back to the editHighlight form, I sent them to the feed page instead.