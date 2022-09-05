export interface CarDto {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  photos: Array<{
    id: string;
    photo: string;
  }>;
}
