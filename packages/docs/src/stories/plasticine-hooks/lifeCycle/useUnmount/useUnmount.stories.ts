import type { Meta, StoryObj } from '@storybook/react'
import Demo from './Demo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Plasticine Hooks/Life Cycle/useUnmount',
  component: Demo,
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {}
