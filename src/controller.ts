import { CaseModel } from './model';
import { CaseView } from './view';

/**
 * Перечисление состояний конечного автомата.
 */
enum State {
  Idle = 'IDLE',
  Spinning = 'SPINNING',
}

/**
 * Класс контроллера для CS Demo Case Opener.
 * Реализует конечный автомат для управления состояниями.
 */
export class CaseController {
  private model: CaseModel;
  private view: CaseView;
  private state: State;

  constructor(model: CaseModel, view: CaseView) {
    this.model = model;
    this.view = view;
    this.state = State.Idle;

    this.view.bindSpinButton(() => this.handleSpin());
  }

  /**
   * Обрабатывает клик по кнопке "Открыть кейс".
   */
  private handleSpin(): void {
    if (this.state !== State.Idle) return;

    this.state = State.Spinning;
    this.view.toggleButton(true);

    // Случайная позиция остановки и процент
    const stopIndex = Math.floor(Math.random() * this.model.getItems().length);
    const stopPercentage = Math.random();
    const stripLength = 10; // Длина полосы

    const strip = this.model.generateReelStrip(stopIndex, stopPercentage, stripLength);
    this.view.renderReel(strip);

    // Рассчитываем позицию остановки в пикселях
    const itemWidth = 100; // ширина одного предмета в CSS
    const centerOffset = Math.floor(stripLength / 2) * itemWidth;
    const stopOffset = stopPercentage * itemWidth;
    const stopPosition = centerOffset - stopOffset;

    this.view.spinReel(stopPosition);

    // Симулируем завершение спина
    setTimeout(() => {
      this.state = State.Idle;
      this.view.toggleButton(false);
      this.view.resetReel();
    }, 2000); // Длительность анимации в CSS
  }
}