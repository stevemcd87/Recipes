import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from './post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { IPost} from '../interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    user = this.auth.userProfile$ ;
    posts: IPost[];
    postForm = this.fb.group({
      dishName: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.group({
          ingredient: this.fb.control(''),
          amount: this.fb.control('')
        })
      ]),
      directions: this.fb.array([
        this.fb.control('')
      ])
    });
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
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

  get ingredients() {
    return this.postForm.get('ingredients') as FormArray;
  }

  get directions() {
    return this.postForm.get('directions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredient: this.fb.control(''),
      amount:  this.fb.control('')
    }));
  }


  addDirection() {
    this.directions.push(this.fb.control(''));
  }

  addPost(): void {
      let profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    console.log(this.auth)
    this.ps.addPost({...profile, ...this.postForm.value } as IPost)
      .subscribe(post => {
        this.posts.push(post);
        console.log('postd');
        console.log(this.posts);
      });
  }

  onSubmit() {
    let profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    // TODO: Use EventEmitter with form value
    this.addPost()
    console.warn({...profile, ...this.postForm.value } );
  }
}
