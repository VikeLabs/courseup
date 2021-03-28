# clockwork
[![Contributors][contributors-shield]][contributors-link]
[![Stargazers][stars-shield]][stars-link]
[![Issues][issues-shield]][issues-link]
[![Website][website-shield]][website-link]

Clockwork is a website built to simplify the experience of searching courses and building timetables for the [University of Victoria](https://uvic.ca) (UVic). The website is a TypeScript app which uses React on the front-end and Firebase on the back-end.

## Contribute
1. Fork the repo
2. Clone your forked repo:
    ```
    git clone https://github.com/<YOUR GITHUB USERNAME>/clockwork.git
    ```
3. Make the project repository the upstream remote:
    ```
    git remote add upstream https://github.com/VikeLabs/clockwork.git
    ```
4. Run `npm install`
    * NOTE: You must be using NPM v6 due to a bug in a dependency.
4. Find an unassigned task on [ZenHub](https://app.zenhub.com/workspaces/team-schedule-courses-5f973f50ae36d70012eb5b2e/board?repos=216653028) to work on.
    * Filter repos to show issues for `clockwork`
5. Run `npm start` to view any front-end changes on `localhost:3000`
6. Create a new branch using `git checkout -b <branch-name>` (make sure it's up to date with `main`)
7. Commit the changes you've made and push to GitHub to create a Pull Request.

## Testing

This project uses [Jest](https://jestjs.io/) testing framework. You can execute tests by running `npm test`.

This will execute tests using Jest files with the extension `*.test*`.

`npx jest --watch` will put Jest into watch mode, which will execute tests as files change.

## Developer Tools

When developing in your local environment, to view components which require requests to populate with data you will need to enable CORS. Install the following extension to do so:
* [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
* [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/access-control-allow-origin/)

For Safari: `Preferences >> Advanced, and select "Disable Cross-Origin Restrictions" from the develop menu.`

## UVic Course Scraper

The website uses the npm package [`uvic-course-scraper`](https://github.com/VikeLabs/uvic-course-scraper). The package is a web-scraping tool made with TypeScript that is the main way of extracting data from UVic. It is contributed to and maintained by the original development team of `clockwork`.

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/VikeLabs/clockwork?style=flat
[contributors-link]: https://github.com/VikeLabs/clockwork/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/VikeLabs/clockwork?style=flat
[stars-link]: https://github.com/VikeLabs/clockwork/stargazers
[issues-shield]: https://img.shields.io/github/issues/VikeLabs/clockwork
[issues-link]: https://github.com/VikeLabs/clockwork/issues
[website-shield]: https://img.shields.io/website?url=https%3A%2F%2Fclockwork.vikelabs.dev%2F
[website-link]: https://clockwork.vikelabs.dev/
