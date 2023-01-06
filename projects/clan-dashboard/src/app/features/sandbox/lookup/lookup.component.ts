import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MilestoneDefinitionService } from '@core/definition-services/milestone-definition.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Destiny2Service } from 'bungie-api-angular';
import { take } from 'rxjs';
import { DefinitionService } from '@core/definition-services/definition.service';

@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule],
  templateUrl: './lookup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent {
  constructor(
    // private presentationNodeService: PresentationNodeDefinitionService,
  //  private milestoneDefinitionService: MilestoneDefinitionService,
    private definitionService: DefinitionService,
    private d2ServiceBase: Destiny2Service
  ) {}

  displayObject: any = {};
  displayHash = new FormControl('');
  milestoneHash = new FormControl('');
  recordHash = new FormControl('');
  output = new FormControl('');
  imageUrl = new FormControl('');
  imgUrls = [];

  lookupPresentation() {
    this.updateDisplay(this.definitionService.presentationDefinition[this.displayHash.value as unknown as number]);
  }
  lookupMilestone() {
    this.updateDisplay(this.definitionService.milestoneDefinition[this.milestoneHash.value as unknown as number]);
  }
  lookupRecord() {
    this.updateDisplay(this.definitionService.recordDefinition[this.recordHash.value as unknown as number]);
  }

  updateDisplay(thing: any) {
    this.output.patchValue(JSON.stringify(thing, undefined, 4));
  }
  loadImage() {
    this.imgUrls.push(`//bungie.net/${this.imageUrl.value}`);
  }
  userLookup() {
    this.d2ServiceBase
      .destiny2GetProfile('4611686018467238913' as unknown as number, 3, [100, 104, 200, 202, 800, 900, 1100])
      .pipe(take(1))
      .subscribe((result) => {
        this.updateDisplay(result);
      });
  }
}
