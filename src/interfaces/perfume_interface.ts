export interface SearchRequest {
    Search?: string
    SearchType?: string
    SearchGroup?: string
    CosineValue?: number
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
    notes: Notes
    gender: string
    imgUrl: string
    cosineValue: number
    perfumeType: []
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
