/* eslint-disable max-len */

import { DeepPartial } from 'typeorm';

import { QuestionnaireQuestionnaireGroupsOrder } from '../../../entity/questionnaire/QuestionnaireQuestionnaireGroupsOrder';
import { QuestionnaireGroups } from '../../../entity/questionnaire/QuestionnaireGroups';
import { QuestionnaireQuestionnaires } from '../../../entity/questionnaire/QuestionnaireQuestionnaires';

export function getQuestionnaireQuestionnaireGroupsOrder(
  groups: QuestionnaireGroups[],
  questionnaires: QuestionnaireQuestionnaires[]) : DeepPartial<QuestionnaireQuestionnaireGroupsOrder>[]
{
  return [
    {
      group: groups[0],
      questionnaire: questionnaires[0],
      orderPriority: 1,
    },
    {
      group: groups[0],
      questionnaire: questionnaires[1],
      orderPriority : 1,
    }
    ,
    {
      group: groups[0],
      questionnaire: questionnaires[2],
      orderPriority : 1,
    }
    ,

    {
      group: groups[1],
      questionnaire: questionnaires[3],
      orderPriority : 1,
    }
    ,

    {
      group: groups[3],
      questionnaire: questionnaires[0],
      orderPriority : 2,
    }
    ,
    {
      group: groups[3],
      questionnaire: questionnaires[1],
      orderPriority : 2,
    }
    ,
    {
      group: groups[3],
      questionnaire: questionnaires[2],
      orderPriority : 2,
    }
    ,
    {
      group: groups[3],
      questionnaire: questionnaires[3],
      orderPriority : 2,
    }
    ,

    {
      group: groups[5],
      questionnaire: questionnaires[0],
      orderPriority : 3,
    }
    ,

    {
      group: groups[6],
      questionnaire: questionnaires[1],
      orderPriority : 3,
    }
    ,

    {
      group: groups[7],
      questionnaire: questionnaires[2],
      orderPriority : 3,
    }
    ,

    {
      group: groups[8],
      questionnaire: questionnaires[3],
      orderPriority : 3,
    }
    ,

    {
      group: groups[11],
      questionnaire: questionnaires[0],
      orderPriority : 4,
    }
    ,
    {
      group: groups[11],
      questionnaire: questionnaires[1],
      orderPriority : 4,
    }
    ,

    {
      group: groups[12],
      questionnaire: questionnaires[2],
      orderPriority : 4,
    }
    ,

    {
      group: groups[13],
      questionnaire: questionnaires[3],
      orderPriority : 4,
    }
    ,

    {
      group: groups[14],
      questionnaire: questionnaires[0],
      orderPriority : 5,
    }
    ,
    {
      group: groups[14],
      questionnaire: questionnaires[1],
      orderPriority : 5,
    }
    ,

    {
      group: groups[15],
      questionnaire: questionnaires[2],
      orderPriority : 5,
    }
    ,

    {
      group: groups[16],
      questionnaire: questionnaires[3],
      orderPriority : 5,
    }
    ,

    {
      group: groups[17],
      questionnaire: questionnaires[4],
      orderPriority : 1,
    }
    ,
    {
      group: groups[17],
      questionnaire: questionnaires[5],
      orderPriority : 1,
    }
    ,
    {
      group: groups[17],
      questionnaire: questionnaires[6],
      orderPriority : 1,
    }
    ,

    {
      group: groups[18],
      questionnaire: questionnaires[4],
      orderPriority : 2,
    }
    ,
    {
      group: groups[18],
      questionnaire: questionnaires[5],
      orderPriority : 2,
    }
    ,
    {
      group: groups[18],
      questionnaire: questionnaires[6],
      orderPriority : 2,
    }
    ,

    {
      group: groups[19],
      questionnaire: questionnaires[4],
      orderPriority : 3,
    }
    ,
    {
      group: groups[19],
      questionnaire: questionnaires[5],
      orderPriority : 3,
    }
    ,
    {
      group: groups[19],
      questionnaire: questionnaires[6],
      orderPriority : 3,
    }
    ,

    {
      group: groups[20],
      questionnaire: questionnaires[4],
      orderPriority : 4,
    }
    ,
    {
      group: groups[20],
      questionnaire: questionnaires[5],
      orderPriority : 4,
    }
    ,
    {
      group: groups[20],
      questionnaire: questionnaires[6],
      orderPriority : 4,
    }
    ,

    {
      group: groups[21],
      questionnaire: questionnaires[4],
      orderPriority : 5,
    }
    ,
    {
      group: groups[21],
      questionnaire: questionnaires[5],
      orderPriority : 5,
    }
    ,
    {
      group: groups[21],
      questionnaire: questionnaires[6],
      orderPriority : 5,
    }
    ,

    {
      group: groups[22],
      questionnaire: questionnaires[4],
      orderPriority : 6,
    }
    ,
    {
      group: groups[22],
      questionnaire: questionnaires[5],
      orderPriority : 6,
    }
    ,
    {
      group: groups[22],
      questionnaire: questionnaires[6],
      orderPriority : 6,
    }
    ,

    {
      group: groups[23],
      questionnaire: questionnaires[4],
      orderPriority : 7,
    }
    ,
    {
      group: groups[23],
      questionnaire: questionnaires[5],
      orderPriority : 7,
    }
    ,
    {
      group: groups[23],
      questionnaire: questionnaires[6],
      orderPriority : 7,
    }
    ,

    {
      group: groups[24],
      questionnaire: questionnaires[4],
      orderPriority : 8,
    }
    ,
    {
      group: groups[24],
      questionnaire: questionnaires[5],
      orderPriority : 8,
    }
    ,
    {
      group: groups[24],
      questionnaire: questionnaires[6],
      orderPriority : 8,
    }
    ,

    {
      group: groups[25],
      questionnaire: questionnaires[4],
      orderPriority : 9,
    }
    ,
    {
      group: groups[25],
      questionnaire: questionnaires[5],
      orderPriority : 9,
    }
    ,
    {
      group: groups[25],
      questionnaire: questionnaires[6],
      orderPriority : 9,
    }
    ,

    {
      group: groups[26],
      questionnaire: questionnaires[4],
      orderPriority : 10,
    }
    ,
    {
      group: groups[26],
      questionnaire: questionnaires[5],
      orderPriority : 10,
    }
    ,
    {
      group: groups[26],
      questionnaire: questionnaires[6],
      orderPriority : 10,
    }
    ,

    {
      group: groups[27],
      questionnaire: questionnaires[4],
      orderPriority : 11,
    }
    ,
    {
      group: groups[27],
      questionnaire: questionnaires[5],
      orderPriority : 11,
    }
    ,
    {
      group: groups[27],
      questionnaire: questionnaires[6],
      orderPriority : 11,
    }
    ,

    {
      group: groups[28],
      questionnaire: questionnaires[4],
      orderPriority : 12,
    }
    ,
    {
      group: groups[28],
      questionnaire: questionnaires[5],
      orderPriority : 12,
    }
    ,
    {
      group: groups[28],
      questionnaire: questionnaires[6],
      orderPriority : 12,
    }
    ,

    {
      group: groups[29],
      questionnaire: questionnaires[4],
      orderPriority : 13,
    }
    ,
    {
      group: groups[29],
      questionnaire: questionnaires[5],
      orderPriority : 13,
    }
    ,
    {
      group: groups[29],
      questionnaire: questionnaires[6],
      orderPriority : 13,
    }
    ,

    {
      group: groups[30],
      questionnaire: questionnaires[4],
      orderPriority : 14,
    }
    ,
    {
      group: groups[30],
      questionnaire: questionnaires[5],
      orderPriority : 14,
    }
    ,
    {
      group: groups[30],
      questionnaire: questionnaires[6],
      orderPriority : 14,
    }
    ,

    {
      group: groups[31],
      questionnaire: questionnaires[4],
      orderPriority : 15,
    }
    ,
    {
      group: groups[31],
      questionnaire: questionnaires[5],
      orderPriority : 15,
    }
    ,
    {
      group: groups[31],
      questionnaire: questionnaires[6],
      orderPriority : 15,
    }
    ,

    {
      group: groups[32],
      questionnaire: questionnaires[4],
      orderPriority : 16,
    }
    ,
    {
      group: groups[32],
      questionnaire: questionnaires[5],
      orderPriority : 16,
    }
    ,
    {
      group: groups[32],
      questionnaire: questionnaires[6],
      orderPriority : 16,
    }
    ,

    {
      group: groups[33],
      questionnaire: questionnaires[4],
      orderPriority : 17,
    }
    ,

    {
      group: groups[34],
      questionnaire: questionnaires[5],
      orderPriority : 17,
    }
    ,
    {
      group: groups[34],
      questionnaire: questionnaires[6],
      orderPriority : 17,
    }
    ,

    {
      group: groups[35],
      questionnaire: questionnaires[4],
      orderPriority : 18,
    }
    ,
    {
      group: groups[35],
      questionnaire: questionnaires[5],
      orderPriority : 18,
    }
    ,
    {
      group: groups[35],
      questionnaire: questionnaires[6],
      orderPriority : 18,
    }
    ,

    {
      group: groups[36],
      questionnaire: questionnaires[4],
      orderPriority : 19,
    }
    ,

    {
      group: groups[37],
      questionnaire: questionnaires[5],
      orderPriority : 19,
    }
    ,
    {
      group: groups[37],
      questionnaire: questionnaires[6],
      orderPriority : 19,
    }
    ,

    {
      group: groups[38],
      questionnaire: questionnaires[4],
      orderPriority : 25,
    }
    ,
    {
      group: groups[38],
      questionnaire: questionnaires[5],
      orderPriority : 20,
    }
    ,
    {
      group: groups[38],
      questionnaire: questionnaires[6],
      orderPriority : 20,
    }
    ,

    {
      group: groups[39],
      questionnaire: questionnaires[5],
      orderPriority : 21,
    }
    ,
    {
      group: groups[39],
      questionnaire: questionnaires[6],
      orderPriority : 21,
    }
    ,

    {
      group: groups[40],
      questionnaire: questionnaires[4],
      orderPriority : 27,
    }
    ,
    {
      group: groups[40],
      questionnaire: questionnaires[5],
      orderPriority : 22,
    }
    ,

    {
      group: groups[41],
      questionnaire: questionnaires[7],
      orderPriority : 1,
    }
    ,
    {
      group: groups[41],
      questionnaire: questionnaires[10],
      orderPriority : 1,
    }
    ,
    {
      group: groups[41],
      questionnaire: questionnaires[11],
      orderPriority : 1,
    }
    ,
    {
      group: groups[41],
      questionnaire: questionnaires[16],
      orderPriority : 1,
    }
    ,

    {
      group: groups[42],
      questionnaire: questionnaires[7],
      orderPriority : 2,
    }
    ,
    {
      group: groups[42],
      questionnaire: questionnaires[10],
      orderPriority : 2,
    }
    ,
    {
      group: groups[42],
      questionnaire: questionnaires[11],
      orderPriority : 2,
    }
    ,
    {
      group: groups[42],
      questionnaire: questionnaires[16],
      orderPriority : 2,
    }
    ,

    {
      group: groups[43],
      questionnaire: questionnaires[7],
      orderPriority : 3,
    }
    ,
    {
      group: groups[43],
      questionnaire: questionnaires[10],
      orderPriority : 3,
    }
    ,
    {
      group: groups[43],
      questionnaire: questionnaires[11],
      orderPriority : 3,
    }
    ,
    {
      group: groups[43],
      questionnaire: questionnaires[16],
      orderPriority : 3,
    }
    ,

    {
      group: groups[46],
      questionnaire: questionnaires[8],
      orderPriority : 1,
    }
    ,

    {
      group: groups[47],
      questionnaire: questionnaires[4],
      orderPriority : 24,
    }
    ,
    {
      group: groups[47],
      questionnaire: questionnaires[8],
      orderPriority : 3,
    }
    ,
    {
      group: groups[48],
      questionnaire: questionnaires[8],
      orderPriority : 2,
    }
    ,

    {
      group: groups[49],
      questionnaire: questionnaires[8],
      orderPriority : 4,
    }
    ,

    {
      group: groups[50],
      questionnaire: questionnaires[4],
      orderPriority : 20,
    }
    ,

    {
      group: groups[51],
      questionnaire: questionnaires[4],
      orderPriority : 23,
    }
    ,

    {
      group: groups[52],
      questionnaire: questionnaires[4],
      orderPriority : 21,
    }
    ,

    {
      group: groups[53],
      questionnaire: questionnaires[4],
      orderPriority : 22,
    }
    ,

    {
      group: groups[54],
      questionnaire: questionnaires[4],
      orderPriority : 26,
    }
    ,

    {
      group: groups[55],
      questionnaire: questionnaires[5],
      orderPriority : 7,
    }
    ,

    {
      group: groups[56],
      questionnaire: questionnaires[12],
      orderPriority : 1,
    }
    ,

    {
      group: groups[57],
      questionnaire: questionnaires[13],
      orderPriority : 1,
    }
    ,
    {
      group: groups[57],
      questionnaire: questionnaires[14],
      orderPriority : 1,
    }
    ,
    {
      group: groups[57],
      questionnaire: questionnaires[15],
      orderPriority : 1,
    }
    ,

    {
      group: groups[58],
      questionnaire: questionnaires[13],
      orderPriority : 2,
    }
    ,
    {
      group: groups[58],
      questionnaire: questionnaires[14],
      orderPriority : 2,
    }
    ,
    {
      group: groups[58],
      questionnaire: questionnaires[15],
      orderPriority : 2,
    }
    ,
  ];
}
