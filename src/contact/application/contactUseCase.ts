import { IContact } from "../../contact/domain/contact.entity";
import { ContactValue } from "../../contact/domain/contact.value";
import { ContactRepository } from "contact/domain/contact.repository";
import { v4 as uuidGenerator } from "uuid";

export class ContactUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  public async addContact(contact: IContact) {
    const uuid = uuidGenerator();
    const contactValue = new ContactValue({ ...contact, uuid });
    const contactCreated = await this.contactRepository.addContact(
      contactValue
    );
    return contactCreated;
  }
  public async getContacts() {
    const contacts = await this.contactRepository.getContacts();
    return contacts;
  }

  public async deleteContactByUuid(uuid: string) {
    await this.contactRepository.deleteContactByUuid(uuid);
  }
}
