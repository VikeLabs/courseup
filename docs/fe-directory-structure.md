# Frontend Directory Structure

CourseUp uses a defined structure for directories in order to maintain organization throughout the codebase. This document lays out the meaning and hierarchy of each directory in the frontend of the application.

**It is important when you are developing to conform to these conventions (we'll remind you in your PR if something is out of place :wink:)**

**Table of Contents**
[src](#src)

- [common](#common)
  - [api](#api)
  - [components](#components)
  - [containers](#containers)
  - [hooks](#hooks)
  - [index.tsx](#indextsx)
- [lib](#lib)
- [pages](#pages)

<!-- TODO: Add tests to file structures/section about tests once they're used -->

## src

The `src` directory is home to the entirety of the frontend code. It is broken down into three major directories: `common`, `lib`, and `pages`.

```txt
src/
├─ common/
├─ lib/
├─ pages/
├─ ...top level files

```

### common

`common` is the home of all the components that are commonly used throughout the website. Examples of this are the header and feedback button, which you will see from any page on CourseUp. Depending on the complexity of a common component, it may be broken into a series of subdirectories which consist of: `api` `components`, `containers`, and `hooks`. Every common component should have an `index.tsx` file at the top-level.

```txt
common/
├─ feedback/
├─ header/
│  ├─ api/
│  ├─ components/
│  ├─ containers/
│  ├─ hooks/
│  ├─ index.tsx
├─ etc/

```

#### api

The `api` directory is where all files which communicate _directly_ with an API should live.

For example, a blog component which shows all existing blog posts and allows you to add a blog post would have `getBlogPosts.ts` and `postBlogPost.ts` within the `api` directory. From there they can be utilized elsewhere in the component.

#### components

For larger components, they may need to be broken down into sub-components to decrease clutter. The `components` directory is the home of any additional component that is to be used _specifically_ for the main component. It is important that these components are **[dumb](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components)**.

#### containers

`containers` is home to any **[smart](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components)** component that may be needed for the main component in question. Containers also typically are home to a bulk of the React code, tying together any additional components that may have been created and dealing with formatting. It is often the case that the container is directly exported in `index.tsx` and is what is used elsewhere in the code.

#### hooks

`hooks` contains any custom hook that is used _specifically_ for the component. For instance, if there is any API communication taking place you will want to create a file in `api` and abstract that logic in a custom hook in this directory.

#### index.tsx

`index.tsx` is the main file which exports the component from `common` to be used elsewhere. The benefit of using `index.tsx` vs, for example, `Header.tsx` is the former allows for simplified imports. When using the later approach, you will need to import like so:

```ts
import * from 'src/app/common/header/Header'
```

vs. the much cleaner

```ts
import * from 'src/app/common/header'
```

when using `index.tsx`

### lib

`lib`, similarly to `common`, holds any common code that is imported throughout the codebase. The difference is that `lib` is for all **non-React** code.

There is no strict structure for each sub-directory of `lib`, however common contexts are expected to be grouped together. For example, API functions for a blog would be nested as such: `lib/api/blog/` or utils related to course information would be nested as `lib/utils/courses/`.
**Use your best judgement when creating sub-directories, there's no need for a new directory if it only houses one file**

```txt
lib/
├─ api/
├─ hooks/
├─ styles/
├─ utils/
├─ fetchers.tsx

```

### pages

The final directory, `pages`, is for all the major pages of the app. CourseUp is a multi-page website so splitting their components and logic up appropriately helps our general organization greatly.

The sub-directory guidelines for each page reflect that of the `common` directory (consistency :smile:), so please refer to [those guidelines](#api) for a full rundown of what's expected.

```txt
pages/
├─ calendar/
├─ home/
│  ├─ api/
│  ├─ components/
│  ├─ containers/
│  ├─ hooks/
│  ├─ index.tsx
├─ registration/
├─ scheduler/

```
