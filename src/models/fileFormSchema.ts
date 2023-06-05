const FileFormScema = [
  {
    name: 'TEXT',
    data: [
      {
        type: 'text',
        title: 'Name',
        key: 'name',
        model: null,
        group: 'TEXT',
        elIndex: 1,
        options: null,
        value: null,
        style: 'flex-basis:50%'
      },
      {
        type: 'select',
        title: 'Type',
        key: 'docType',
        model: null,
        group: 'TEXT',
        elIndex: 0,
        options: [
          { value: 'TEXT', label: 'Text' },
          { value: 'TASK', label: 'Task' },
          { value: 'PACT', label: 'Pact' },
          { value: 'MANIFEST', label: 'Manifest' },
          { value: 'STORY', label: 'Story' }
        ],
        value: null,
        style: 'flex-basis:50%'
      },
  
      
    ]
  },
  {
    name: 'TASK',
    data: [
{
        type: 'select',
        title: 'Status',
        key: 'status',
        model: false,
        group: 'TEXT',
        elIndex: 2,
        options: [
          { value: 'BACKLOG', label: 'Backlog' },
          { value: 'TODO', label: 'TODO' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'TESTING', label: 'Testing' },
          { value: 'DONE', label: 'DONE' }
        ],
        value: null
      },
      {
        type: 'select',
        title: 'Priority',
        key: 'priority',
        model: null,
        group: 'TEXT',
        elIndex: 3,
        options: [
          // argent, high, normal, low
          { value: 'low', label: 'low' },
          { value: 'normal', label: 'normal' },
          { value: 'high', label: 'high' },
          { value: 'argent', label: 'argent' }
        ],
        value: null
      },
      {
        type: 'datetime',
        title: 'DueDate',
        key: 'dueDate',
        model: null,
        group: 'TASK',
        elIndex: 4,
        value: null
      }
    ]
  }

]//!SECTION

export default FileFormScema;