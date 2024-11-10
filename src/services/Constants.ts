import { DocumentTypeEnum } from '@/models/enums.model';
import { FileTypesInterface } from '@/models/file.model';

 export const FileDataDefault = {
    id: 0,
    docType: DocumentTypeEnum.TEXT,
    number: '1',
    name: '',
    data: null,
    createdAt: '2023-01-01',
    changedAt: null,

    // TASK
    priority: null,
    dueDate: null,
    status: 'TODO',
    labels: [],

    //pact
    childManifests: [],

    //MANIFEST
    pactId: null,

    //STORY
    manifestId: null

  } as FileTypesInterface;

export const Constants = {
  welcomeDocument: `Hi True Editor`,
};