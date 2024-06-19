/* eslint-disable max-len */

import { DeepPartial } from 'typeorm';

import { QuestionnaireOptions } from '../../../entity/questionnaire/QuestionnaireOptions';
import { QuestionnaireOptionsEligibleFor } from '../../../entity/questionnaire/QuestionnaireOptionsEligibleFor';

export function getQuestionnaireOptionsEligibleFor(
  options: QuestionnaireOptions[]) : DeepPartial<QuestionnaireOptionsEligibleFor>[]
{
  return [
    {
      questionnaireOptions : options[27],
      eligibleFor : 'professional',
    },
    {
      questionnaireOptions : options[84],
      eligibleFor : 'professional',
    },
    {
      questionnaireOptions : options[85],
      eligibleFor : 'professional',
    },
    {
      questionnaireOptions : options[148],
      eligibleFor : 'professional',
    },
  ];
}
