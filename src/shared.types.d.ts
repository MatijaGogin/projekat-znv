export interface CreateUserParams{
    clerkId: string;
    username: string;
    email: string;
    picture: string;
}

export interface DeleteUserParams{
    clerkId: string;
}

export interface UpdateUserParams{
    clerkId: string;
    username: string;
    email: string;
    picture: string;
}