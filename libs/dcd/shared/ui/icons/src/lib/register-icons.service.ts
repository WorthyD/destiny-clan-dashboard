import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { registerIcons } from './register-icons';

@Injectable()
export class RegisterIconsService {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    console.log('registering icons');
    registerIcons(iconRegistry, domSanitizer);
  }
}
