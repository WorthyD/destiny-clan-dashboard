import { CommonModule } from '@angular/common';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Meta, Story } from '@storybook/angular';
export default {
  title: 'Material / Card',
  component: MatCard,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatCardModule, MatButtonModule, BrowserAnimationsModule]
    })
  ]
} as Meta;

const Template: Story<MatCard> = (args: MatCard) => ({
  component: MatCard,
  props: args,
  styles: [
    `
    .example-card {
        max-width: 400px;
      }

      .example-header-image {
        background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
        background-size: cover;
      }
   `
  ],
  template: `
    <mat-card>
    <mat-card-content>Simple card</mat-card-content>
  </mat-card>
  <hr>
<a class="mat-card-link">
<mat-card>
    <mat-card-content>Link Card</mat-card-content>
  </mat-card>
  </a>
  <hr>

  <mat-card>
  <mat-card-header>
    <mat-card-title>Actions Buttons</mat-card-title>
    <mat-card-subtitle>Start</mat-card-subtitle>
  </mat-card-header>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
<hr>
<mat-card class="example-card">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
  <mat-card-content>
    <p>
      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
      bred for hunting.
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
    `
});

export const Default = Template.bind({});
Default.args = {};
