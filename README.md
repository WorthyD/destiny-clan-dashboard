# DestinyClanDashboard

This is a pet project that started in 2019 when I was a Dad's of Destiny admin.  Original project is located at [https://github.com/WorthyD/d2-clandashboard](https://github.com/WorthyD/d2-clandashboard)

Secondary goal of the project was to keep my Angular skills up to date outside of a professional environment.

## Prerequisites

- node
- API key from https://www.bungie.net/en/Application 
  - Set origin header to http://localhost:4321


## Setup

- `npm install`
- Make a file called `secrets.ts` with the following content
  
  ```ts
  export const secretKeys = {
     apiKey: 'YOUR API KEY'
  };
  ```

  - You can also run `npm run config` with an environment variable `API_KEY` equal to your Bungie API key


## Running App(s)

- `npm run start` - starts a local app at http://localhost:4321
- `npm run storybook` - starts storybook component library at http://localhost:6006
- `npm run test:ui` - tests primary project
