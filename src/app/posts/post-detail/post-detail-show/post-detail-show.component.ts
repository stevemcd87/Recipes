import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostFormService } from '../../post-form.service';
import { PostService } from '../../post.service';
import { AuthService } from '../../../auth.service';
import { IPost} from '../../../interface';
@Component({
  selector: 'app-post-detail-show',
  templateUrl: './post-detail-show.component.html',
  styleUrls: ['./post-detail-show.component.scss']
})
export class PostDetailShowComponent implements OnInit {
  post: IPost;

  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private pfs: PostFormService
  ) { }

  ngOnInit() {
    this.showPost();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPost();
      }
    })
  }

  ngOnDestroy(  ) {
    this.pfs.confirmPostForm(null);
  }

  showPost() {
    const post = this.route.snapshot.parent.paramMap.get('id');
    this.ps.getPost(+post)
      .subscribe((data: IPost) => {
        this.post = data;
        this.pfs.confirmPostForm(this.post);
        console.log('show')
      }, error => {
        console.error('Error in getting  post');
      });
    }

}
