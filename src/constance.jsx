export const apiURL = __API_URL__;
export const imageUlr = __IMG_URL__;

export const ImgUrl = `${apiURL}/public/`;

export const DevelopMood = true;
export const LogoDefaultPath = 'Logos/sidebare.png';

// Static Role ids
export const AdminRoleId = 1;
export const CompanyRoleId = 2;

// Time Format
export const BackEndSendFormat = 'YYYY-MM-DD';
export const DateFormat = 'DD/MM/YYYY';
export const DateAndTimeFormat = 'DD/MM/YYYY - HH:mm A';
export const TimeFormat = 'HH:mm';
export const MonthFormat = 'MMM';

export const SUCCESS_CODE = 200;
export const UNAUTHORIZED_CODE = 401;
export const TOO_MANY_REQUESTS_CODE = 429;
export const ERROR_CODE = 500;
export const SERVER_ERROR_CODE = 501;
export const BAD_REQUEST_CODE = 400;
export const TOKEN_NOT_VALID_CODE = 500;
export const TOKEN_NOT_PROVIDED_CODE = 500;

export const NAME_REGEX = /^[A-Za-z0-9]+([ \-'][A-Za-z0-9]+)*$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=\S+$).{8,}$/;
export const PHONE_NUMBER_REGEX = /^[0-9]\d{9}$/;

export const CurrencyList = [
  { Key: 'US Dollar (USD)', Value: 'USD' },
  { Key: 'Euro (EUR)', Value: 'EUR' },
  { Key: 'Indian Rupee (INR)', Value: 'INR' },
];

export const ActiveList = [
  {
    key: 'pending',
    value: 'Pending',
    color: 'info',
    start_color: '#E0FFD4',
    end_color: '#FFFFFF',
  },
  {
    key: 'confirmed',
    value: 'Confirmed',
    color: 'warning',
    start_color: '#E0FFD4',
    end_color: '#FFFFFF',
  },
  {
    key: 'cancelled',
    value: 'Rejected',
    color: 'error',
    start_color: '#FFD0D0',
    end_color: '#FFFFFF',
  },
  {
    key: 'completed',
    value: 'Completed',
    color: 'success',
    start_color: '#E0FFD4',
    end_color: '#FFFFFF',
  },
];
