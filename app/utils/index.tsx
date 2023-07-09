import { toast } from "react-hot-toast"
import { LongTextSVG, MultipleChoiceSVG, ShortTextSVG, YesNoSVG } from "../quiz/edit/[_id]/QuestionDialog"
import { QuestionType } from "../redux/features/editQuiz"
import validator from "validator"

const warningOptions = {
    duration: 2500,
    position: 'top-center',
    icon: '❌'
}

const successOptions = {
    duration: 2500,
    position: 'top-center',
    icon: '✔️'
}

const errorOptions = {
    duration: 2500,
    position: 'top-center',
    icon: '❗'
}

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

export function validEmail(value: string) {
    return validator.isEmail(value);
}

//@ts-ignore
export const invalidEmail = () => toast('Please provide a valid email', warningOptions)
//@ts-ignore
export const invalidPassword = () => toast('Password should be atleast 8 characters', warningOptions)
//@ts-ignore
export const accountCreated = () => toast('Your account has been created', successOptions);
//@ts-ignore
export const accountExists = () => toast('An account with that email already exists', errorOptions);
//@ts-ignore
export const welcomeUser = () => toast('Welcome back', successOptions);
//@ts-ignore
export const warningMessage = (message) => toast(message, warningOptions)
//@ts-ignore
export const successMessage = (message) => toast(message, successOptions)
