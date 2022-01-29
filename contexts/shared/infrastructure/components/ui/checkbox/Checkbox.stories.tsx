import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './Checkbox';

export default {
    title: 'Components/UI/Checkbox',
    component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
    onChange: action('onChange'),
    disabled: false,
    children: 'Checkbox',
};

export const Unchecked = Template.bind({});
Unchecked.args = {
    ...Checked.args,
    checked: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Checked.args,
    disabled: true,
};

