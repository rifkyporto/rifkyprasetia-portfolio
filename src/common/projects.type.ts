import { ICategory } from "./category.type";
import { IShowcaseProject } from "./showcase.type";

export interface IProject {
  id: string;
  updated_at: string;
  title: string;
  category_id: string;
  category_label: string;
  role: string;
  client_name: string;
  date_month_project: string;
  link_teaser: string;
  user_id: string;
  created_at: string;
  cover_image_url: string;
  banner_url: string;
  position: number;
  additional_fields: string;
  banner_Xaxis: number;
  banner_Yaxis: number;

  category: ICategory;
  showcase_project: IShowcaseProject[];
}

export interface IProjectCategories {
  id: string,
  category_id: string,
  project_id: string,
  position: number,
  created_at: string,
  updated_at: string,
  user_id: string,
  projects: IProject
}

export interface AdditionalFieldType {
  id: string;
  label: string;
  value: string;
}
