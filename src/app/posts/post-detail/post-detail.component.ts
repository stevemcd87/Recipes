import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { IPost} from '../../interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: IPost;
  user;

  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.showPost();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPost();
      }
    });
    this.auth.userProfile$.subscribe(user=>{
      this.user = user;
    })
  }

  showPost() {
    const post = this.route.snapshot.paramMap.get('id');
    this.ps.getPost(+post)
      .subscribe((data: IPost) => {
        this.post = data;
        console.log(this.post);
      }, error => {
        console.error('Error in getting  post');
      });
  }

  delete(post: IPost): void {
    if(confirm("Are you sure you want to delete this post?")) {
      this.ps.deletePost(post)
        .subscribe((val)=>{
           this.router.navigate(['/posts'])
         });
    }
  }

}
