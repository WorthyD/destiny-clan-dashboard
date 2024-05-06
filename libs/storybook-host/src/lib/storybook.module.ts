import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {registerIcons} from '@dcd/shared/ui/icons';

@NgModule({
    declarations: [],
    providers: [],
    //imports: [HttpClientModule, MatIconModule]
    imports: [ MatIconModule]
})
export class StorybookModule {
    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        registerIcons(iconRegistry, domSanitizer);
    }
}
