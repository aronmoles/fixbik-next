import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

export default {
    title: 'Components/UI/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    type: 'button',
    children: 'This is a button',
    onClick: action('onClick')
};

