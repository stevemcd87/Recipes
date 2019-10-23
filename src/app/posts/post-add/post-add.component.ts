import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { IPost, IRecipe} from '../../interface';
import { PostFormService } from '../post-form.service';
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  user = this.auth.userProfile$ ;
  posts: IPost[];
  recipes: IRecipe[];
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
  phonePost: IPost;
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pfs:PostFormService
  ) { }

  ngOnInit(  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.recipes)
      }
    });
    this.postFormChanges();
  }

  postFormChanges():void {
    let profile = this.auth.userProfile$
    if (profile) {
      profile.subscribe(val=>{
      console.log(val)
      })
    }
    this.postForm.valueChanges.subscribe(val=>{
      this.pfs.confirmPostForm(val);
    })
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
    const profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    console.log(this.auth)
    this.ps.addPost({...profile, ...this.postForm.value } as IPost)
      .subscribe(post => {
        console.log('postd');
        console.log(post);
      });
  }

  onSubmit() {
    let profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    // TODO: Use EventEmitter with form value
    this.addPost()
    console.warn({...profile, ...this.postForm.value } );
  }

}
