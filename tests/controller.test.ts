import { CaseController } from '../src/controller';
import { CaseModel } from '../src/model';
import { CaseView } from '../src/view';

jest.useFakeTimers();

describe('CaseController', () => {
  let model: CaseModel;
  let view: jest.Mocked<CaseView>;
  let controller: CaseController;

  beforeEach(() => {
    model = new CaseModel();
    view = {
      renderReel: jest.fn(),
      spinReel: jest.fn(),
      resetReel: jest.fn(),
      bindSpinButton: jest.fn((handler) => handler()),
      toggleButton: jest.fn(),
    } as any;
    controller = new CaseController(model, view);
  });

  test('запускает спин и возвращается в состояние ожидания', () => {
    expect(view.toggleButton).toHaveBeenCalledWith(true);
    expect(view.renderReel).toHaveBeenCalled();
    expect(view.spinReel).toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(view.toggleButton).toHaveBeenCalledWith(false);
    expect(view.resetReel).toHaveBeenCalled();
  });
});