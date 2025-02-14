import {ImageDetails} from "./image-details";
import {SpecialAttributes} from "./special-attributes";

export interface FitnessProgramDetails {
  id?: number,
  name: string,
  price: number,
  createdAt?: string,
  images?: ImageDetails[],
  categoryId?: number,
  categoryName?: string,
  locationId?: number,
  locationName?: string,
  weightLevel: number,
  duration: string,
  fullName?: string,
  email?: string,
  special_attrs?: SpecialAttributes[],
  description: string,
  link?: string
}
