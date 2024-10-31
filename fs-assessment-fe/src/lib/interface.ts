export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  categoryId: number;
  categoryName?: string;
  description: string;
  image?: string;
  recipe: IRecipeDetail;
  slug: string;
  title: string;
}

export interface IRecipeDetail{
  timing: {
    prep: TimerBakery;
    bake: TimerBakery;
    total: TimerBakery;
  };
  yield: string;
}

export interface IResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  data: T
}

export interface ITab {
  children?: ITab[];
  href: string;
  name: string;
}

export type TimerBakery = {
  from: number;
  to: number;
} | number