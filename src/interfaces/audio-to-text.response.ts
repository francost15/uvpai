export interface AudioToTextResponse {
    duration: number;
    task: string;
    language: string;
    text: string;
    segments: Segment[];
}
export interface Segment {
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logrob: number;
    compression_ratio: number;
    no_speech_prob: number;
}