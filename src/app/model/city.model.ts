export interface Area {
  _id: string;
  areaName: string;
  city: string;
}

export interface City {
  _id: string;
  cityName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  areas: Area[];
}
