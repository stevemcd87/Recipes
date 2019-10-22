import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../post.service';
import { PostFormService } from '../post-form.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PostAddComponent } from '../post-add/post-add.component';
import { IPost} from '../../interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
    providers: [PostFormService]
})
export class PostListComponent implements OnInit {
  user = this.auth.userProfile$ ;
  posts: IPost[];
  mobile: boolean;
  // @ViewChild(PostAddComponent, {static: false})
  // private detailComponent: PostAddComponent;
  postForm: IPost;
  phonePost: IPost;
  private width:number;

  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pfs:PostFormService
  ) {
    pfs.postFormConfirmed$.subscribe(
      postForm => {
        this.postForm = postForm;
      });
    this.mobile = (window.innerWidth < 450) ? true : false;
    console.log(this.mobile)

   }

  ngOnInit(  ) {

    this.showPosts();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPosts();
      }
    });
  }

  // ngAfterViewInit(){
  //   if (this.detailComponent){
  //     setTimeout(() => this.postForm = () => this.detailComponent.postForm, 0);
  //   }
  //   console.log(this.detailComponent)
  // }

  showPosts(): void {
    this.ps.getPosts().subscribe(posts => this.posts = posts);
  }



}
