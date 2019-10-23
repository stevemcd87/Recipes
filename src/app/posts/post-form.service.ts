import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { IPost} from '../interface';
import { Validators } from '@angular/forms';
@Injectable()
export class PostFormService {

  // Observable string sources
  // private postFormAnnouncedSource = new Subject<IPost>();
  private postFormConfirmedSource = new Subject<IPost>();
  // private postListConfirmedSource = new Subject<IPost[]>();

  // Observable string streams
  // postFormAnnounced$ = this.postFormAnnouncedSource.asObservable();
  postFormConfirmed$ = this.postFormConfirmedSource.asObservable();
  // postListConfirmed$ = this.postListConfirmedSource.asObservable();

  // Service message commands
  // announcePostForm(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  confirmPostForm(postForm: IPost) {
    this.postFormConfirmedSource.next(postForm);
  }

  basicFormValidations(){
    return [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(1)
    ]
  }

  basicFormDirectionsValidations(){
    return [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(2)
    ]
  }
}
