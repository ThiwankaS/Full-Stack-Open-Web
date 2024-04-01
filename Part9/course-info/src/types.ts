interface CoursePartBase {
    name : string;
    exerciseCount : number;
}

interface CoursePartDesc extends CoursePartBase {
    description : string;
}

interface CoursePartsBasic extends CoursePartDesc {
    kind : "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount : number;
    kind : "group"
}

interface CoursePartBackground  extends CoursePartDesc {
    backgroundMaterial : string;
    kind : "background"
}

interface CousePartRequirement extends CoursePartDesc {
    requirements : string[];
    kind : "special"
}

export type CoursePart = CoursePartsBasic | CoursePartGroup | CoursePartBackground | CousePartRequirement;