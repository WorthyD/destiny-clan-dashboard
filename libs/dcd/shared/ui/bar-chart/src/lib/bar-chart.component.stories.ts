import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BarChartComponent, BarChartUnit } from './bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const meta: Meta<BarChartComponent> = {
  component: BarChartComponent,
  title: 'Shared/UI/BarChartComponent',
  decorators: [
    moduleMetadata({
      imports: [NgApexchartsModule]
    })
  ]
};
export default meta;
type Story = StoryObj<BarChartComponent>;

export const Primary: Story = {
  args: {
    convertTo: 'Minutes',
    barColor: '#3399FF',
    colorTheme: 'dark',
    events: [
      {
        date: '2023-10-31T10:25:32.025Z',
        seconds: 82182
      },
      {
        date: '2023-11-07T11:25:32.025Z',
        seconds: 84946
      },
      {
        date: '2023-11-14T11:25:32.025Z',
        seconds: 47474
      },
      {
        date: '2023-11-21T11:25:32.025Z',
        seconds: 36460
      },
      {
        date: '2023-11-28T11:25:32.025Z',
        seconds: 45188
      },
      {
        date: '2023-12-05T11:25:32.025Z',
        seconds: 58115
      }
    ] as BarChartUnit[]
  }
};
