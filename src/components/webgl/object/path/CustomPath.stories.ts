import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CustomPath from './CustomPath';

const meta = {
  title: 'WebGL/Path',
  component: CustomPath,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: { type: 'object' },
      description: 'Path의 위치 (THREE.Vector3Tuple)',
    },
    line: {
      control: { type: 'object' },
      description: 'IPath 객체 (points, color 등 포함)',
    },
  },
} satisfies Meta<typeof CustomPath>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: [0, 0, 0],
    line: {
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
      color: '#ff0000', // 원하는 색상
    },
  },
};