import { LongTextSVG, MultipleChoiceSVG, ShortTextSVG, YesNoSVG } from "../create/QuestionDialog"
import { QuestionType } from "../redux/features/createQuiz"

export const validColor = (type: QuestionType) => {
    if (type === 'Short Text' || type === 'Long Text') {
        return 'rgb(55, 156, 251)'
    }
    else if (type === 'Multiple Choice') {
        return '#D65C99'
    }
    else if (type === 'Yes/No') {
        return 'rgb(224, 133, 179)'
    }
}

export const validSVG = (type: QuestionType) => {
    if (type === 'Short Text') {
        return ShortTextSVG
    }
    else if (type === 'Long Text') {
        return LongTextSVG
    }
    else if (type === 'Multiple Choice') {
        return MultipleChoiceSVG
    }
    else if (type === 'Yes/No') {
        return YesNoSVG
    }
}

export function slicedQuestion(value: string) {
    const sliced = value.slice(0, 20);
    return value.length >= 20 ? sliced + '...' : sliced;
}