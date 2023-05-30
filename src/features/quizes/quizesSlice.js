import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  participantedQuizs: [],
  optionsForSingleQuiz: [],
  clearOptionInputStatus: false,
};

const quizesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // this will called when a student selects first time any option of a quiz and
    // push the [updatedQuiz / data] to[state.participantedQuizs] array...
    singleAnsweredQuiz: (state, action) => {
      state.participantedQuizs.push(action.payload);
    },
    // this will called when a student selects another option of a quiz that already exists in the [state.participantedQuizs] array...
    addAnotherOptionToSelect: (state, action) => {
      const indexToUpdate = state.participantedQuizs.findIndex(
        (participant) => participant.id === action.payload.id
      );

      if (indexToUpdate > -1) {
        state.participantedQuizs[indexToUpdate].selectedOptions.push(
          action.payload.newOption
        );
      }
    },
    // this will called when a student unselects all the selected options that he/she selected previously and the quiz store in [state.participantedQuizs] array then it will  clear the quiz from the [state.participantedQuizs]
    removeAnotherSeletedOption: (state, action) => {
      const indexToUpdate = state.participantedQuizs.findIndex(
        (participant) => participant.id === action.payload.id
      );

      if (indexToUpdate > -1) {
        state.participantedQuizs[indexToUpdate].selectedOptions =
          state.participantedQuizs[indexToUpdate].selectedOptions.filter(
            (opt) => opt.id !== action.payload.removeOption.id
          );
      }
    },
    //this will called when a student unselects all options from all quizzes
    // OR [(VideoID is change) means if the user navigate to other video].
    // and it will clear all the quizzes from the [state.participantedQuizs] array...
    clearParticipantedQuizs: (state, action) => {
      state.participantedQuizs = [];
    },

    // Admin oparations functions...
    addOptionsForSingleQuiz: (state, action) => {
      const optionData = action.payload;
      let indexToUpdate;
      if (optionData?.id) {
        indexToUpdate = state.optionsForSingleQuiz.findIndex(
          (option) => option.id == optionData?.id
        );
        if (indexToUpdate === -1) {
          state.optionsForSingleQuiz.push(optionData);
        } else {
          state.optionsForSingleQuiz[indexToUpdate] = action.payload;
        }
      }
    },

    removeOptionsForSingleQuiz: (state) => {
      state.optionsForSingleQuiz = [];
    },

    clearOptionInputStatusChanger: (state, action) => {
      state.clearOptionInputStatus = action.payload;
    },
  },
});

export const {
  singleAnsweredQuiz,
  addAnotherOptionToSelect,
  removeAnotherSeletedOption,
  clearParticipantedQuizs,
  addOptionsForSingleQuiz,
  removeOptionsForSingleQuiz,
  clearOptionInputStatusChanger,
} = quizesSlice.actions;
export default quizesSlice.reducer;
