import { Get, Controller, Route, Response, Path } from 'tsoa';
import { get } from 'typesaurus';
import { Term } from '../constants';
import { TextbooksCollection } from '../db/collections';
import { CourseTextbook } from './Textbook.model';

interface TextbookInfo {
  subject: string;
  code: string;
  term: string;
  sections: CourseTextbook[];
}

@Route('textbooks')
export class TextbooksController extends Controller {
  @Response(404, 'Textbooks Not Found')
  @Get('{term}/{subject}/{code}')
  public async getTextbooks(
    @Path() term: Term,
    @Path() subject: string,
    @Path() code: string
  ): Promise<TextbookInfo | void> {
    const books = await get(TextbooksCollection, `${term}${subject}${code}`);
    if (!books) {
      this.setStatus(404);
      return;
    }

    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return books.data;
  }
}
