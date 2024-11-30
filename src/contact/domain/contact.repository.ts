import { IContact } from "./contact.entity";

export interface ContactRepository {
  addContact(contact: IContact): Promise<IContact | null>;
  getContacts(): Promise<IContact[] | null>;
  deleteContactByUuid(uuid: string): Promise<void>;
}
