export interface CategoryModel {
  img: string;
  id: number;
  name: string;
  sublevels?: SublevelModel[];
}
export interface SublevelModel {
  img?: string;
  id: number;
  name: string;
  sublevels?: SublevelModel[];
}
