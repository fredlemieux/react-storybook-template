import React from 'react';
// import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $componentName$ from './$componentName$';

describe('$componentName$', () => {
    it('renders without crashing', async () => {
        await mount(<$componentName$ />);
    });
});
