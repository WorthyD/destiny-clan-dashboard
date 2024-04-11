import { bootstrapApplication } from '@angular/platform-browser';
import { appProviders } from './app/app.providers';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appProviders).catch((err) => console.error(err));
