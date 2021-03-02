import { number } from "prop-types";

type ValidationRuleType = {
    required: boolean,
    minLength: number,
    maxLength: number,
    pattern: string
};
