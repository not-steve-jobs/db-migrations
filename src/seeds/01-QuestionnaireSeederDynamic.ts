import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { isDevOrQaPlantOrMockEnvironment } from '../src/environmentUtils';
import { QuestionnaireQuestions } from '../entity/questionnaire/QuestionnaireQuestions';
import { QuestionnaireQuestionnaires } from '../entity/questionnaire/QuestionnaireQuestionnaires';
import { QuestionnaireGroups } from '../entity/questionnaire/QuestionnaireGroups';
import { QuestionnaireQuestionnaireGroupsOrder } from '../entity/questionnaire/QuestionnaireQuestionnaireGroupsOrder';
import { QuestionnaireGroupQuestionsOrder } from '../entity/questionnaire/QuestionnaireGroupQuestionsOrder';
import { createList } from '../src/seedUtils';
import { QuestionnaireOptions } from '../entity/questionnaire/QuestionnaireOptions';
import { QuestionnaireOptionsEligibleFor } from '../entity/questionnaire/QuestionnaireOptionsEligibleFor';

import { questionnaireQuestions } from './data/1-QuestionnaireSeederDynamic/questionnaireQuestions';
import { questionnaireQuestionnaires } from './data/1-QuestionnaireSeederDynamic/questionnaireQuestionnaires';
import { getQuestionnaireGroups } from './data/1-QuestionnaireSeederDynamic/questionnaireGroups';
import { getQuestionnaireQuestionnaireGroupsOrder } from './data/1-QuestionnaireSeederDynamic/questionnaireQuestionnaireGroupsOrder';
import { getQuestionnaireGroupQuestionsOrder } from './data/1-QuestionnaireSeederDynamic/questionnaireGroupQuestionsOrder';
import { getQuestionnaireOptions } from './data/1-QuestionnaireSeederDynamic/questionnaireOptions';
import { getQuestionnaireOptionsEligibleFor } from './data/1-QuestionnaireSeederDynamic/questionnaireOptionsEligibleFor';

export default class QuestionnaireSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    if (!isDevOrQaPlantOrMockEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    const questions = await createList(dataSource.manager, QuestionnaireQuestions, questionnaireQuestions);
    const questionnaires = await createList(dataSource.manager, QuestionnaireQuestionnaires, questionnaireQuestionnaires);

    const existingGroups = await dataSource.manager.getRepository(QuestionnaireGroups).find();
    const groups = await createList(dataSource.manager, QuestionnaireGroups, getQuestionnaireGroups(existingGroups));

    await createList(dataSource.manager, QuestionnaireQuestionnaireGroupsOrder, getQuestionnaireQuestionnaireGroupsOrder(groups, questionnaires));
    await createList(dataSource.manager, QuestionnaireGroupQuestionsOrder, getQuestionnaireGroupQuestionsOrder(groups, questions));
    const options = await createList(dataSource.manager, QuestionnaireOptions, getQuestionnaireOptions(questions));
    await createList(dataSource.manager, QuestionnaireOptionsEligibleFor, getQuestionnaireOptionsEligibleFor(options));
  }
}
