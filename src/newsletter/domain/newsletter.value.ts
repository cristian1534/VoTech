import { NewsLetterEntity } from "./newsletter.entity";

export class NewsLetterValue implements NewsLetterEntity {
  email: string;
  
  constructor(email: string) {
    this.email = email;
  }
}
