import { CaseModel } from '../src/model';

describe('CaseModel', () => {
  let model: CaseModel;

  beforeEach(() => {
    model = new CaseModel();
  });

  test('генерирует полосу правильной длины', () => {
    const strip = model.generateReelStrip(2, 0.5, 5);
    expect(strip).toHaveLength(5);
  });

  test('включает предмет остановки в середину полосы', () => {
    const stopIndex = 1;
    const strip = model.generateReelStrip(stopIndex, 0.5, 5);
    expect(strip[2].name).toBe(model.getItems()[stopIndex].name);
  });

  test('выбрасывает ошибку при неверной позиции остановки', () => {
    expect(() => model.generateReelStrip(-1, 0.5, 5)).toThrow(
      'Недопустимая позиция остановки'
    );
    expect(() => model.generateReelStrip(10, 0.5, 5)).toThrow(
      'Недопустимая позиция остановки'
    );
  });

  test('выбрасывает ошибку при неверном проценте остановки', () => {
    expect(() => model.generateReelStrip(0, -0.1, 5)).toThrow(
      'Процент остановки должен быть между 0 и 1'
    );
    expect(() => model.generateReelStrip(0, 1.1, 5)).toThrow(
      'Процент остановки должен быть между 0 и 1'
    );
  });
});