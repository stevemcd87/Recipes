import { Component, OnInit,OnDestroy } from '@angular/core';
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
export class PostAddComponent implements OnInit, OnDestroy {
  user = this.auth.userProfile$ ;
  posts: IPost[];
  recipes: IRecipe[];
  postForm = this.fb.group({
    dishName: ['', this.pfs.basicFormValidations()],
    ingredients: this.fb.array([
      this.fb.group({
        ingredient: this.fb.control('',this.pfs.basicFormValidations()),
        amount: this.fb.control('',this.pfs.basicFormValidations())
      })
    ]),
    directions: this.fb.array([
      this.fb.control('',this.pfs.basicFormDirectionsValidations())
    ])
  });
  phonePost: IPost;
  constructor(
    private auth: AuthService,
    private ps: PostService,
    // private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pfs:PostFormService
  ) { }

  ngOnInit(  ) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // this.pfs.confirmPostForm(this.postForm.value);
    //   }
    // });
    this.pfs.confirmPostForm(this.postForm.value);
    this.postFormChanges();
  }

  ngOnDestroy(  ) {
    this.pfs.confirmPostForm(null);
  }

  postFormChanges():void {
    this.postForm.valueChanges.subscribe(val=>{
      this.pfs.confirmPostForm(val);
    })
  }

  get dishName() {return this.postForm.get('dishName');}

  get ingredients() {
    return this.postForm.get('ingredients') as FormArray;
  }

  ingredient(index) {
    return this.ingredients.controls[index].get('ingredient')
  }

  amount(index) {
    return this.ingredients.controls[index].get('amount')
  }

  get directions() {
    return this.postForm.get('directions') as FormArray;
  }

  direction(index) {
    return this.directions.controls[index]
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredient: this.fb.control('',this.pfs.basicFormValidations()),
      amount:  this.fb.control('',this.pfs.basicFormValidations())
    }));
  }


  addDirection() {
    this.directions.push(this.fb.control('',this.pfs.basicFormDirectionsValidations()));
  }

  addPost(): void {
    let profile: IPost;
    this.auth.userProfile$.subscribe(val=>{
    profile = {userEmail: val.email, userName:val.name, userPicture: val.picture}
    })
    this.ps.addPost({...profile, ...this.postForm.value } as IPost)
      .subscribe(post => {
        this.router.navigate(['/posts', post.id])
      });
  }

  onSubmit() {
    this.addPost()
  }

}
