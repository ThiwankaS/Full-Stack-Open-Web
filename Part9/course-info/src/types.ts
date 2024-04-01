interface CoursePartsBasic {
    name : string;
    exerciseCount : number;
    description : string;
    kind : "basic"
}

interface CoursePartGroup {
    name : string;
    exerciseCount : number;
    groupProjectCount : number;
    kind : "group"
}

interface CoursePartBackground {
    name : string;
    exerciseCount : number;
    description : string;
    backgroundMaterial : string;
    kind : "background"
}

export type CoursePart = CoursePartsBasic | CoursePartGroup | CoursePartBackground ;