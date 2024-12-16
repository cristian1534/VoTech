import { NewsLetterEntity } from "../../newsletter/domain/newsletter.entity";
import { NewsLetterRepository } from "../../newsletter/domain/newsletter.repository";
import { NewsLetterValue } from "../../newsletter/domain/newsletter.value";

export class NewsLetterUseCase {
  constructor(private readonly newsLetterRepository: NewsLetterRepository) {}

  public async addNewsletter(newsletter: NewsLetterEntity) {
    const newsletterValue = new NewsLetterValue(newsletter.email);
    const newsletterCreated = await this.newsLetterRepository.addNewsLetter(
      newsletterValue
    );
    return newsletterCreated;
  }
  public async deleteNewsletter(id: number) {
    await this.newsLetterRepository.deleteNewsLetter(id);
  }
  public async getNewsletters() {
    const newsletters = await this.newsLetterRepository.getNewsletters();
    return newsletters;
  }

  public async getAccountByEmail(email: string) {
    const account = await this.newsLetterRepository.getAccountByEmail(email);
    return account;
  }
}
