# Welcome

This is a demo project based on [Create React App](https://github.com/facebook/create-react-app) template.

### Purpose

The purpose of this project is to demonstrate a custom datetime component located in `src\components` folder. 

> Example usage

```
import React from 'react';
import './App.scss';
import DateTimePicker from './components/DateTimePicker/dateTimePicker';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DateTimePicker  />
      </header>

    </div>
  );
};
export default App;
```

### Development

> Local development steps & requirements

1. Clone this repository to you local environment
2. Install latest version of [Node.js](https://nodejs.org/en/)
3. With command line navigate to `react-component-demo\src`
4. run `npm install`
5. run `npm start or yarn start`
5. Access the website at [http://localhost:3000](http://localhost:3000)



### Storybook

You can also preview/navigate all components in this project by using the [Storybook](https://storybook.js.org/) tool.

> Local installation steps

1. With command line navigate to `react-component-demo\src`
2. run `npm run storybook`
3. Access storybook at [http://localhost:51505](http://localhost:51505)

Example screen shot: 

![Storybook DateTime Picker](http://laurvasile.s3.amazonaws.com/storybook-demo.png "Storybook DateTime Picker")
