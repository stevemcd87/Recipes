import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../post.service';

import { IPost} from '../../interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: IPost;

  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.showPost();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPost();
      }
    })
  }

  showPost() {
    console.log(this.route)
  const post = this.route.snapshot.paramMap.get('id');
  console.log(this.route)
  this.ps.getPost(+post)
    .subscribe((data: IPost) => {
      this.post = data;
      console.log(this.post);
    }, error => {
      console.error('Error in getting  post');
    });
}

}
