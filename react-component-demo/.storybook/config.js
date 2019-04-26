import { configure } from '@storybook/react';
import 'normalize.css'
function loadStories() {
    require('../stories/datetime-picker.stories.js');
    // You can require as many stories as you need.
}

configure(loadStories, module);
