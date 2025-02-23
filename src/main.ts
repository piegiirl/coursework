import './style.css';
import { CaseModel } from './model';
import { CaseView } from './view';
import { CaseController } from './controller';

const model = new CaseModel();
const view = new CaseView();
const controller = new CaseController(model, view);