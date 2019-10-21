import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { IPost} from './interface';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      { id: 11,
        userEmail: 'stephenmcdonald8787@gmail.com',
        userName: 'Stephen McDonald',
        dishName: 'Flan',
        ingredients: [
          {ingredient: 'eggs', amount: '3' }
        ],
        directions:[
          'get flour',
          'do more stuff'
        ]
      }
    ];
    // const recipes = [
    //   { id: 111,
    //     postEmail: 'stephenmcdonald8787@gmail.com',
    //     dishName: 'Flan',
    //     ingredients: [
    //       {ingredient: 'eggs', amount: '3' }
    //     ],
    //     directions:[
    //       'get flour',
    //       'do more stuff'
    //     ]
    //   }
    // ];
    return {posts};
  }

  // Overrides the genId method to ensure that a post always has an id.
  // If the posts array is empty,
  // the method below returns the initial number (11).
  // if the posts array is not empty, the method below returns the highest
  // post id + 1.
  genId(posts: IPost[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }
}
