import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../auth.service';
import { PostFormService } from '../post-form.service';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IPost} from '../../interface';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss']
})
export class IphoneComponent implements OnInit {
    user = this.auth.userProfile$ ;
    postForm: IPost;
    innerWidth:number;
    posts:IPost[];
  constructor(
    private auth: AuthService,
    private pfs:PostFormService,
    private ps:PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    pfs.postFormConfirmed$.subscribe(
      postForm => {
        this.postForm = postForm;
        console.log(this.postForm)
      });
   }

  ngOnInit() {

    this.showPosts();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPosts();
      }
    });
  }

  showPosts(): void {
    this.ps.getPosts().subscribe(posts => {
      this.posts = posts;

      console.log(this.posts)
    });
  }
}
