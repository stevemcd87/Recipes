import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../auth.service';
// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { PostService } from '../post.service';
import { PostFormService } from '../post-form.service';
// import { Validators } from '@angular/forms';
// import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { IPost} from '../../interface';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss']
})
export class IphoneComponent implements OnInit {
    user = this.auth.userProfile$ ;
  postForm: IPost;
  constructor(
    private auth: AuthService,
    // private ps: PostService,
    // private route: ActivatedRoute,
    // private router: Router,
    // private fb: FormBuilder,
    private pfs:PostFormService
  ) {
    pfs.postFormConfirmed$.subscribe(
      postForm => {
        this.postForm = postForm;
        console.log(this.postForm)
      });
   }

  ngOnInit() {
  }


}
