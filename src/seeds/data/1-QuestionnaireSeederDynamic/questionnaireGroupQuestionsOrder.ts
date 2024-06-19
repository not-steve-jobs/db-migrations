/* eslint-disable max-len */

import { DeepPartial } from 'typeorm';

import { QuestionnaireGroupQuestionsOrder } from '../../../entity/questionnaire/QuestionnaireGroupQuestionsOrder';
import { QuestionnaireGroups } from '../../../entity/questionnaire/QuestionnaireGroups';
import { QuestionnaireQuestions } from '../../../entity/questionnaire/QuestionnaireQuestions';

export function getQuestionnaireGroupQuestionsOrder(
  groups: QuestionnaireGroups[],
  questions: QuestionnaireQuestions[]) : DeepPartial<QuestionnaireGroupQuestionsOrder>[] {
  return [
    {
      group: groups[0],
      question: questions[1],
      orderPriority: 1,
    },
    {
      group: groups[0],
      question: questions[2],
      orderPriority: 2,
    },
    {
      group: groups[0],
      question: questions[3],
      orderPriority: 3,
    },
    {
      group: groups[0],
      question: questions[5],
      orderPriority: 4,
    },
    {
      group: groups[0],
      question: questions[7],
      orderPriority: 5,
    },
    {
      group: groups[0],
      question: questions[8],
      orderPriority: 6,
    },
    {
      group: groups[0],
      question: questions[10],
      orderPriority: 7,
    },
    {
      group: groups[0],
      question: questions[11],
      orderPriority: 8,
    },
    {
      group: groups[1],
      question: questions[1],
      orderPriority: 1,
    },
    {
      group: groups[1],
      question: questions[2],
      orderPriority: 2,
    },
    {
      group: groups[1],
      question: questions[3],
      orderPriority: 3,
    },
    {
      group: groups[1],
      question: questions[6],
      orderPriority: 4,
    },
    {
      group: groups[1],
      question: questions[7],
      orderPriority: 5,
    },
    {
      group: groups[1],
      question: questions[8],
      orderPriority: 6,
    },
    {
      group: groups[1],
      question: questions[10],
      orderPriority: 7,
    },
    {
      group: groups[1],
      question: questions[11],
      orderPriority: 8,
    },
    {
      group: groups[3],
      question: questions[12],
      orderPriority: 2,
    },
    {
      group: groups[3],
      question: questions[13],
      orderPriority: 3,
    },
    {
      group: groups[3],
      question: questions[14],
      orderPriority: 4,
    },
    {
      group: groups[3],
      question: questions[15],
      orderPriority: 5,
    },
    {
      group: groups[3],
      question: questions[37],
      orderPriority: 1,
    },
    {
      group: groups[5],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[5],
      question: questions[18],
      orderPriority: 2,
    },
    {
      group: groups[5],
      question: questions[22],
      orderPriority: 3,
    },
    {
      group: groups[5],
      question: questions[42],
      orderPriority: 4,
    },
    {
      group: groups[5],
      question: questions[44],
      orderPriority: 5,
    },
    {
      group: groups[5],
      question: questions[62],
      orderPriority: 6,
    },
    {
      group: groups[6],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[6],
      question: questions[18],
      orderPriority: 2,
    },
    {
      group: groups[6],
      question: questions[22],
      orderPriority: 3,
    },
    {
      group: groups[6],
      question: questions[43],
      orderPriority: 4,
    },
    {
      group: groups[6],
      question: questions[44],
      orderPriority: 5,
    },
    {
      group: groups[7],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[7],
      question: questions[18],
      orderPriority: 2,
    },
    {
      group: groups[7],
      question: questions[23],
      orderPriority: 3,
    },
    {
      group: groups[7],
      question: questions[42],
      orderPriority: 4,
    },
    {
      group: groups[7],
      question: questions[44],
      orderPriority: 5,
    },
    {
      group: groups[7],
      question: questions[63],
      orderPriority: 6,
    },
    {
      group: groups[8],
      question: questions[17],
      orderPriority: 1,
    },
    {
      group: groups[8],
      question: questions[18],
      orderPriority: 2,
    },
    {
      group: groups[8],
      question: questions[24],
      orderPriority: 3,
    },
    {
      group: groups[8],
      question: questions[43],
      orderPriority: 4,
    },
    {
      group: groups[8],
      question: questions[44],
      orderPriority: 5,
    },
    {
      group: groups[9],
      question: questions[30],
      orderPriority: 1,
    },
    {
      group: groups[9],
      question: questions[31],
      orderPriority: 2,
    },
    {
      group: groups[11],
      question: questions[45],
      orderPriority: 1,
    },
    {
      group: groups[11],
      question: questions[46],
      orderPriority: 2,
    },
    {
      group: groups[11],
      question: questions[47],
      orderPriority: 3,
    },
    {
      group: groups[11],
      question: questions[49],
      orderPriority: 4,
    },
    {
      group: groups[11],
      question: questions[50],
      orderPriority: 5,
    },
    {
      group: groups[11],
      question: questions[51],
      orderPriority: 6,
    },
    {
      group: groups[11],
      question: questions[52],
      orderPriority: 7,
    },
    {
      group: groups[11],
      question: questions[58],
      orderPriority: 8,
    },
    {
      group: groups[12],
      question: questions[45],
      orderPriority: 1,
    },
    {
      group: groups[12],
      question: questions[46],
      orderPriority: 2,
    },
    {
      group: groups[12],
      question: questions[48],
      orderPriority: 3,
    },
    {
      group: groups[12],
      question: questions[49],
      orderPriority: 4,
    },
    {
      group: groups[12],
      question: questions[50],
      orderPriority: 5,
    },
    {
      group: groups[12],
      question: questions[51],
      orderPriority: 6,
    },
    {
      group: groups[12],
      question: questions[53],
      orderPriority: 7,
    },
    {
      group: groups[12],
      question: questions[58],
      orderPriority: 8,
    },
    {
      group: groups[13],
      question: questions[45],
      orderPriority: 1,
    },
    {
      group: groups[13],
      question: questions[46],
      orderPriority: 2,
    },
    {
      group: groups[13],
      question: questions[48],
      orderPriority: 3,
    },
    {
      group: groups[13],
      question: questions[49],
      orderPriority: 4,
    },
    {
      group: groups[13],
      question: questions[50],
      orderPriority: 5,
    },
    {
      group: groups[13],
      question: questions[51],
      orderPriority: 6,
    },
    {
      group: groups[13],
      question: questions[53],
      orderPriority: 7,
    },
    {
      group: groups[13],
      question: questions[58],
      orderPriority: 8,
    },
    {
      group: groups[14],
      question: questions[54],
      orderPriority: 1,
    },
    {
      group: groups[14],
      question: questions[55],
      orderPriority: 2,
    },
    {
      group: groups[14],
      question: questions[56],
      orderPriority: 3,
    },
    {
      group: groups[14],
      question: questions[57],
      orderPriority: 9,
    },
    {
      group: groups[14],
      question: questions[59],
      orderPriority: 4,
    },
    {
      group: groups[14],
      question: questions[60],
      orderPriority: 5,
    },
    {
      group: groups[14],
      question: questions[61],
      orderPriority: 6,
    },
    {
      group: groups[14],
      question: questions[64],
      orderPriority: 7,
    },
    {
      group: groups[14],
      question: questions[66],
      orderPriority: 8,
    },
    {
      group: groups[15],
      question: questions[54],
      orderPriority: 1,
    },
    {
      group: groups[15],
      question: questions[55],
      orderPriority: 2,
    },
    {
      group: groups[15],
      question: questions[56],
      orderPriority: 3,
    },
    {
      group: groups[15],
      question: questions[57],
      orderPriority: 7,
    },
    {
      group: groups[15],
      question: questions[59],
      orderPriority: 4,
    },
    {
      group: groups[15],
      question: questions[60],
      orderPriority: 5,
    },
    {
      group: groups[15],
      question: questions[61],
      orderPriority: 6,
    },
    {
      group: groups[16],
      question: questions[54],
      orderPriority: 1,
    },
    {
      group: groups[16],
      question: questions[55],
      orderPriority: 2,
    },
    {
      group: groups[16],
      question: questions[56],
      orderPriority: 3,
    },
    {
      group: groups[16],
      question: questions[57],
      orderPriority: 7,
    },
    {
      group: groups[16],
      question: questions[65],
      orderPriority: 4,
    },
    {
      group: groups[16],
      question: questions[68],
      orderPriority: 5,
    },
    {
      group: groups[16],
      question: questions[69],
      orderPriority: 6,
    },
    {
      group: groups[18],
      question: questions[0],
      orderPriority: 1,
    },
    {
      group: groups[18],
      question: questions[1],
      orderPriority: 2,
    },
    {
      group: groups[18],
      question: questions[2],
      orderPriority: 3,
    },
    {
      group: groups[19],
      question: questions[10],
      orderPriority: 1,
    },
    {
      group: groups[20],
      question: questions[8],
      orderPriority: 1,
    },
    {
      group: groups[21],
      question: questions[0],
      orderPriority: 1,
    },
    {
      group: groups[21],
      question: questions[1],
      orderPriority: 2,
    },
    {
      group: groups[21],
      question: questions[2],
      orderPriority: 3,
    },
    {
      group: groups[21],
      question: questions[8],
      orderPriority: 5,
    },
    {
      group: groups[21],
      question: questions[10],
      orderPriority: 4,
    },
    {
      group: groups[21],
      question: questions[109],
      orderPriority: 6,
    },
    {
      group: groups[23],
      question: questions[3],
      orderPriority: 1,
    },
    {
      group: groups[23],
      question: questions[4],
      orderPriority: 2,
    },
    {
      group: groups[23],
      question: questions[5],
      orderPriority: 3,
    },
    {
      group: groups[23],
      question: questions[7],
      orderPriority: 4,
    },
    {
      group: groups[23],
      question: questions[9],
      orderPriority: 5,
    },
    {
      group: groups[24],
      question: questions[3],
      orderPriority: 1,
    },
    {
      group: groups[24],
      question: questions[4],
      orderPriority: 2,
    },
    {
      group: groups[24],
      question: questions[5],
      orderPriority: 3,
    },
    {
      group: groups[24],
      question: questions[7],
      orderPriority: 4,
    },
    {
      group: groups[24],
      question: questions[9],
      orderPriority: 5,
    },
    {
      group: groups[26],
      question: questions[12],
      orderPriority: 1,
    },
    {
      group: groups[27],
      question: questions[13],
      orderPriority: 1,
    },
    {
      group: groups[28],
      question: questions[15],
      orderPriority: 1,
    },
    {
      group: groups[29],
      question: questions[12],
      orderPriority: 1,
    },
    {
      group: groups[29],
      question: questions[13],
      orderPriority: 2,
    },
    {
      group: groups[29],
      question: questions[15],
      orderPriority: 3,
    },
    {
      group: groups[31],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[32],
      question: questions[21],
      orderPriority: 1,
    },
    {
      group: groups[33],
      question: questions[41],
      orderPriority: 1,
    },
    {
      group: groups[34],
      question: questions[40],
      orderPriority: 1,
    },
    {
      group: groups[35],
      question: questions[20],
      orderPriority: 1,
    },
    {
      group: groups[36],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[36],
      question: questions[20],
      orderPriority: 4,
    },
    {
      group: groups[36],
      question: questions[21],
      orderPriority: 2,
    },
    {
      group: groups[36],
      question: questions[41],
      orderPriority: 3,
    },
    {
      group: groups[37],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[37],
      question: questions[20],
      orderPriority: 4,
    },
    {
      group: groups[37],
      question: questions[21],
      orderPriority: 2,
    },
    {
      group: groups[37],
      question: questions[40],
      orderPriority: 3,
    },
    {
      group: groups[39],
      question: questions[32],
      orderPriority: 1,
    },
    {
      group: groups[39],
      question: questions[36],
      orderPriority: 5,
    },
    {
      group: groups[41],
      question: questions[3],
      orderPriority: 3,
    },
    {
      group: groups[41],
      question: questions[5],
      orderPriority: 4,
    },
    {
      group: groups[41],
      question: questions[7],
      orderPriority: 5,
    },
    {
      group: groups[41],
      question: questions[9],
      orderPriority: 1,
    },
    {
      group: groups[41],
      question: questions[11],
      orderPriority: 2,
    },
    {
      group: groups[42],
      question: questions[12],
      orderPriority: 1,
    },
    {
      group: groups[42],
      question: questions[13],
      orderPriority: 2,
    },
    {
      group: groups[42],
      question: questions[15],
      orderPriority: 3,
    },
    {
      group: groups[43],
      question: questions[16],
      orderPriority: 1,
    },
    {
      group: groups[43],
      question: questions[21],
      orderPriority: 2,
    },
    {
      group: groups[43],
      question: questions[39],
      orderPriority: 5,
    },
    {
      group: groups[43],
      question: questions[62],
      orderPriority: 4,
    },
    {
      group: groups[43],
      question: questions[110],
      orderPriority: 3,
    },
    {
      group: groups[46],
      question: questions[88],
      orderPriority: 1,
    },
    {
      group: groups[46],
      question: questions[89],
      orderPriority: 2,
    },
    {
      group: groups[47],
      question: questions[90],
      orderPriority: 1,
    },
    {
      group: groups[48],
      question: questions[91],
      orderPriority: 1,
    },
    {
      group: groups[49],
      question: questions[92],
      orderPriority: 1,
    },
    {
      group: groups[51],
      question: questions[97],
      orderPriority: 1,
    },
    {
      group: groups[52],
      question: questions[88],
      orderPriority: 1,
    },
    {
      group: groups[53],
      question: questions[89],
      orderPriority: 1,
    },
    {
      group: groups[54],
      question: questions[36],
      orderPriority: 3,
    },
    {
      group: groups[54],
      question: questions[93],
      orderPriority: 4,
    },
    {
      group: groups[54],
      question: questions[94],
      orderPriority: 5,
    },
    {
      group: groups[54],
      question: questions[95],
      orderPriority: 1,
    },
    {
      group: groups[54],
      question: questions[96],
      orderPriority: 2,
    },
    {
      group: groups[55],
      question: questions[9],
      orderPriority: 2,
    },
    {
      group: groups[55],
      question: questions[98],
      orderPriority: 1,
    },
    {
      group: groups[56],
      question: questions[99],
      orderPriority: 1,
    },
    {
      group: groups[56],
      question: questions[100],
      orderPriority: 2,
    },
    {
      group: groups[56],
      question: questions[101],
      orderPriority: 3,
    },
    {
      group: groups[56],
      question: questions[102],
      orderPriority: 4,
    },
    {
      group: groups[56],
      question: questions[103],
      orderPriority: 5,
    },
    {
      group: groups[56],
      question: questions[104],
      orderPriority: 6,
    },
    {
      group: groups[56],
      question: questions[105],
      orderPriority: 7,
    },
    {
      group: groups[56],
      question: questions[106],
      orderPriority: 8,
    },
    {
      group: groups[56],
      question: questions[107],
      orderPriority: 9,
    },
    {
      group: groups[56],
      question: questions[108],
      orderPriority: 10,
    },
    {
      group: groups[57],
      question: questions[1],
      orderPriority: 1,
    },
    {
      group: groups[57],
      question: questions[2],
      orderPriority: 2,
    },
    {
      group: groups[57],
      question: questions[10],
      orderPriority: 3,
    },
    {
      group: groups[57],
      question: questions[11],
      orderPriority: 4,
    },
    {
      group: groups[58],
      question: questions[57],
      orderPriority: 1,
    },
  ];
}
