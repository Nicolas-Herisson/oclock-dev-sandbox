export interface ITag {
  id: number;
  type: string;
  text: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  image: string;
  products?: IProduct[];
}

export interface IProduct {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  message: string;
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  tagId: number;
  tag?: ITag;
  category?: ICategory;
}

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  isAuthenticated: boolean;
}
