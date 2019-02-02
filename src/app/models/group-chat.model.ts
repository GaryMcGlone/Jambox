export class GroupChat {
    members: string[];
    name: string;
    admin: string;
    id?:string;
  
    constructor(members: string[], name: string, admin: string) {
        this.members = members;
        this.name = name;
        this.admin = admin;
    }
  }
  