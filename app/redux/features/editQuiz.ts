import config from '@/app/config/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type QuestionType = "Multiple Choice" | "Short Text" | "Long Text" | "Yes/No";

type MultipleChoiceQuestion = {
    type: 'Multiple Choice'
    question: string,
    choices: string[],
    id: string,
    correctChoice: string,
    required: boolean,
}
type ShortTextQuestion = {
    question: string,
    id: string,
    type: 'Short Text',
    required: boolean,
    maxCharacters: boolean,
    maxCharactersLength: null | number
}
type LongTextQuestion = {
    id: string,
    question: string,
    type: 'Long Text',
    required: boolean,
    maxCharacters: boolean,
    maxCharactersLength: null | number
}
type YesNoQuestion = {
    id: string,
    question: string,
    yes: string,
    no: string,
    correct: 'Yes' | 'No',
    type: 'Yes/No',
    required: boolean,
}

export type Question = MultipleChoiceQuestion | ShortTextQuestion | YesNoQuestion | LongTextQuestion;

interface InitialState {
    questions: Question[],
    selectedQuestion: Question | null,
    quizName: string,
    broken: boolean,
    loading: boolean
}

export const fetchQuiz = createAsyncThunk("fetchQuiz", async (id) => {
    const pathname = window.location.pathname.split('/');
    const response = await axios.get(`${config.BACKEND_ENDPOINT}/quiz/${pathname[3]}`);
    return response.data;
});

const initialState: InitialState = {
    questions: [],
    selectedQuestion: null,
    quizName: 'Quiz 1',
    broken: false,
    loading: false
}



const createQuizSlice = createSlice({
    name: 'create-quiz',
    initialState,
    reducers: {
        addNewQuestion(state, payload: PayloadAction<Question>) {
            const currentQuestions = state.questions;
            if (payload.payload.type === 'Short Text' || payload.payload.type === 'Long Text') {
                currentQuestions.push({
                    required: payload.payload.required,
                    maxCharacters: payload.payload.maxCharacters,
                    id: payload.payload.id,
                    question: payload.payload.question,
                    type: payload.payload.type,
                    maxCharactersLength: 0
                })
            }
            else if (payload.payload.type === 'Multiple Choice') {
                currentQuestions.push({
                    required: payload.payload.required,
                    id: payload.payload.id,
                    question: payload.payload.question,
                    type: 'Multiple Choice',
                    choices: [

                    ],
                    correctChoice: ''
                })
            }
            else if (payload.payload.type === 'Yes/No') {
                currentQuestions.push({
                    required: payload.payload.required,
                    id: payload.payload.id,
                    question: payload.payload.question,
                    type: 'Yes/No',
                    yes: payload.payload.yes,
                    no: payload.payload.no,
                    correct: payload.payload.correct,
                })
            }
        },
        updateQuestionsOrder(state, payload: PayloadAction<Question[]>) {
            console.log(payload, 'im called')
            state.questions = payload.payload;
        },
        changeSelectedQuestion(state, payload: PayloadAction<string>) {
            let result;
            for (let i = 0; i < state.questions.length; i++) {
                if (payload.payload === state.questions[i].id) {
                    result = state.questions[i];
                    break;
                }
            }
            state.selectedQuestion = result as Question;

        },
        updateRequiredStatus(state, payload: PayloadAction<string>) {
            const newArr = [...state.questions]
            for (let i = 0; i < newArr.length; i++) {
                const item = newArr[i];
                if (item.id === payload.payload) {
                    if (!item.required) {
                        item.required = true;
                        if (state.selectedQuestion) {
                            state.selectedQuestion.required = true;
                        }
                    }
                    else {
                        item.required = false;
                        if (state.selectedQuestion) {
                            state.selectedQuestion.required = false;
                        }
                    }
                    break;
                }
            }

            state.questions = newArr;



        },
        updatedMaxCharacters(state, payload: PayloadAction<string>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload) {
                    if (item.type === 'Long Text' || item.type === 'Short Text') {
                        if (!item.maxCharacters) {
                            item.maxCharacters = true;
                            if (state.selectedQuestion?.type === 'Long Text' || state.selectedQuestion?.type === 'Short Text') {
                                state.selectedQuestion.maxCharacters = true;
                            }
                        }
                        else {
                            if (state.selectedQuestion?.type === 'Long Text' || state.selectedQuestion?.type === 'Short Text') {
                                state.selectedQuestion.maxCharacters = false;
                                state.selectedQuestion.maxCharactersLength = null
                            }
                            item.maxCharacters = false;
                            item.maxCharactersLength = null;
                        }
                    }
                }
            }
        },
        updateMaxCharactersLength(state, payload: PayloadAction<{ id: string, length: number }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    if (item.type == 'Long Text' || item.type == 'Short Text') {
                        item.maxCharactersLength = payload.payload.length;
                        if (state.selectedQuestion) {
                            if (state.selectedQuestion.type === 'Long Text' || state.selectedQuestion.type === 'Short Text') {
                                state.selectedQuestion.maxCharactersLength = payload.payload.length;;
                            }

                        }
                    }
                    break;
                }
            }
        },
        updateQuestion(state, payload: PayloadAction<{ id: string, value: string }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    item.question = payload.payload.value;
                    if (state.selectedQuestion) {
                        state.selectedQuestion.question = payload.payload.value;
                    }
                    break;
                }

            }
        },
        changeQuizName(state, payload: PayloadAction<string>) {
            state.quizName = payload.payload;
        },
        updateCorrectChoiceInMultipleChoiceQuestion(state, payload: PayloadAction<{ id: string, correctChoice: string }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    if (item.type === 'Multiple Choice') {
                        item.correctChoice = payload.payload.correctChoice;
                        if (state.selectedQuestion) {
                            if (state.selectedQuestion.type === 'Multiple Choice') {
                                state.selectedQuestion.correctChoice = payload.payload.correctChoice;
                            }
                        }

                    }
                    break;
                }
            }
        },
        updateCorrectChoiceInYesNoQuestion(state, payload: PayloadAction<{ id: string, correctChoice: 'Yes' | 'No' }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    if (item.type === 'Yes/No') {
                        item.correct = payload.payload.correctChoice;
                        if (state.selectedQuestion) {
                            if (state.selectedQuestion.type === 'Yes/No') {
                                state.selectedQuestion.correct = payload.payload.correctChoice;
                            }
                        }
                    }
                    break;
                }
            }
        },
        manageChoicesInMultipleChoiceQuestion(state, payload: PayloadAction<{ id: string, choice?: number, type: 'add' | 'remove' }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    if (item.type === 'Multiple Choice') {
                        if (payload.payload.type === 'remove') {
                            if (item.choices.length > 1) {
                                const filteredChoices = item.choices.filter((prevChoice, idx) => {
                                    if (idx !== payload.payload.choice) return prevChoice;
                                })
                                item.choices = filteredChoices;
                                if (state.selectedQuestion) {
                                    if (state.selectedQuestion.type === 'Multiple Choice') {
                                        state.selectedQuestion.choices = filteredChoices;
                                    }
                                }
                            }
                        }
                        if (payload.payload.type === 'add') {
                            item.choices.push(`Choice ${item.choices.length}`);
                            if (state.selectedQuestion) {
                                if (state.selectedQuestion.type === 'Multiple Choice') {
                                    state.selectedQuestion.choices.push(`Choice ${item.choices.length}`)
                                }
                            }
                        }

                    }
                    break;
                }
            }
        },
        updateChoiceNameInMultipleChoiceQuestion(state, payload: PayloadAction<{ id: string, idx: number, value: string }>) {
            for (let i = 0; i < state.questions.length; i++) {
                const item = state.questions[i];
                if (item.id === payload.payload.id) {
                    if (item.type === 'Multiple Choice') {
                        item.choices[payload.payload.idx] = payload.payload.value;
                    }
                    if (state.selectedQuestion) {
                        if (state.selectedQuestion.type === 'Multiple Choice') {
                            state.selectedQuestion.choices[payload.payload.idx] = payload.payload.value;
                        }
                    }
                    break;
                }

            }
        },
        updateChoiceInYesNoQuestion(state, payload: PayloadAction<{ id: string, type: 'yes' | 'no', value: string | null }>) {
            if (payload.payload.value) {
                for (let i = 0; i < state.questions.length; i++) {
                    const item = state.questions[i];
                    if (item.id === payload.payload.id) {
                        if (item.type === 'Yes/No') {
                            item[`${payload.payload.type}`] = payload.payload.value;
                        }
                        if (state.selectedQuestion) {
                            if (state.selectedQuestion.type === 'Yes/No') {
                                state.selectedQuestion[`${payload.payload.type}`] = payload.payload.value;
                            }
                        }
                    }
                }
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuiz.pending, (state, action) => {
            state.loading = true;
            // state.questions = action.payload.questions;
        }),
            builder.addCase(fetchQuiz.fulfilled, (state, action) => {
                state.questions = action.payload.questions;
                state.quizName = action.payload.quizName;
                if (action.payload.questions.length) state.selectedQuestion = action.payload.questions[0]
                state.loading = false;
                // state.questions = action.payload.questions;
            }),
            builder.addCase(fetchQuiz.rejected, (state, action) => {
                state.broken = true;
                state.loading = false;
            })
    }
})

export default createQuizSlice;