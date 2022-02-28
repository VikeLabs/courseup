import { Controller, Post, Query, Route } from 'tsoa';
import { add } from 'typesaurus';
import { EventsCollection } from '../db/collections';

@Route('events')
export class EventsController extends Controller {
  /**
   * Retrieves all the courses available. If query params are passed in, they will be used to filter results.
   * @param subject
   * @param code
   */
  @Post()
  public async postEvent(@Query() id: string): Promise<{ success: boolean }> {
    try {
      await add(EventsCollection, {
        timestamp: new Date(),
        useragent: this.getHeader('User-Agent'),
        params: {
          id,
        },
      });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
