import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Home from './index';

export default {
    title: 'Pages/Home',
    component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};

