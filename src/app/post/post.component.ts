import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from './post.service';
import { IPost} from '../interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    posts: IPost[];
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(  ) {
    this.showPosts()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPosts();
      }
    })
  }
  showPosts(): void {
  this.ps.getPosts()
  .subscribe(posts => this.posts = posts);
}
}
