import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { Term } from '../constants';
import { Subject } from './Subject.model';
import { SubjectsService } from './Subject.service';

@Route('subjects')
export class SubjectsController extends Controller {
  @Get('{term}')
  @Tags('Subjects')
  public async subjects(@Path() term: Term): Promise<Subject[]> {
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${1800}`
    );
    return await new SubjectsService().getSubjects(term);
  }
}
