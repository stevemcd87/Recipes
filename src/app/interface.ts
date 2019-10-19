export interface IPost {
  id: number,
  email:string,
  title?: string,
  ingredients?: IIngredient[],
  directions?: string[]
}

export interface IIngredient {
  ingredient: string,
  measurement: string,
  amount: number
}
