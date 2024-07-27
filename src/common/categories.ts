import { projectCategoryType } from "./categories.type";

export const projectCategories: projectCategoryType[] = [
  {
    id: 1,
    name: "All",
    key: "all",
  },
  {
    id: 2,
    name: "Short Film",
    key: "short-film",
  },
  {
    id: 3,
    name: "Music Video",
    key: "music-video",
  },
  {
    id: 4,
    name: "Commercial",
    key: "commercial",
  },
  {
    id: 5,
    name: "Fashion",
    key: "fashion",
  },
  {
    id: 6,
    name: "Others",
    key: "others",
  }
];

// // Function to get all project IDs
export function getAllProjectCategories(): string[] {
  return projectCategories.map((project) => project.key);
}

// // Function to get project data by ID
// export async function getProjectData(id: string): Promise<Project | undefined> {
//   return projects.find((project) => project.id === id);
// }
