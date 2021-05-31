# CourseUp

[![Contributors][contributors-shield]][contributors-link]
[![Stargazers][stars-shield]][stars-link]
[![Issues][issues-shield]][issues-link]
[![Website][website-staging-shield]][website-staging-link]
[![Website][website-prod-shield]][website-prod-link]


CourseUp is a website built to simplify the experience of searching courses and building timetables for the [University of Victoria](https://uvic.ca) (UVic). The website is a TypeScript app which uses React on the front-end and Firebase on the back-end.

## Develop
If you're interested developing this application, follow these steps to get running a local version of the application.

**Note**: These instructions are for developing the frontend (React). If you wish to develop the backend, please refer to the README located in `functions` directory in this repository.

1. Fork the repository.
2. Clone your forked repository:
    ```
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/courseup.git
    ```
4. Run `npm ci`
    - Tip: Avoid using `npm install` unless you're installing a package.
5. Start the frontend using `npm start`
    - This will start the [Create React App](https://create-react-app.dev/) development server.
    - All requests to the backend will be routed to the **staging** environment of CourseUp. This can be overrode using the `proxy` property located within `package.json`.

You will now be able to develop the frontend React application. Any changes made to the code will hot-reload upon save.

If you get stuck setting up the development environment, try Google **then** if you're still stuck drop a question in our [GitHub Discussions](https://github.com/VikeLabs/courseup/discussions/categories/q-a).

## Contribute
Thanks for wanting to contribute! Make sure you read up on our contributions guidelines before submitting contributions. 

1. Find an **unassigned** task on [ZenHub](https://app.zenhub.com/workspaces/courseup-5f973f50ae36d70012eb5b2e/board?repos=340229870&showEstimates=false&showMilestones=false) to work on.
    * Filter by label to show issues for `good first issue` to start off!
    * Have discussions about the issue within the comment section of that issue!
2. Create a new branch using `git checkout -b <branch-name>`
    * Tip: Make sure you're up to date with `main`.
    * Tip: Try to use a descriptive branch name.
4. Commit the changes you've made and push to GitHub to create a Pull Request using the templates provided.
    * Make sure you are clear with the changes and note anything that would be useful for the reviewer to know.
    * Your PR doesn't have to be perfect right from the start so don't sweat. Coding is an iterative process with plenty of back and forth.

## Deployment
Hosting is provided by [VikeLabs](https://vikelabs.ca) using [Firebase](https://firebase.google.com/). CourseUp has a **staging** and **production** environment. Changes will be first deployed to staging to be verfied before moving onto production.

## Testing

This project uses [Jest](https://jestjs.io/) testing framework. You can execute tests by running `npm test`.

This will execute tests using Jest files with the extension `*.test*`.

`npx jest --watch` will put Jest into watch mode, which will execute tests as files change.

## UVic Course Scraper

The website uses the npm package [`uvic-course-scraper`](https://github.com/VikeLabs/uvic-course-scraper). The package is a web-scraping tool made with TypeScript that is the main way of extracting data from UVic. It is contributed to and maintained by the original development team of `courseup`.

The motivation of [`uvic-course-scraper`](https://github.com/VikeLabs/uvic-course-scraper) is to abstract away the parsing and scraping required to obtain data. It is not designed to do anything else.

## VikeLabs
This project was developed by students at the [University of Victoria](https://www.uvic.ca) as part of [VikeLabs](https://vikelabs.ca), which is a student-led software development club.

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/VikeLabs/courseup?style=flat
[contributors-link]: https://github.com/VikeLabs/courseup/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/VikeLabs/courseup?style=flat
[stars-link]: https://github.com/VikeLabs/courseup/stargazers
[issues-shield]: https://img.shields.io/github/issues/VikeLabs/courseup
[issues-link]: https://github.com/VikeLabs/courseup/issues
[website-staging-shield]: https://img.shields.io/website?down_message=staging%20offline&up_message=staging&url=https%3A%2F%2Fcourseup.vikelabs.dev
[website-prod-shield]: https://img.shields.io/website?down_message=prod%20offline&up_message=prod&url=https%3A%2F%2Fcourseup.vikelabs.ca
[website-staging-link]: https://courseup.vikelabs.dev/
[website-prod-link]: https://courseup.vikelabs.ca/