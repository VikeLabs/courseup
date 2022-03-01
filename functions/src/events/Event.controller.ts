import { Controller, Post, Body, Route } from 'tsoa';
import { add } from 'typesaurus';
import { EventsCollection } from '../db/collections';
import { EventRequest } from './Event.model';

@Route('events')
export class EventsController extends Controller {
  @Post()
  public async postEvent(
    @Body() requestBody: EventRequest
  ): Promise<{ success: boolean }> {
    try {
      await add(EventsCollection, {
        name: requestBody.name,
        timestamp: new Date(),
        useragent: this.getHeader('User-Agent'),
        params: {
          ...requestBody,
        },
      });
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}
