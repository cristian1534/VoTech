import { NewsLetterEntity } from "./newsletter.entity";

export interface NewsLetterRepository {
  addNewsLetter(newsletter: NewsLetterEntity): Promise<NewsLetterEntity | null>;
  getNewsletters(): Promise<NewsLetterEntity[] | null>;
  deleteNewsLetter(id: number): Promise<void>;
  getAccountByEmail(email: string): Promise<NewsLetterEntity | null>;
}
