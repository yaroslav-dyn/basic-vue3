const FileFormScema = [
  {
    name: 'TEXT',
    data: [
      {
        type: 'select',
        title: 'Type',
        key: 'docType',
        model: null,
        group: 'TEXT',
        elIndex: 1,
        options: [
          { value: 'TEXT', label: 'Text' },
          { value: 'TASK', label: 'Task' },
          { value: 'PACT', label: 'Pact' },
          { value: 'MANIFEST', label: 'Manifest' },
          { value: 'STORY', label: 'Story' }
        ],
        value: null
      },
      {
        type: 'text',
        title: 'Name',
        key: 'name',
        model: null,
        group: 'TEXT',
        elIndex: 0,
        options: null,
        value: null
      },


      {
        type: 'textarea',
        title: 'Content',
        key: 'data',
        model: null,
        elIndex: 2,
        value: null
      },
    ]
  }


]//!SECTION

export default FileFormScema;