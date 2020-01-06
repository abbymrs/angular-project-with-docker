export interface TagModel {
    tag_key?: number;
    tag_name: string;
    tag_description: string;
    live_retention: string;
    cold_retention: string;
    status: number;
}

export interface TagResponse {
    success: boolean;
    message: string;
    data: any;
}