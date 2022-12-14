import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationNodeDefinitionService } from '@core/definition-services/presentation-node-definition.service';
import { MilestoneDefinitionService } from '@core/definition-services/milestone-definition.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RecordDefinitionService } from '@core/definition-services/record-definition.service';
import { MatTabsModule } from '@angular/material/tabs';

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
    private presentationNodeService: PresentationNodeDefinitionService,
    private milestoneDefinitionService: MilestoneDefinitionService,
    private recordDefinitionService: RecordDefinitionService
  ) {}

  displayObject: any = {};
  displayHash = new FormControl('');
  milestoneHash = new FormControl('');
  recordHash = new FormControl('');
  output = new FormControl('');
  imageUrl = new FormControl('');
  imgUrls = [];

  lookupPresentation() {
    this.updateDisplay(this.presentationNodeService.definitions[this.displayHash.value as unknown as number]);
  }
  lookupMilestone() {
    this.updateDisplay(this.milestoneDefinitionService.definitions[this.milestoneHash.value as unknown as number]);
  }
  lookupRecord() {
    this.updateDisplay(this.recordDefinitionService.definitions[this.recordHash.value as unknown as number]);
  }

  updateDisplay(thing: any) {
    this.output.patchValue(JSON.stringify(thing, undefined, 4));
  }
  loadImage() {
    this.imgUrls.push(`//bungie.net/${this.imageUrl.value}`);
  }
}
