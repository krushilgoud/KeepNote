export class Note {
    id: Number;
    title: string;
    text: string;
    state: string;
    createdOn: Date;
    modifiedOn: Date;
    group: string;
    favourite: string;
    userId: Number;
    accessType: string;
    sharedBy: string;
    reminder: Date

  constructor() {
    this.title = '';
    this.text = '';
    this.state = '';
  }
}
