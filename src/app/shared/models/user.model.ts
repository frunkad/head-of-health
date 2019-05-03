export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    followersCount?: number;
    followingsCount?: number;
    postsCount?: number;
}
