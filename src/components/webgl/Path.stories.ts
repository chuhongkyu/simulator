import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PathMesh from './Path';

const meta = {
  title: 'WebGL/Path',
  component: PathMesh,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    color: { 
      control: 'color',
      description: 'Path의 색상'
    },
    width: { 
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Path의 두께'
    },
    renderOrder: { 
      control: { type: 'number', min: 0, max: 10 },
      description: '렌더링 순서'
    },
    posY: { 
      control: { type: 'range', min: -2, max: 2, step: 0.1 },
      description: 'Y축 위치'
    }
  },
} satisfies Meta<typeof PathMesh>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: [
      [0, 0, -5],
      [0, 0, -10],
      [0, 0, -15],
      [0, 0, -20],
      [0, 0, -25],
      [0, 0, -30],
      [0, 0, -35],
      [0, 0, -40],
      [0, 0, -45],
      [0, 0, -50],
      [0, 0, -55],
      [0, 0, -60],
      [-5, 0, -65],
      [-20, 0, -65],
      [-25, 0, -65],
      [-30, 0, -65],
      [-35, 0, -65],
      [-40, 0, -65],
      [-45, 0, -65],
      [-50, 0, -65],
      [-55, 0, -65],
      [-60, 0, -65],
      [-65, 0, -65],
      [-70, 0, -65],
      [-75, 0, -65],
      [-80, 0, -65],
      [-85, 0, -65],
      [-90, 0, -60],
      [-91.5, 0, -55],
      [-93, 0, -50],
      [-94.5, 0, -45],
      [-96, 0, -40],
      [-97.5, 0, -35],
      [-99, 0, -30],
      [-100.5, 0, -25],
      [-102, 0, -20],
      [-103.5, 0, -15],
      [-105, 0, -10],
      [-106.5, 0, -5],
      [-108, 0, 0],
    ],
  },
};