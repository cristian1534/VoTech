import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { contactSchema } from "../../../user/infrastructure/helpers/schema.validator";
import { ContactUseCase } from "../../../contact/application/contactUseCase";

export class ContactController {
  constructor(
    private contactUseCase: ContactUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  public addContact = async (
    { body }: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { error, value } = contactSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }
      const contact = await this.contactUseCase.addContact(value);
      return this.httpResponse.Ok(res, contact);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request."
      );
    }
  };

  public getContacts = async (req: Request, res: Response): Promise<any> => {
    try {
      const contacts = await this.contactUseCase.getContacts();
      console.log(contacts);
      return this.httpResponse.Ok(res, contacts);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while retrieving the contacts."
      );
    }
  };

  public deleteContactByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { uuid } = req.params;
    try {
      await this.contactUseCase.deleteContactByUuid(uuid);
      return this.httpResponse.Ok(res, {
        message: "Contact deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while deleting the contact."
      );
    }
  };
}
