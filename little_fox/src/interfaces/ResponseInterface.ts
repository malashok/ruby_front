interface ResponseInterface{
    id: number;
    rating: number;
    student_id: number;
    text: string;
    created_at: string;
    student: {name: string}
}

export default ResponseInterface;