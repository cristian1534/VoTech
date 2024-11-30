import { IContact } from "./contact.entity";

export class ContactValue implements IContact {
  uuid: string;
  name: string;
  email: string;
  message: string;
  constructor(contact: IContact) {
    this.uuid = contact.uuid;
    this.name = contact.name;
    this.email = contact.email;
    this.message = contact.message;
  }
}
