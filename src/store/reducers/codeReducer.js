import {
  GET_RATE,
  GET_CODES,
  SET_AMOUNT_FROM,
  GET_ALL_RATES,
  CLOSE_ERROR_DIALOG,
  GET_ALL_RATES_ERROR,
  GET_ALL_RATES_UNKNOWN_ERROR,
  GET_CODES_UNKNOWN_ERROR,
  GET_RATE_UNKNOWN_ERROR,
  SET_AMOUNT_FROM_ERROR,
  SET_COUNTRY_CODE_FROM,
  SET_COUNTRY_CODE_TO,
  SET_BASE_COUNTRY_CODE,
} from "../types";

export function getInitialState() {
  const savedState = localStorage.getItem("data");

  if (!savedState) {
    return {
      countryCodes: [],
      amountTo: "",
      allCountriesRates: {},
      errorMessage: "",
      isErrorDialogOpen: false,
      baseCurrency: "",
      baseCountryCode: "",
      countryCodeFrom: "",
      countryCodeTo: "",
      amountFrom: 1,
    };
  }

  return {
    ...JSON.parse(savedState),
    amountTo: "",
    allCountriesRates: {},
  };
}

export function codeReducer(state, action) {
  let newState;
  switch (action.type) {
    case GET_CODES:
      newState = {
        ...state,
        countryCodes: action.payload,
      };
      break;
    case GET_RATE:
      newState = {
        ...state,
        amountTo: (action.payload * state.amountFrom).toFixed(2),
      };
      break;
    case SET_AMOUNT_FROM:
      newState = {
        ...state,
        amountFrom: action.payload,
      };
      break;
    case GET_ALL_RATES:
      newState = {
        ...state,
        allCountriesRates: action.payload.rates,
        baseCurrency: action.payload.base,
      };
      break;
    case GET_ALL_RATES_ERROR:
      newState = {
        ...state,
        allCountriesRates: {},
        baseCurrency: "",
        errorMessage:
          "Current API works only with USD, otherwise please upgrade in https://currencyapi.net/#pricing-sec",
        isErrorDialogOpen: true,
      };
      break;
    case CLOSE_ERROR_DIALOG:
      newState = {
        ...state,
        isErrorDialogOpen: false,
      };
      break;
    case SET_COUNTRY_CODE_FROM:
      newState = {
        ...state,
        countryCodeFrom: action.payload,
      };
      break;
    case SET_COUNTRY_CODE_TO:
      newState = {
        ...state,
        countryCodeTo: action.payload,
      };
      break;
    case SET_BASE_COUNTRY_CODE:
      newState = {
        ...state,
        baseCountryCode: action.payload,
      };
      break;

    case SET_AMOUNT_FROM_ERROR:
      newState = {
        ...state,
        errorMessage: `Please enter number for amount value`,
        isErrorDialogOpen: true,
      };
      break;
    case GET_CODES_UNKNOWN_ERROR:
    case GET_RATE_UNKNOWN_ERROR:
    case GET_ALL_RATES_UNKNOWN_ERROR:
      newState = {
        ...state,
        errorMessage: `Unknown server error: ${action.payload}`,
        isErrorDialogOpen: true,
      };
      break;
    default:
      return state;
  }

  localStorage.setItem("data", JSON.stringify(newState));
  return newState;
}
