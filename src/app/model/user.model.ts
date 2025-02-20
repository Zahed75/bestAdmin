export interface User {
  _id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  outlet: string;
  phoneNumber: string;
  password?: string; // Optional for security reasons
  role: string;
  isActive: boolean;
  isVerified: boolean;
  refreshToken: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface CreateUserRequest {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  outletId: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export interface CreateUserResponse {
  message: string;
  user: {
    success: boolean;
    user: User;
  };
}
