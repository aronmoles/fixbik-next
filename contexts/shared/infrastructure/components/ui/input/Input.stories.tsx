import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input } from './Input';

export default {
    title: 'Components/UI/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
    type: 'text',
    onChange: action('change value'),
    placeholder: '⌨️ Input a text',
};

export const Number = Template.bind({});
Number.args = {
    ...Text.args,
    type: 'number',
    placeholder: '⌨️ Input a number',
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Text.args,
    disabled: true,
};
