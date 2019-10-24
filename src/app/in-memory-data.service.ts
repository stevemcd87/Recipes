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
        userPicture: "https://lh6.googleusercontent.com/-XZlWad7g3ao/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk__b9LGXRme6pahIJO-SraGzMGw/photo.jpg",
        dishName: 'Flan',
        ingredients: [
          {ingredient: 'eggs', amount: '3' }
        ],
        directions:[
          'get flour',
          'do more stuff'
        ]
      },
      { id: 12,
        userEmail: 'stephenmcdonald8787@gmail.com',
        userName: 'Stephen McDonald',
          userPicture: "https://lh6.googleusercontent.com/-XZlWad7g3ao/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk__b9LGXRme6pahIJO-SraGzMGw/photo.jpg",
        dishName: 'Meatloaf w/ BrnSugarGlaze',
        ingredients: [
          { amount: '1 pound', ingredient: 'Ground Beef' },
          { amount: '3 tablespoons', ingredient: 'Adobo' },
          { amount: '1/2 cup', ingredient: 'White Onion' },
          { amount: '1/2 cup', ingredient: 'Green Pepper' },
          { amount: '2', ingredient: 'Eggs' },
          { amount: '1/2 cup', ingredient: 'Bread Crumbs' },
          { amount: '1/3 cup', ingredient: 'Ketchup' },
          { amount: '3 tablespoons', ingredient: 'Brown Sugar' },
          { amount: '2 tablespoons ', ingredient: 'Yellow Mustard' }
        ],
        directions:[
          "Preheat your oven to 375 degrees.",
          "Mix the ground beef, Adobo, onion, green peppers, egg, and bread crumbs well.",
          "Form a loaf and place in a baking dish.",
          "Mix ketchup, brown sugar and mustard together and spread over meatloaf.",
          "Bake uncovered 1 hour, draining grease away if needed"
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
