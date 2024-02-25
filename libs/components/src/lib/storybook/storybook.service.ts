import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { registerIcons } from '../icons/register-icons';

@Injectable()
export class StorybookService {

    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        registerIcons(iconRegistry, domSanitizer);
 }
}
