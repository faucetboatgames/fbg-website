// src/types/Game.ts
export interface Game {
    id: string;
    title: string;
    description: string;
    status: 'launched' | 'development' | 'upcoming';
    releaseDate?: string;
    playUrl?: string;
    thumbnailUrl: string;
    bannerUrl: string;
    features: string[];
    platforms: string[];
    genre: string[];
}
