import { ICategory } from "./category.type";
import { IShowcaseProject } from "./showcase.type";

export interface IProject {
  id: string;
  updated_at: string;
  title: string;
  category_id: string;
  role: string;
  client_name: string;
  date_month_project: string;
  link_teaser: string;
  user_id: string;
  created_at: string;
  cover_image_url: string;

  category: ICategory;
  showcase_project: IShowcaseProject[];
}
