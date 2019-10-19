import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { PostService } from './post.service';

import { IPost} from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'roomdig';
  posts: IPost[];
  constructor(private auth: AuthService, private ps: PostService) {}
  ngOnInit() {
    console.log('hey')
    this.auth.localAuthSetup();
    this.getPosts();
  }

  getPosts(): void {
  this.ps.getPosts()
  .subscribe(posts => this.posts = posts);
}
}
