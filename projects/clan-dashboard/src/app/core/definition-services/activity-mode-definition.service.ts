import { Injectable } from '@angular/core';
import { DestinyDefinitionsDestinyActivityModeDefinition } from 'bungie-api-angular';
import { BaseDefinitionService } from './base-definition.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityModeDefinitionService extends BaseDefinitionService<DestinyDefinitionsDestinyActivityModeDefinition> {}
