export interface GenerateQuizRequest  {
    name: string;
    module_id: number;
    course_id: number;
    query: string;
    deadline: string;
    start_at: string;
    end_at: string;
    type: string;
    duration: number;
    count_type: {
        choices: number;
        essay: number;
        multiple: number;
    };
}