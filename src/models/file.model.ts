import { DocumentTypeEnum } from "./enums.model";


export interface FileTypesInterface {
  id: number,
  name: string;
  data?: string | null; // file content
  status?: string; //BACKLOG, TODO, IN_PROGRESS, TESTING, DONE. *there may be others.

  docType: DocumentTypeEnum, //TEXT, PACT, MANIFEST, STORY 
  number?: string, //hash 
  createdAt: Date | string,
  changedAt?: Date | null,

  // TASK
  priority?: string | null, //argent, high, normal, low
  dueDate?: Date | null,
  labels?: string[], //TODO: add types

  //pact
  childManifests?: number[], //TODO: add types

  //MANIFEST
  pactId?: number | null,

  //STORY
  manifestId?: number | null

}