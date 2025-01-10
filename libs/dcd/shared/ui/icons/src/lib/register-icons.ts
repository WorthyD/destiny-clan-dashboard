import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const svgIcons = {
  titan: './assets/icons/titan.svg',
  hunter: './assets/icons/hunter.svg',
  warlock: './assets/icons/warlock.svg',
  steam: './assets/icons/steam.svg',
  epic: './assets/icons/epic.svg',
  stadia: './assets/icons/stadia.svg',
  playstation: './assets/icons/playstation.svg',
  xbox: './assets/icons/xbox.svg',
  twitch: './assets/icons/twitch-purp.svg'
};

export const registerIcons = (registry: MatIconRegistry, domSanitizer: DomSanitizer) => {
  console.log('registering icons!');
  Object.keys(svgIcons).map((name) => {
    //@ts-ignore
    const path = svgIcons[name];
    registry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl(path));
  });
};
