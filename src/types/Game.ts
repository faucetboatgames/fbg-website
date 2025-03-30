// src/types/Game.ts
export interface Game {
    id: string;
    title: string;
    description: string;
    status: 'current' | 'upcoming';
    releaseDate?: string;
    thumbnailUrl: string;
    bannerUrl: string;
    features: string[];
    platforms: string[];
    genre: string[];
}
