import { IconType } from "react-icons";

export interface RouteProps {
  isAuth: boolean;
}
export interface Product {
  _id: string;
  product_name: string;
  product_price: number;
  product_thumb: string;
  product_ratingsAverage: number;
  product_slug: string;
  // rating: {
  //   rate: number;
  //   count: number;
  // };
  // price: number;
  // productOldPrice?: number; // Optional old price
  // image: string;
  // tag?: string; // Optional tag
}
export interface Cart {
  product: Product;
  quantity: number;
  selected: boolean;
}
export interface Category {
  icon: IconType;
  label: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  userId?: string;
}
export interface CategoryProps {
  initialImage: string;
  imageOnHover: string;
  label: string;
  color: string;
}
