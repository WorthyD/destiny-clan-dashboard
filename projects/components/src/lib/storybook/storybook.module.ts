import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StorybookService } from './storybook.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { registerIcons } from '../icons/register-icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    providers: [],
    imports: [CommonModule, BrowserAnimationsModule, HttpClientModule]
})
export class StorybookModule {
    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        registerIcons(iconRegistry, domSanitizer);
    }
}
