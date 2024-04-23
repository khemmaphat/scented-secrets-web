export interface SearchRequest {
    Search?: string
    SearchType?: string
    SearchGroup?: string
    CosineValue: number
    PageSize?: number
    PageNum?: number
    Gender?: string
}

export interface SearchResponse {
    perfumeId: string
    name: string
    brand: string
    imgUrl: string
}

export interface PerfumeDataDetail {
    name: string
    brand: string
    description: string
    howTo: string
    notes: NotesForDetail
    gender: string
    imgUrl: string
    cosineValue: number
    perfumeType: string[]
}

export interface Notes {
    topNotes: []
    middleNotes: []
    baseNotes: []
}

export interface GroupNote {
    name: string
    imgGroupUrl: string
    notes: Note[]
}

export interface Note {
    name: string
    description: string
    group: string
    imgUrl: string
}

export interface PerfumeMixedResult {
    notes: Notes
    description: string
}

export interface NotesForDetail {
    topNotes: Note[]
    middleNotes: Note[]
    baseNotes: Note[]
}

export interface AvgScoreCommment {
    averageRating: number
    likeRating: number
    okRating: number
    dislikeRating: number
    comments: Comment[]
}
export interface Comment {
    name: string
    rating: number
    comment: string
}
export interface PerfumePath {
    path: string
}
