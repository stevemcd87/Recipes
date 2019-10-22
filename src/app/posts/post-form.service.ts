import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { IPost} from '../interface';

@Injectable()
export class PostFormService {

  // Observable string sources
  // private postFormAnnouncedSource = new Subject<IPost>();
  private postFormConfirmedSource = new Subject<IPost>();

  // Observable string streams
  // postFormAnnounced$ = this.postFormAnnouncedSource.asObservable();
  postFormConfirmed$ = this.postFormConfirmedSource.asObservable();

  // Service message commands
  // announcePostForm(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  confirmPostForm(postForm: IPost) {
    this.postFormConfirmedSource.next(postForm);
  }
}