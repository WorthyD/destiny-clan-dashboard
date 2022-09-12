import { Injectable } from '@angular/core';
import { DestinyDefinitionsDestinyActivityDefinition } from 'bungie-api-angular';
import { BaseDefinitionService } from './base-definition.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityDefinitionService  extends BaseDefinitionService<DestinyDefinitionsDestinyActivityDefinition> {}{
}
