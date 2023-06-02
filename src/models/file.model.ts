import { DocumentTypeEnum } from "./enums.model";


export interface FileTypesInterface {
  name: string;
  data?: any;
  status?: string;

  docType: DocumentTypeEnum,
  number?: string, 
  createdAt: Date | string,
  changedAt?: Date | null,

  // TASK
  priority?: number,
  dueDate?: Date | null,
  labels?: [], //TODO: add types

  //pact
  childManifests?: [], //TODO: add types

  //MANIFEST
  pactId?: string | null,

  //STORY
  manifestId?: string | null


}