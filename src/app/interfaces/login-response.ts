export interface LoginResponse {
  token: string,
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  avatar?: string,
  city: string
}
